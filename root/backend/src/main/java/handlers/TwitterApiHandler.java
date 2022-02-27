package handlers;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import util.HttpUtils;
import util.RateLimiter;
import util.Token;
import util.SentimentAnalysis;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class TwitterApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private static final JSONObject outJSON = new JSONObject();
    SentimentAnalysis sentimentanalysis= new SentimentAnalysis();
    private Token token;
    private List<RateLimiter> limiters = new LinkedList<>();

    public TwitterApiHandler(String id, String secret, String user) {
        credentials = new HashMap<>();
        credentials.put("app_id", id);
        credentials.put("app_secret", secret);
        credentials.put("user_agent", user);
        this.token = null;
        this.limiters.add(new RateLimiter(450, 900000));
    }
    private boolean hasRequestBudget(int amount) {
        boolean hasBudget = true;
        for (RateLimiter limiter : this.limiters) {
            if (!limiter.hasBudget(amount))
                hasBudget = false;
        }
        return hasBudget;
    }

    @Override
    public void requestToken(String numberOfResults) {
        boolean requestPassed = false;
        if(numberOfResults.equals(""))
        {
            numberOfResults = "10";
        }
        int temp = 1 + Integer.parseInt(numberOfResults);
        // request a token if sufficient budget and token needed
        if (hasRequestBudget(temp) && (this.token == null || !this.hasValidToken())) {
            requestPassed = makeTokenRequest();
            this.limiters.forEach((limiter) -> {limiter.spendBudget(temp);});
        }
        if (requestPassed)
            System.out.println("Twitter access token request passed");
        else
            System.out.println("Twitter access token request failed");
    }

    private boolean makeTokenRequest() {
        String requestUri = "https://api.twitter.com/oauth2/token";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));
        String auth = credentials.get("app_id") + ":" + credentials.get("app_secret");
        requestProperties.put("Authorization",
                "Basic " + Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8)));

        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("grant_type", "client_credentials");

        // execute request
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "POST",
                requestProperties, requestParameters);

        // process response
        String accessToken;
        long expiresIn;
        try {
            accessToken = responseJSON.getString("access_token");
            expiresIn = -1;
        } catch (JSONException e) {
            accessToken = null;
            expiresIn = 0;
        }

        // save token
        this.token = new Token(accessToken, System.currentTimeMillis() + expiresIn);

        // return whether request resulted in a valid token
        return this.hasValidToken();
    }

    @Override
    public boolean hasValidToken() {
        return true;
    }

    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end){
        JSONObject out = null;
        if(maxResults.equals(""))
        {
            maxResults = "10";
        }
        if (hasRequestBudget(1 + Integer.parseInt(maxResults)) && (this.hasValidToken())) {
            out = makeQueryRequest(q, maxResults, start, end);
        }
        if (out != null) {
            System.out.println("Twitter query successful");
            return out;
        }
        else {
            System.out.println("Twitter access token request failed");
            return null;
        }
    }

    private JSONObject makeQueryRequest(String q, String maxResults, String start, String end) {
        ArrayList <String> idList = new ArrayList<>();
        String requestUri = "https://api.twitter.com/2/tweets/search/recent";
        Map<String, String> requestProperties = new HashMap<>();

        requestProperties.put("User-Agent", credentials.get("user_agent"));
        requestProperties.put("Authorization", "bearer " + this.token.getToken());

        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("query", q);
        requestParameters.put("expansions","referenced_tweets.id");

        if(maxResults.equals(""))
        {
            maxResults = "10";
        }
        requestParameters.put("max_results", maxResults);
        if(!start.equals(""))
        {
            start += "T00:00:00.000Z";
            requestParameters.put("start_time", start);
        }
        if(!end.equals(""))
        {
            end += "T00:00:00.000Z";
            requestParameters.put("end_time", end);
        }

        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);
        System.out.println("First: " + responseJSON.toString());
        if(responseJSON.has("data"))
        {
            JSONArray data = responseJSON.getJSONArray("data");
            for (int i = 0; i < data.length(); i++) {
                String s = data.getJSONObject(i).toString();
                if(s.contains("type"))
                {
                    JSONArray rt = data.getJSONObject(i).getJSONArray("referenced_tweets");
                    idList.add(rt.getJSONObject(0).getBigInteger("id").toString());
                }
                else
                {
                    idList.add(data.getJSONObject(i).getBigInteger("id").toString());
                }
            }
            return TweetDetails(idList);
        }
        else
        {
            return TweetDetails(new ArrayList<>());
        }
    }
    public JSONObject TweetDetails(ArrayList<String> idList) {
        System.out.println(idList);
        JSONArray outPosts = new JSONArray();
        if(idList.isEmpty())
        {
            outPosts.put((Object) null);
        }
        else
        {
            for (String ids : idList) {
                String requestUri = "https://api.twitter.com/2/tweets";

                Map<String, String> requestProperties = new HashMap<>();
                requestProperties.put("User-Agent", credentials.get("user-agent"));
                requestProperties.put("Authorization", "bearer " + this.token.getToken());

                Map<String, String> requestParameters = new HashMap<>();
                requestParameters.put("ids", ids);
                requestParameters.put("tweet.fields", "text,author_id,created_at,lang,public_metrics");
                requestParameters.put("expansions", "attachments.media_keys");

                JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                        requestProperties, requestParameters);
                try {
                    assert (responseJSON.getString("kind").equals("Listing"));

                    JSONArray inPosts = responseJSON.getJSONArray("data");
                    JSONObject re = inPosts.getJSONObject(0);
                    JSONObject postData = new JSONObject();
                    postData.put("platform", "twitter");
                    postData.put("created_at", re.getString("created_at"));
                    postData.put("post_id", hashPostID(String.valueOf(re.getBigInteger("id"))));
                    postData.put("lang", re.getString("lang"));
                    postData.put("title", "None");
                    postData.put("text", re.getString("text"));
                    postData.put("author_id", hashPostID(String.valueOf(re.getBigInteger("author_id"))));
                    postData.put("positive_votes", String.valueOf(re.getJSONObject("public_metrics").getInt("like_count")));
                    String text=re.getString("text");
                    String title=re.getString("title");
                    sentimentanalysis.sentiment( postData,  text, title);
                    postData.put("sentiment_score", "Neutral");
                    postData.put("sentiment_confidence", 0.0);
                    postData.put("has_embedded_media", re.has("attachments"));
                    postData.put("comment_count", String.valueOf(re.getJSONObject("public_metrics").getInt("reply_count")));
                    postData.put("top_comments", new JSONArray());
                    outPosts.put(postData);
                } catch (JSONException e) {
                    e.printStackTrace();
                } catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
                }
            }
        }
        outJSON.put("posts", outPosts);
        System.out.println(outJSON.toString());
        return outJSON;
    }
    private String hashPostID(String id) {
        return id;
    }
}
