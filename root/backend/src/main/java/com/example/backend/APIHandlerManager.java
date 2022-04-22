package com.example.backend;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
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
	
	private ThreadPoolTaskExecutor taskExecutor;
	
	public APIHandlerManager() {
		Credentials cred = new Credentials();
		this.handlers = initializeApiHandlers(cred);
		this.sentimentAnalysis = new SentimentAnalysis(cred);
		System.out.println("Handlers initialized");
		this.taskExecutor = new ThreadPoolTaskExecutor();
		this.taskExecutor.setCorePoolSize(4);
		this.taskExecutor.setMaxPoolSize(4);
		this.taskExecutor.setThreadNamePrefix("api_handler_executor_thread");
		this.taskExecutor.initialize();
	}
	
	public Map<String, IApiHandler> initializeApiHandlers(Credentials cred) {
		Map<String, IApiHandler> handlerMap = new HashMap<>();
		handlerMap.put("twitter", new TwitterApiHandler(cred.getTwitterAppId(), cred.getTwitterAppSecret(), cred.getTwitterAppUserAgent()));
		handlerMap.put("youtube", new YoutubeApiHandler(cred.getYoutubeApiKey(), cred.getYoutubeAppUserAgent()));
		handlerMap.put("reddit", new RedditApiHandler(cred.getRedditAppId(), cred.getRedditAppSecret(), cred.getRedditAppUserAgent()));
		return handlerMap;
	}
	
	private static JSONObject attemptHandlerRequest(IApiHandler handler, Map<String, String> params, int maxRetries) {
		int counter = 0;
		JSONObject resultObject = null;
		while (resultObject == null && counter < MAX_REQUEST_RETRIES) {
			handler.requestToken();
			if (handler.hasValidToken()) {
				resultObject = handler.makeQuery(params.get("queryText"), params.get("maxResults"), params.get("start"), params.get("end"));
			}
			counter++;
		}
		if (resultObject == null)
			System.out.println("Null response object");
		return resultObject;
	}
	
	public JSONObject executeSearch(List<String> namesOfHandlersInQuery, String queryText, String maxResults, String start, String end) {
		 Map<String, String> queryParams = new HashMap<>();
		queryParams.put("queryText", queryText);
        queryParams.put("maxResults", maxResults);
        queryParams.put("start", start);
        queryParams.put("end", end);
        return this.executeSearch(namesOfHandlersInQuery, queryParams);
	}
	
	public JSONObject executeSearch(List<String> namesOfHandlersInQuery, Map<String, String> queryParams) {
		long searchStartTime = System.currentTimeMillis();
		JSONObject aggregateResults = new JSONObject();
		try {
			// make new params item containing the number of results for an individual search
			Map<String, String> splitQueryParams = new HashMap<>();
			splitQueryParams.putAll(queryParams);
			splitQueryParams.remove("maxResults");
			int maxResultsNumeric = Integer.parseInt(queryParams.get("maxResults")) / namesOfHandlersInQuery.size();
			splitQueryParams.put("maxResults", Integer.toString(maxResultsNumeric));
			List<Future<JSONObject>> resultObjectFutures = new ArrayList<>();
			// get posts
			for (Map.Entry<String, IApiHandler> handler : this.handlers.entrySet()) {
				if (namesOfHandlersInQuery.contains(handler.getKey())) {
					resultObjectFutures.add(this.taskExecutor.submit(() -> attemptHandlerRequest(handler.getValue(), splitQueryParams, MAX_REQUEST_RETRIES)));
				}
			}
			// wait for posts to be retrieved and aggregate to single array
			JSONArray aggregatePosts = new JSONArray();
			for(Future<JSONObject> resultObjectFuture : resultObjectFutures) {
				JSONObject resultPosts = resultObjectFuture.get();//.getJSONArray("posts");
				System.out.println(resultPosts.toString());
				aggregatePosts.putAll(resultPosts.getJSONArray("posts"));
			}
			// process posts and add to results object
			aggregateResults.put("posts", this.processPosts(aggregatePosts));
			// add metadata to results object
			JSONObject metaInfo = new JSONObject();
			metaInfo.put("query", queryParams.get("queryText"));
			aggregateResults.put("meta", metaInfo);
			System.out.println(String.format("EXECUTION TIME: %d", System.currentTimeMillis() - searchStartTime));
		} catch (NumberFormatException e) {
			System.out.println("Max results not an integer.");
			JSONObject metaInfo = new JSONObject();
			metaInfo.put("query", queryParams.get("queryText"));
			JSONObject errorObj = new JSONObject();
			errorObj.put("type", "illegal parameter");
			errorObj.put("details", "invalid maximum results value");
			metaInfo.put("error", errorObj);
			aggregateResults.put("meta", metaInfo);
			
		} catch (JSONException e) {
			e.printStackTrace();
		} catch (InterruptedException e) {  // thrown if taskExecutor thread interrupted and throws
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ExecutionException e) {  // thrown if taskExecutor thread was aborted with an exception  TODO: ensure does not occur and cause crash.
			// TODO Auto-generated catch block
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
