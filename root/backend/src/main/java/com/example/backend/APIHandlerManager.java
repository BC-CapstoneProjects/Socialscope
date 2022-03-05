package com.example.backend;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import handlers.IApiHandler;
import handlers.RedditApiHandler;
import handlers.TwitterApiHandler;
import handlers.YoutubeApiHandler;
import util.Credentials;
import util.SentimentAnalysis;
import util.TextEncoder;

@Component
public class APIHandlerManager {
	
	private static final int MAX_REQUEST_RETRIES = 3;
	
	private Map<String, IApiHandler> handlers;
	private SentimentAnalysis sentimentAnalysis;
	
	public APIHandlerManager() {
		Credentials cred = new Credentials();
		this.handlers = initializeApiHandlers(cred);
		this.sentimentAnalysis = new SentimentAnalysis(cred);
		System.out.println("Handlers initialized");
	}
	
	public Map<String, IApiHandler> initializeApiHandlers(Credentials cred) {
		Map<String, IApiHandler> handlerMap = new HashMap<>();
		handlerMap.put("twitter", new TwitterApiHandler(cred.getTwitterAppId(), cred.getTwitterAppSecret(), cred.getTwitterAppUserAgent()));
		handlerMap.put("youtube", new YoutubeApiHandler(cred.getYoutubeApiKey(), cred.getYoutubeAppUserAgent()));
		handlerMap.put("reddit", new RedditApiHandler(cred.getRedditAppId(), cred.getRedditAppSecret(), cred.getRedditAppUserAgent()));
		return handlerMap;
	}
	
	public JSONObject executeSearch(List<String> namesOfHandlersInQuery, String queryText, String maxResults, String start, String end) {
		long searchStartTime = System.currentTimeMillis();
		JSONObject aggregateResults = new JSONObject();
		try {
			int maxResultsNumeric = Integer.parseInt(maxResults) / namesOfHandlersInQuery.size();
			JSONArray aggregatePosts = new JSONArray();
			// get posts
			for (Map.Entry<String, IApiHandler> handler : this.handlers.entrySet()) {
				if (namesOfHandlersInQuery.contains(handler.getKey())) {
					int counter = 0;
					JSONArray posts = null;
					while (posts == null && counter < MAX_REQUEST_RETRIES) {
						handler.getValue().requestToken();
						if (handler.getValue().hasValidToken())
							posts = handler.getValue().makeQuery(queryText, Integer.toString(maxResultsNumeric), start, end).getJSONArray("posts");
						counter++;
					}
					if (posts == null || posts.length() == 0) continue;  // move on to the next api if unable to retrieve posts even after multiple requests
					for (int i = 0; i < posts.length(); i++) aggregatePosts.put(posts.get(i));
				}
			}
			aggregateResults.put("posts", this.processPosts(aggregatePosts));
			// add metadata
			JSONObject metaInfo = new JSONObject();
			metaInfo.put("query", queryText);
			aggregateResults.put("meta", metaInfo);
			System.out.println(String.format("EXECUTION TIME: %d", System.currentTimeMillis() - searchStartTime));
		} catch (NumberFormatException e) {
			System.out.println("Max results not an integer.");
			JSONObject metaInfo = new JSONObject();
			metaInfo.put("query", queryText);
			JSONObject errorObj = new JSONObject();
			errorObj.put("type", "illegal parameter");
			errorObj.put("details", "invalid maximum results value");
			metaInfo.put("error", errorObj);
			aggregateResults.put("meta", metaInfo);
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return aggregateResults;
	}
	
	public JSONArray processPosts(JSONArray posts) {
		System.out.println("Retrieving sentiment...");
		for (int i = 0; i < posts.length(); i++) {
			JSONObject post = posts.getJSONObject(i);
			String postTitle = TextEncoder.base64decodeUTF8(post.getString("title"));
			String postText = TextEncoder.base64decodeUTF8(post.getString("text"));
			sentimentAnalysis.sentiment(post, postText, postTitle);
			System.out.println("Progress: " + Float.valueOf(i/((float)posts.length())));
		}
		System.out.println("Sentiment retrieval complete");
		return posts;
	}
}
