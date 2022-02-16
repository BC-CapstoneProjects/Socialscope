package handlers;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import util.HttpUtils;
import util.RateLimiter;
import util.Token;

import java.nio.charset.StandardCharsets;
import java.util.*;

public class TwitterApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    //    private static ArrayList <String> idList = new ArrayList<>();
    private static final JSONObject outJSON = new JSONObject();

    private Token token;
    private List<RateLimiter> limiters = new LinkedList<>();

    public TwitterApiHandler(String id, String secret, String user) {
        credentials = new HashMap<>();
        credentials.put("app_id", id);
        credentials.put("app_secret", secret);
        credentials.put("user_agent", user);
        this.token = null;
        this.limiters.add(new RateLimiter(450, 9000));  // 60 requests per minute; currently unimplemented
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
    
    /** Identifies the sentiment in the string {@code text}. */
    public static Sentiment analyzeSentimentText(String text) throws Exception {
      // [START language_sentiment_text]
      // Instantiate the Language client com.google.cloud.language.v1.LanguageServiceClient
      try (LanguageServiceClient language = LanguageServiceClient.create()) {
        Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
        AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
        Sentiment sentiment = response.getDocumentSentiment();
        if (sentiment == null) {
          System.out.println("No sentiment found");
        } else {
         // System.out.printf("Sentiment magnitude: %.3f\n", sentiment.getMagnitude());
         // System.out.printf("Sentiment score: %.3f\n", sentiment.getScore());
        }
        return sentiment;
      }
      // [END language_sentiment_text]
    }

    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) throws Exception {
        ArrayList <String> idList = new ArrayList<>();
        String requestUri = "https://api.twitter.com/2/tweets/search/recent";

        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));
        requestProperties.put("Authorization", "bearer " + this.token.getToken());

        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("query", q);
        requestParameters.put("expansions","referenced_tweets.id");
        requestParameters.put("max_results", maxResults);
        requestParameters.put("start_time", start);
        requestParameters.put("end_time", end);

        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);
        
        System.out.println(responseJSON.toString());
        
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
    public JSONObject TweetDetails(ArrayList<String> idList) throws Exception {
        System.out.println(idList);
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
                try {
                    assert (responseJSON.getString("kind").equals("Listing"));

                    JSONArray inPosts = responseJSON.getJSONArray("data");
                    JSONObject re = inPosts.getJSONObject(0);
                    JSONObject postData = new JSONObject();
                    Sentiment sentiment =null;
                    postData.put("platform", "twitter");
                    postData.put("created_at", re.getString("created_at"));
                    postData.put("post_id", hashPostID(String.valueOf(re.getBigInteger("id"))));
                    postData.put("lang", re.getString("lang"));
                    postData.put("title", "None");
                    postData.put("text", re.getString("text"));
                    postData.put("author_id", hashPostID(String.valueOf(re.getBigInteger("author_id"))));
                    postData.put("positive_votes", String.valueOf(re.getJSONObject("public_metrics").getInt("like_count")));
                    if(re.getString("text")!="") {
                        sentiment= analyzeSentimentText(re.getString("text"));
                        if(sentiment.getScore()<=0.4) {
                        	 postData.put("sentiment_score",  "Negative");  	
                        }else if(sentiment.getScore()>0.4&& sentiment.getScore()<0.7) {
                        	 postData.put("sentiment_score",  "Neutral");
                        }else { postData.put("sentiment_score",  "Positive");}
                        System.out.println(sentiment.getScore());
                        System.out.println("sentiment magnitude"+sentiment.getMagnitude());
                        postData.put("sentiment_confidence", sentiment.getMagnitude());
                        }else {
                        	sentiment= analyzeSentimentText(re.getString("title"));
                        	  if(sentiment.getScore()<=0.4) {
                             	 postData.put("sentiment_score",  "Negative");  	
                             }else if(sentiment.getScore()>0.4&& sentiment.getScore()<0.7) {
                             	 postData.put("sentiment_score",  "Neutral");
                             }else { postData.put("sentiment_score",  "Positive");}
                        	  System.out.println(sentiment.getScore());
                        	  System.out.println("sentiment magnitude"+sentiment.getMagnitude());
                             postData.put("sentiment_confidence", sentiment.getMagnitude());
                          
                        }
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
