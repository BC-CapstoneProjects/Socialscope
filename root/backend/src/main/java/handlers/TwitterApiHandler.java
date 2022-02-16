package handlers;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import util.HttpUtils;
import util.Token;

import java.nio.charset.StandardCharsets;
import java.util.*;

public class TwitterApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private static final JSONObject outJSON = new JSONObject();

    private Token token;

    public TwitterApiHandler(String id, String secret, String user) {
        credentials = new HashMap<>();
        credentials.put("app_id", id);
        credentials.put("app_secret", secret);
        credentials.put("user_agent", user);
        this.token = null;
    }

    @Override
    public void requestToken() {
        String requestUri = "https://api.twitter.com/oauth2/token";
        Map<String, String> requestProperties = new HashMap<>();

        requestProperties.put("User-Agent", credentials.get("user_agent"));
        String auth = credentials.get("app_id") + ":" + credentials.get("app_secret");
        requestProperties.put("Authorization",
                "Basic " + Base64.getEncoder().encodeToString(auth.getBytes(StandardCharsets.UTF_8)));

        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("grant_type", "client_credentials");

        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "POST",
                requestProperties, requestParameters);

        String accessToken;
        long expiresIn;
        try {
            accessToken = responseJSON.getString("access_token");
            expiresIn = -1;
        } catch (JSONException e) {
            accessToken = null;
            expiresIn = 0;
        }
        this.token = new Token(accessToken, System.currentTimeMillis() + expiresIn);
    }

    @Override
    public boolean hasValidToken() {
        return true;
    }

    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) {
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
                    System.out.println("String " + i + ": "+ s + " from if");
                }
                else
                {
                    idList.add(data.getJSONObject(i).getBigInteger("id").toString());
                    System.out.println("String " + i + ": "+ s + " from else");
                }
            }
            System.out.println("Done");
            System.out.println("list size 0 if: " + idList.size());
            return TweetDetails(idList);
        }
        else
        {
            System.out.println("list size 0 else: " + idList.size());
            return TweetDetails(new ArrayList<>());
        }
    }

    public JSONObject TweetDetails(ArrayList<String> idList) {
        System.out.println("Come here");
        System.out.println(idList);
        System.out.println("list size: " + idList.size());
        JSONArray outPosts = new JSONArray();
        if(idList.isEmpty())
        {
            JSONObject postData = new JSONObject();
            postData.put("platform", "twitter");
            postData.put("Search Error", "There are no search results about the input");
            outPosts.put(postData);
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
                System.out.println("Second: " + responseJSON.toString());
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
                    postData.put("sentiment_score", "Neutral");
                    postData.put("sentiment_confidence", 0.0);
                    postData.put("has_embedded_media", re.has("attachments"));
                    postData.put("comment_count", String.valueOf(re.getJSONObject("public_metrics").getInt("reply_count")));
                    postData.put("top_comments", new JSONArray());
                    outPosts.put(postData);
                } catch (JSONException e) {
                    e.printStackTrace();
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

