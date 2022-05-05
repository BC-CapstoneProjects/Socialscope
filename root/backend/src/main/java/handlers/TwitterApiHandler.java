package handlers;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.lettuce.core.RedisConnectionException;
import io.lettuce.core.RedisException;
import util.HttpUtils;
import util.SentimentAnalysis;
import util.TextEncoder;
import util.TimeTranslator;
import util.Token;
import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;
import util.SentimentAnalysis;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class TwitterApiHandler implements IApiHandler {

    private Map<String, String> credentials;

    private Token token;
    private List<IRateLimiter> limiters;
    public List<IRateLimiter> getLimiters() {
        return limiters;
    }

    public TwitterApiHandler(String id, String secret, String user) {
        credentials = new HashMap<>();
        credentials.put("app_id", id);
        credentials.put("app_secret", secret);
        credentials.put("user_agent", user);
        this.token = null;
        this.limiters = new LinkedList<>();
        IRateLimiter primaryLimiter = null;
        try {
        	primaryLimiter = new RedisRateLimiter(450, 900000);
        }
        catch (RedisException ex) { 
        	System.out.println("Local twitter limiter fallback triggered...");
        	primaryLimiter = new LocalRateLimiter(450, 900000);
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
        String max = new String(maxResults);
        if(max == null || max.equals(""))
        {
            max = "10";
        }
        if (hasRequestBudget(Integer.parseInt(max) + 1) && (this.hasValidToken())) {
            out = makeQueryRequest(q, max, start, end);
            for (IRateLimiter limiter : this.limiters) {
            	limiter.spendBudget(Integer.parseInt(max) + 1);  // initial search + one detail lookup per tweet
            }
        }
        if (out != null) {
            System.out.println("Twitter query successful");
            return out;
        }
        else {
            System.out.println("Twitter query failed");
            System.out.println("max: " + maxResults);
            System.out.println("has token: " + Boolean.toString(this.hasValidToken()));
            System.out.println("has budget: " + Boolean.toString(this.hasRequestBudget(Integer.parseInt(max) + 1)));
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
        
        if (Integer.parseInt(maxResults) < 10) {
        	requestParameters.put("max_results", "10");
        }
        else if (Integer.parseInt(maxResults) > 100) {
        	requestParameters.put("max_results", "100");
        }
        else {
        	requestParameters.put("max_results", maxResults);
        }
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
        if(responseJSON.has("data"))
        {
            JSONArray data = responseJSON.getJSONArray("data");
            System.out.println("MAX: " + maxResults);
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
            if (idList.size() > Integer.parseInt(maxResults)) {
            	return (filterDetailsToSize(getTweetDetails(idList), Integer.parseInt(maxResults)));
            }
            else {
            	return getTweetDetails(idList);
            }
        }
        else
        {
        	System.out.println(responseJSON.toString());
            return getTweetDetails(new ArrayList<>());
        }
    }
    public JSONObject getTweetDetails(ArrayList<String> idList) {
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
                requestProperties.put("User-Agent", credentials.get("user_agent"));
                requestProperties.put("Authorization", "bearer " + this.token.getToken());

                Map<String, String> requestParameters = new HashMap<>();
                requestParameters.put("ids", ids);
                requestParameters.put("tweet.fields", "text,author_id,created_at,lang,public_metrics");
                requestParameters.put("expansions", "attachments.media_keys");

                JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
                        requestProperties, requestParameters);
                
                try {
//                    assert (responseJSON.getString("kind").equals("Listing"));

                    JSONArray inPosts = responseJSON.getJSONArray("data");
                    JSONObject re = inPosts.getJSONObject(0);
                    JSONObject postData = new JSONObject();
                    postData.put("platform", "twitter");
                    postData.put("created_at", TimeTranslator.getEpochTime(re.getString("created_at")));
                    postData.put("post_id", hashPostID(String.valueOf(re.getBigInteger("id"))));
                    postData.put("lang", re.getString("lang"));
                    postData.put("title", TextEncoder.ensureUTF8(""));
                    postData.put("text", TextEncoder.base64encodeUTF8(TextEncoder.ensureUTF8(re.getString("text"))));
                    postData.put("author_id", hashPostID(String.valueOf(re.getBigInteger("author_id"))));
                    postData.put("positive_votes", re.getJSONObject("public_metrics").getInt("like_count"));
                    postData.put("has_embedded_media", re.has("attachments"));
                    postData.put("comment_count", re.getJSONObject("public_metrics").getInt("reply_count"));
                    postData.put("top_comments", new JSONArray());
                    outPosts.put(postData);
                    System.out.println(outPosts.toString());
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
        JSONObject outJSON = new JSONObject();
        outJSON.put("posts", outPosts);
        return outJSON;
    }
    
    private JSONObject filterDetailsToSize(JSONObject details, int maxResults) {
    	try {
    		List<JSONObject> keep = new ArrayList<JSONObject>();
    		details.getJSONArray("posts").forEach((obj) -> {keep.add((JSONObject)obj);});
    		keep.sort((jo1, jo2) -> { return Integer.compare(getImpressionWeightFromJSON(jo1), getImpressionWeightFromJSON(jo2)); });
    		while(keep.size() > maxResults) {
    			keep.remove(0);
    		}
    		JSONObject outJSON = new JSONObject();
    		JSONArray outPosts = new JSONArray();
    		keep.forEach(j -> {outPosts.put(j);});
    		outJSON.put("posts", outPosts);
    		return outJSON;
    	}
    	catch (Exception e) {
    		e.printStackTrace();
    		return details;
    	}
    }
    
    private int getImpressionWeightFromJSON(JSONObject jo) {
    	return jo.getInt("positive_votes") + jo.getInt("comment_count");
    }
    
    private String hashPostID(String id) {
        return id;
    }
}