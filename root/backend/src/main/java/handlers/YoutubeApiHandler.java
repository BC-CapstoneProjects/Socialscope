package handlers;

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

import io.lettuce.core.RedisConnectionException;
import io.lettuce.core.RedisException;
import util.HttpUtils;
import util.TextEncoder;
import util.TimeTranslator;
import util.Token;
import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;

public class YoutubeApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private Token youtubetoken;
    private List<IRateLimiter> limiters;
    
    public YoutubeApiHandler(String key, String user) {
        credentials = new HashMap<>();
        credentials.put("api_key", key);
        credentials.put("user_agent", user);
        this.youtubetoken = null;
        this.limiters = new LinkedList<>();
        IRateLimiter primaryLimiter = null;
        try {
        	primaryLimiter = new RedisRateLimiter(60, 60000);
        }
        catch (RedisException ex) { 
        	System.out.println("Local youtube limiter fallback triggered...");
        	primaryLimiter = new LocalRateLimiter(60, 60000);
        }
        if (primaryLimiter != null) {
        	this.limiters.add(primaryLimiter);
        }
    }

    public List<IRateLimiter> getLimiters() {
        return limiters;
    }

    @Override
    public void requestToken() {

        String accessToken = credentials.get("api_key");

        this.youtubetoken = new Token(accessToken, 0);
    }

    @Override
    public boolean hasValidToken() {

        return true;
    }

    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) {

        String requestUri = "https://youtube.googleapis.com/youtube/v3/search";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));

        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("key", credentials.get("api_key"));
        requestParameters.put("type", "video");
        requestParameters.put("q", q);
        if(maxResults.equals(""))
        {
            maxResults = "10";
        }
        requestParameters.put("max_results", maxResults);
        if(!start.equals(""))
        {
            start += "T00:00:00.000Z";
            requestParameters.put("publishedAfter", start);
        }
        if(!end.equals(""))
        {
            end += "T00:00:00.000Z";
            requestParameters.put("publishedBefore", end);
        }
        requestParameters.put("maxResults", maxResults);
	    requestParameters.put("relevanceLanguage", "en");  // soft restriction to english responses for now
        // process response
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);
        return formatQueryJSON(responseJSON);

    }


    public JSONObject makeQueryVideo(String videoId) {

        String requestUri = "https://www.googleapis.com/youtube/v3/videos";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));


        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("key", credentials.get("api_key"));
        requestParameters.put("part", "snippet,topicDetails,statistics");
        requestParameters.put("id", videoId);

        // process response
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);

        return responseJSON;
    }

    private JSONObject formatQueryJSON(JSONObject responseData) {


        JSONObject outJSON = new JSONObject();
        try {

            // ensure correct response format
            JSONArray outPosts = new JSONArray();

            JSONArray inPosts = responseData.getJSONArray("items");
            // populate post data fields
            System.out.println(inPosts.toString());
            for (int i = 0; i < inPosts.length(); i++) {
                assert (inPosts.getJSONObject(i).getJSONObject("id").getString("kind").equals("youtube#video"));
                String videoId = inPosts.getJSONObject(i).getJSONObject("id").getString("videoId");
                JSONObject videoData = makeQueryVideo(videoId);
	        
                JSONArray currentPost = videoData.getJSONArray("items");
                System.out.println("POST:");
                System.out.println(currentPost.toString());
                JSONObject postData = new JSONObject();
                postData.put("platform", "youtube");
                postData.put("created_at", TimeTranslator.getEpochTime(currentPost.getJSONObject(0).getJSONObject("snippet").getString("publishedAt")));
                postData.put("post_id", hashPostID(currentPost.getJSONObject(0).getString("id")));
                String text=currentPost.getJSONObject(0).getJSONObject("snippet").getJSONObject("localized").getString("description");
                String title=currentPost.getJSONObject(0).getJSONObject("snippet").getString("title");
                
                
                if (currentPost.getJSONObject(0).getJSONObject("snippet").has("defaultAudioLanguage"))
                    postData.put("lang", currentPost.getJSONObject(0).getJSONObject("snippet").getString("defaultAudioLanguage"));
                else
                    postData.put("lang", "unknown");
                postData.put("title", TextEncoder.base64encodeUTF8(TextEncoder.ensureUTF8(currentPost.getJSONObject(0).getJSONObject("snippet").getString("title"))));
                postData.put("text", TextEncoder.base64encodeUTF8((TextEncoder.ensureUTF8(currentPost.getJSONObject(0).getJSONObject("snippet").getJSONObject("localized").getString("description"))))); 
                if (currentPost.getJSONObject(0).getJSONObject("statistics").has("commentCount")) {
                    postData.put("comment_count", currentPost.getJSONObject(0).getJSONObject("statistics").getInt("commentCount"));
		} else {
                    postData.put("comment_count", 0);
		}
		if (currentPost.getJSONObject(0).getJSONObject("statistics").has("likeCount")) {
                    postData.put("positive_votes", currentPost.getJSONObject(0).getJSONObject("statistics").getInt("likeCount"));
                } else {
			postData.put("positive_votes", 0);
                }
                outPosts.put(postData);
            }
            // add post to object
            outJSON.put("posts", outPosts);
        } catch (JSONException e) {
            // TODO Auto-generated catch block
            System.out.println("error parsing youtube results");
            e.printStackTrace();
            if (!outJSON.keySet().contains("posts"))
            	outJSON.put("posts", new JSONArray());
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