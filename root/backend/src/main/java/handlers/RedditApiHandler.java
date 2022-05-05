package handlers;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import util.TextEncoder;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.lettuce.core.RedisConnectionException;
import io.lettuce.core.RedisException;
import util.HttpUtils;
import util.Token;
import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;

public class RedditApiHandler implements IApiHandler {

    private Map<String, String> credentials;
    private Token token;
    private List<IRateLimiter> limiters;
    public List<IRateLimiter> getLimiters() {
        return limiters;
    }

    public RedditApiHandler(String id, String secret, String user) {
        this.credentials = new HashMap<>();
        this.credentials.put("app_id", id);
        this.credentials.put("app_secret", secret);
        this.credentials.put("user_agent", user);
        this.token = null;
        this.limiters = new LinkedList<>();
        IRateLimiter primaryLimiter = null;
        try {  // attempt to create limiter connecting to redis cache
        	primaryLimiter = new RedisRateLimiter(60, 60000);
        }
        catch (RedisException ex) {  // fall back to local tracking if no redis instance found
        	System.out.println("Local reddit limiter fallback triggered...");
        	primaryLimiter = new LocalRateLimiter(60, 60000);
        }
        if (primaryLimiter != null) {
        	this.limiters.add(primaryLimiter);
        }
    }
    
    private boolean hasRequestBudget(int amount) {
    	boolean hasBudget = true;
    	for (IRateLimiter limiter : this.limiters) {
    		if (!limiter.hasBudget(amount))
    			hasBudget = false;
    	}
    	return hasBudget;
    }

    @Override
    public void requestToken() {
    	boolean requestPassed = false;
    	
    	// request a token if sufficient budget and token needed
    	if (hasRequestBudget(1) && (this.token == null || !this.hasValidToken())) {
    		requestPassed = makeTokenRequest();
    		this.limiters.forEach((limiter) -> {limiter.spendBudget(1);});
    	}
    	if (requestPassed)
    		System.out.println("Reddit access token request passed");
    	else if (this.token == null || !this.hasValidToken())
    		System.out.println("Reddit access token request failed");
    	else 
    		System.out.println("Reddit token still valid, skipping token request");
    }
    
    private boolean makeTokenRequest() {
    	String requestUri = "https://ssl.reddit.com/api/v1/access_token";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));
        String auth = credentials.get("app_id") + ":" + credentials.get("app_secret");
        requestProperties.put("Authorization",
                "Basic " + TextEncoder.base64encodeUTF8(auth));

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
            expiresIn = responseJSON.getLong("expires_in") * 1000;
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
        return !(this.token.isExpired());
    }

    @Override
    public JSONObject makeQuery(String q, String maxResults, String start, String end) {
    	JSONObject out = null;
    	if (hasRequestBudget(1) && (this.hasValidToken())) {
    		out = makeQueryRequest(q, maxResults, start, end);
    		this.limiters.forEach((limiter) -> {limiter.spendBudget(1);});
    	}
    	if (out != null) {
    		System.out.println("Reddit query successful");
    		return out;	
    	}
    	else {
    		System.out.println("Reddit access token request failed");
    		return null;
    	}
    }
    
    private JSONObject makeQueryRequest(String q, String maxResults, String start, String end) {
    	String requestUri = "https://oauth.reddit.com/search";

        // build request properties
        Map<String, String> requestProperties = new HashMap<>();
        requestProperties.put("User-Agent", credentials.get("user_agent"));
        requestProperties.put("Authorization", "bearer " + this.token.getToken());

        // build request parameters
        Map<String, String> requestParameters = new HashMap<>();
        requestParameters.put("q", q);
        requestParameters.put("t", "week");
        requestParameters.put("limit", maxResults);

        // process response
        System.out.println(requestProperties.toString());
        System.out.println(requestParameters.toString());
        
        JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                requestProperties, requestParameters);

        return formatQueryJSON(responseJSON);
    }
    

    private JSONObject formatQueryJSON(JSONObject responseData) {

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
                postData.put("platform", "reddit");
                postData.put("created_at", currentPost.getLong("created_utc"));
                postData.put("post_id", hashPostID(currentPost.getString("name")));
                postData.put("lang", "unknown");
                postData.put("title", TextEncoder.base64encodeUTF8(TextEncoder.ensureUTF8(currentPost.getString("title"))));
                postData.put("text", TextEncoder.base64encodeUTF8(TextEncoder.ensureUTF8(currentPost.getString("selftext"))));
                postData.put("poster_id", hashPoster(currentPost.getString("author_fullname")));
                postData.put("positive_votes", currentPost.getInt("ups"));
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
        } catch (Exception e) {
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

