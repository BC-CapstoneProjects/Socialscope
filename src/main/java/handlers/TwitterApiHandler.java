package main.java.handlers;

import main.java.util.Credentials;
import main.java.util.HttpUtils;
import main.java.util.RateLimiter;
import main.java.util.TwitterToken;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class TwitterApiHandler implements IApiHandler {

	// TODO: add twitter search implementation.

	private static JSONArray outPosts = new JSONArray();
	private static ArrayList <BigInteger> idList = new ArrayList<>();
	private static JSONObject outJSON = new JSONObject();

	private TwitterToken twitterToken;
	private List<RateLimiter> limiters = new LinkedList<>();

	public TwitterApiHandler() {
		this.twitterToken = null;
		this.limiters.add(new RateLimiter(60, 60000));  // 60 requests per minute; currently unimplemented
	}

	@Override
	public void requestToken() {
		String requestUri = "https://api.twitter.com/oauth2/token";
		Map<String, String> requestProperties = new HashMap<>();

		requestProperties.put("User-Agent", Credentials.getTwitterAppUserAgent());
		String auth = Credentials.getTwitterAppId() + ":" + Credentials.getTwitterAppSecret();
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
		try {
			accessToken = responseJSON.getString("access_token");
		} catch (JSONException e) {
			accessToken = null;
		}
		// save token
		this.twitterToken = new TwitterToken(accessToken);
	}

	@Override
	public boolean hasValidToken() {
		return true;
	}

	@Override
	public JSONObject makeQuery(String q) {

		String requestUri = "https://api.twitter.com/2/tweets/search/recent";
		// build request properties
		Map<String, String> requestProperties = new HashMap<>();
		requestProperties.put("User-Agent", Credentials.getTwitterAppUserAgent());
		requestProperties.put("Authorization", "bearer " + this.twitterToken.getTwitterToken());

		// build request parameters
		Map<String, String> requestParameters = new HashMap<>();
		requestParameters.put("query", q);
		requestParameters.put("expansions","referenced_tweets.id");
		// process response
		JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
				requestProperties, requestParameters);
		JSONArray data = responseJSON.getJSONArray("data");
		for (int i = 0; i < data.length(); i++) {
			String s = data.getJSONObject(i).toString();
			if(s.contains("type"))
			{
				JSONArray rt = data.getJSONObject(i).getJSONArray("referenced_tweets");
				idList.add(rt.getJSONObject(0).getBigInteger("id"));
			}
			else
			{
				idList.add(data.getJSONObject(i).getBigInteger("id"));
			}
		}
		return TweetDetails(idList);
	}

	public JSONObject TweetDetails(ArrayList idList) {
		for(int i = 0; i < idList.size(); i++)
		{
			String ids = idList.get(i).toString();

			String requestUri = "https://api.twitter.com/2/tweets";

			Map<String, String> requestProperties = new HashMap<>();
			requestProperties.put("User-Agent", Credentials.getTwitterAppUserAgent());
			requestProperties.put("Authorization", "bearer " + this.twitterToken.getTwitterToken());

			// build request parameters

			Map<String, String> requestParameters = new HashMap<>();
			requestParameters.put("ids", ids);
			requestParameters.put("tweet.fields", "text,author_id,created_at,lang,public_metrics");

			JSONObject responseJSON = HttpUtils.executeHttpRequest(requestUri, "GET",
					requestProperties, requestParameters);
			try {
				// ensure correct response format
				assert(responseJSON.getString("kind").equals("Listing"));

				JSONArray inPosts = responseJSON.getJSONArray("data");
				JSONObject re = inPosts.getJSONObject(0);

				JSONObject postData = new JSONObject();
				postData.put("platform", "twitter");
				postData.put("like_count",  re.getJSONObject("public_metrics").getInt("like_count"));
				postData.put("reply_count", re.getJSONObject("public_metrics").getInt("reply_count"));
				postData.put("quote_count", re.getJSONObject("public_metrics").getInt("quote_count"));
				postData.put("retweet_count", re.getJSONObject("public_metrics").getInt("retweet_count"));
				postData.put("text", re.getString("text"));
				postData.put("id", re.getBigInteger("id"));
				postData.put("lang", re.getString("lang"));
				postData.put("author_id", re.getBigInteger("author_id"));
				outPosts.put(postData);
				// add post to object
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		outJSON.put("posts", outPosts);
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
