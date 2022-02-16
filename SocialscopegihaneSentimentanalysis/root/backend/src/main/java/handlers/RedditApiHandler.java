package handlers;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;


import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import util.HttpUtils;
import util.RateLimiter;
import util.Token;

public class RedditApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private Token token;
    private List<RateLimiter> limiters = new LinkedList<>();

    public RedditApiHandler(String id, String secret, String user) {
        credentials = new HashMap<>();
        credentials.put("app_id", id);
        credentials.put("app_secret", secret);
        credentials.put("user_agent", user);
        this.token = null;
        this.limiters.add(new RateLimiter(60, 60000));  // 60 requests per minute; currently unimplemented
    }

    @Override
    public void requestToken() {

        String requestUri = "https://ssl.reddit.com/api/v1/access_token";

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
            expiresIn = responseJSON.getLong("expires_in");
        } catch (JSONException e) {
            accessToken = null;
            expiresIn = 0;
        }

        // save token
        this.token = new Token(accessToken, System.currentTimeMillis() + expiresIn);
    }

    @Override
    public boolean hasValidToken() {
        return !(this.token.isExpired());
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

        String requestUri = "https://oauth.reddit.com/search";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));
        requestProperties.put("Authorization", "bearer " + this.token.getToken());

        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("q", q);
        requestParameters.put("t", "month");
        requestParameters.put("limit", maxResults);

        // process response
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);

        return formatQueryJSON(responseJSON);
    }

    private JSONObject formatQueryJSON(JSONObject responseData) throws Exception {

        JSONObject outJSON = new JSONObject();
        try {

            // ensure correct response format
            assert(responseData.getString("kind").equals("Listing"));
            JSONArray outPosts = new JSONArray();
            JSONArray inPosts = responseData.getJSONObject("data").getJSONArray("children");

            // populate post data fields
            for (int i = 0; i < inPosts.length(); i++) {
                JSONObject currentPost = inPosts.getJSONObject(i).getJSONObject("data");
                if (currentPost.getBoolean("over_18")) continue;  // skip posts flagged for mature content
                JSONObject postData = new JSONObject();
                Sentiment sentiment =null;  
                postData.put("platform", "reddit");
                postData.put("created_at", currentPost.getInt("created_utc"));
                postData.put("post_id", hashPostID(currentPost.getString("name")));
                postData.put("lang", "");
                postData.put("title", currentPost.getString("title"));
                postData.put("text", currentPost.getString("selftext"));
                postData.put("poster_id", hashPoster(currentPost.getString("author_fullname")));
                postData.put("positive_votes", currentPost.getInt("ups"));
                if(currentPost.getString("selftext")!="") {
                    sentiment= analyzeSentimentText(currentPost.getString("selftext"));
                    if(sentiment.getScore()<=0.4) {
                    	 postData.put("sentiment_score",  "Negative"); 
                    	
                    }else if(sentiment.getScore()>0.4&& sentiment.getScore()<0.7) {
                    	 postData.put("sentiment_score",  "Neutral");
                    }else { postData.put("sentiment_score",  "Positive");}
                    System.out.println(sentiment.getScore());
                    System.out.println("sentiment magnitude"+sentiment.getMagnitude());
                    postData.put("sentiment_confidence", sentiment.getMagnitude());
                    }else {
                    	sentiment= analyzeSentimentText(currentPost.getString("title"));
                    	  if(sentiment.getScore()<=0.4) {
                         	 postData.put("sentiment_score",  "Negative");  	
                         }else if(sentiment.getScore()>0.4&& sentiment.getScore()<0.7) {
                         	 postData.put("sentiment_score",  "Neutral");
                         }else { postData.put("sentiment_score",  "Positive");}
                    	  System.out.println(sentiment.getScore());
                    	  System.out.println("sentiment magnitude"+sentiment.getMagnitude());
                         postData.put("sentiment_confidence", sentiment.getMagnitude());
                      
                    }
                postData.put("has_embedded_media", currentPost.get("secure_media") != JSONObject.NULL
                        || !currentPost.getString("url").substring(0, 22).equals("https://www.reddit.com"));
                postData.put("comment_count", currentPost.getInt("num_comments"));
                postData.put("top_comments", new JSONArray());
                outPosts.put(postData);
            }

            // add post to object
            outJSON.put("posts", outPosts);
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return outJSON;
    }

    private String hashPostID(String id) {
        // TODO post id hashing unimplemented for now
        return id;
    }

    private String hashPoster(String poster) {
        // TODO poster name hashing unimplemented for now
        return poster;
    }

}