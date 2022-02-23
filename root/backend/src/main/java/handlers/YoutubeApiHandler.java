package handlers;


import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
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

import util.SentimentAnalysis;

import util.Token;

public class YoutubeApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private Token youtubetoken;
    private List<RateLimiter> limiters = new LinkedList<>();

    private Token token;
    SentimentAnalysis sentimentanalysis= new SentimentAnalysis();
    
    public YoutubeApiHandler(String key, String user) {
        credentials = new HashMap<>();
        credentials.put("api_key", key);
        credentials.put("user_agent", user);
        this.youtubetoken = null;

        this.token = null;
        this.limiters.add(new RateLimiter(60, 60000));  // 60 requests per minute; currently unimplemented
	
    }
   private boolean hasRequestBudget(int amount) {
    	boolean hasBudget = true;
    	for (RateLimiter limiter : this.limiters) {
    		if (!limiter.hasBudget(amount))
    			hasBudget = false;
    	}
    	return hasBudget;

        this.limiters.add(new RateLimiter(60, 60000));  // 60 requests per minute; currently unimplemented

    }

    @Override
    public void requestToken() {

    	
    	// request a token if sufficient budget and token needed
    	if (hasRequestBudget(1) ) {
    		makeTokenRequest();
    	}
    
    }
    
      private void makeTokenRequest() {


        String accessToken = credentials.get("api_key");

        this.youtubetoken = new Token(accessToken, 0);
    }

  


    @Override
    public boolean hasValidToken() {

        return true;
    }

    
    
    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) throws Exception {
    	JSONObject out = null;
    	if (hasRequestBudget(1) && (this.hasValidToken())) {
    		out = makeQueryRequest(q, maxResults, start, end);
    	}
    	if (out != null) {
    		System.out.println("Youtube query successful");
    		return out;	
    	}
    	else {
    		System.out.println("Reddit access token request failed");
    		return null;
    	}
    }
    
   
    public JSONObject makeQueryRequest(String q, String maxResults, String start, String end) throws Exception {


    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) {


        String requestUri = "https://youtube.googleapis.com/youtube/v3/search?";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();

        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("User-Agent", credentials.get("user_agent"));
        requestParameters.put("key", credentials.get("api_key"));
        requestParameters.put("type", "video");
        requestParameters.put("q", q);
        requestParameters.put("maxResults", maxResults);
        requestParameters.put("publishedAfter", start);
        requestParameters.put("publishedBefore", end);

   
        // process response
       
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);
 
        return formatQueryJSON(responseJSON);

    }
    
    

        // process response
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);
        return formatQueryJSON(responseJSON);

    }



    public JSONObject makeQueryVideo(String videoId) {

        String requestUri = "https://www.googleapis.com/youtube/v3/videos?";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();


        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("User-Agent", credentials.get("user_agent"));
        requestParameters.put("key", credentials.get("api_key"));
        requestParameters.put("part", "snippet,topicDetails,statistics");
        requestParameters.put("id", videoId);
        requestParameters.put("maxResults", "10");

        // process response
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);

        return responseJSON;
    }

    private JSONObject formatQueryJSON(JSONObject responseData) throws Exception {

    private JSONObject formatQueryJSON(JSONObject responseData) {


        JSONObject outJSON = new JSONObject();
        try {

            // ensure correct response format
            JSONArray outPosts = new JSONArray();

            JSONArray inPosts = responseData.getJSONArray("items");
            // populate post data fields
            for (int i = 0; i < inPosts.length(); i++) {
                assert (responseData.getJSONObject("id").getString("kind").equals("youtube#video"));
                String videoId = inPosts.getJSONObject(i).getJSONObject("id").getString("videoId");
                JSONObject videoData = makeQueryVideo(videoId);
                JSONArray currentPost = videoData.getJSONArray("items");
                JSONObject postData = new JSONObject();
                Sentiment sentiment =null;

                postData.put("platform", "Youtube");
                postData.put("created_at", currentPost.getJSONObject(0).getJSONObject("snippet").getString("publishedAt"));
                postData.put("post_id", hashPostID(currentPost.getJSONObject(0).getString("id")));
                if (currentPost.getJSONObject(0).getJSONObject("snippet").has("defaultAudioLanguage"))
                    postData.put("lang", currentPost.getJSONObject(0).getJSONObject("snippet").getString("defaultAudioLanguage"));
                else
                    postData.put("lang", "");
                postData.put("title", currentPost.getJSONObject(0).getJSONObject("snippet").getString("title"));
                postData.put("text", currentPost.getJSONObject(0).getJSONObject("snippet").getJSONObject("localized").getString("description"));
 
                String text=currentPost.getJSONObject(0).getJSONObject("snippet").getJSONObject("localized").getString("description");
                String title=currentPost.getJSONObject(0).getJSONObject("snippet").getString("title");
                sentimentanalysis.sentiment( postData,  text, title);
                
                if (currentPost.getJSONObject(0).getJSONObject("snippet").has("defaultAudioLanguage"))
                    postData.put("lang", currentPost.getJSONObject(0).getJSONObject("snippet").getString("defaultAudioLanguage"));
                else
                    postData.put("lang", "");
                postData.put("title", currentPost.getJSONObject(0).getJSONObject("snippet").getString("title"));
                postData.put("text", currentPost.getJSONObject(0).getJSONObject("snippet").getJSONObject("localized").getString("description"));

                postData.put("sentiment_score", "Neutral");
                postData.put("sentiment_confidence", 0.0);

                if (currentPost.getJSONObject(0).getJSONObject("statistics").has("commentCount")) {
                    postData.put("comment_count", currentPost.getJSONObject(0).getJSONObject("statistics").getInt("commentCount"));
                    postData.put("positive_votes", currentPost.getJSONObject(0).getJSONObject("statistics").getInt("likeCount"));
                } else {
                    postData.put("comment_count", 0);
                    postData.put("positive_votes", 0);
                }
                outPosts.put(postData);
            }

            // add post to object
            outJSON.put("posts", outPosts);
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            System.out.println("error parsing youtube results");
            //e.printStackTrace();
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



}

