package com.example.backend;

import handlers.IApiHandler;
import handlers.RedditApiHandler;
import handlers.TwitterApiHandler;
import handlers.YoutubeApiHandler;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import util.Credentials;
import util.RateLimiter;

import java.io.*;
import java.util.*;

@SpringBootApplication
public class BackendApplication {

	private static final int MAX_REQUEST_RETRIES = 3;

	private static List<IApiHandler> apiHandlers; ;
	private static RateLimiter twitterRateLimit = new RateLimiter(200, 900000);
	private static ArrayList<Long> timePeriod = new ArrayList<>();
	private static long trackTime = 0;

	public static void main(String args[]) {
		SpringApplication.run(BackendApplication.class, args);
	}

	public static HashMap<String, IApiHandler> initializeApiHandlers(Credentials cred, boolean twitterCheck, boolean youtubeCheck, boolean redditCheck) {
		HashMap<String, IApiHandler> handlers = new HashMap<>();
		if(twitterCheck == true)
		{
			handlers.put("twitter", new TwitterApiHandler(cred.getTwitterAppId(), cred.getTwitterAppSecret(), cred.getTwitterAppUserAgent()));
		}
		if(youtubeCheck == true)
		{
			handlers.put("youtube", new YoutubeApiHandler(cred.getYoutubeApiKey(), cred.getYoutubeAppUserAgent()));
		}
		if(redditCheck == true)
		{
			handlers.put("reddit", new RedditApiHandler(cred.getRedditAppId(), cred.getRedditAppSecret(), cred.getRedditAppUserAgent()));
		}
		return handlers;
	}

	private static String getUserQuery() {
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String userInput = null;
		System.out.println("Enter a query: ");
		try {
			userInput = reader.readLine();
			while (userInput.isBlank()) {
				System.out.println("Please enter valid input.");
				userInput = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userInput.strip();
	}

	public static JSONObject executeSearch(String queryText, HashMap<String, IApiHandler> apis, String maxResults, String start, String end)
	{
		JSONObject aggregateResults = new JSONObject();
		try {
			JSONArray aggregatePosts = new JSONArray();
			// get posts
			for (Map.Entry<String, IApiHandler> entry : apis.entrySet()) {
				int counter = 0;
				JSONArray posts = null;

				while (posts == null && counter < MAX_REQUEST_RETRIES) {
					entry.getValue().requestToken();

					if (entry.getValue().hasValidToken())
					{
						if(entry.getKey().equals("twitter"))
						{
							int numberOfRequest = 1 + Integer.parseInt(maxResults);
							if(((System.currentTimeMillis() / 1000F) / 60F) - ((trackTime / 1000F) / 60F) < 15)
							{
								if(twitterRateLimit.notEnough(numberOfRequest))
								{
									JSONArray outPosts = new JSONArray();
									JSONObject postData = new JSONObject();
									JSONObject outJSON = new JSONObject();
									postData.put("platform", "twitter");
									postData.put("created_at", -1);
									postData.put("post_id", -1);
									postData.put("lang", -1);
									postData.put("title", -1);
									postData.put("text", "Please wait " + (15 - ((trackTime / 1000F) / 60F)) + " minutes to continue");
									postData.put("author_id", -1);
									postData.put("positive_votes", -1);
									postData.put("sentiment_score", -1);
									postData.put("sentiment_confidence", -1);
									postData.put("has_embedded_media", -1);
									postData.put("comment_count", -1);
									postData.put("top_comments", -1);
									outPosts.put(postData);
									outJSON.put("posts", outPosts);
									posts = outJSON.getJSONArray("posts");
									break;
								}
								System.out.println("initial: " + twitterRateLimit.getPeriodRequestBudget());
							}
							else
							{
								twitterRateLimit.setPeriodRequestBudget(200);
							}
							trackTime = System.currentTimeMillis();
							posts = entry.getValue().makeQuery(queryText, maxResults, start, end).getJSONArray("posts");
							twitterRateLimit.setPeriodRequestBudget(twitterRateLimit.getPeriodRequestBudget() - numberOfRequest);
						}
						else
						{
							posts = entry.getValue().makeQuery(queryText, maxResults, start, end).getJSONArray("posts");
						}
					}
					counter++;
				}
				if (posts == null) continue;  // move on to the next api if unable to retrieve posts even after multiple requests
				for (int i = 0; i < posts.length(); i++) aggregatePosts.put(posts.get(i));
			}
			aggregateResults.put("posts", aggregatePosts);
			// add metadata
			JSONObject metaInfo = new JSONObject();
			metaInfo.put("query", queryText);
			aggregateResults.put("meta", metaInfo);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return aggregateResults;
	}

	private static void writeJsonFile(JSONObject json) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter("aggregateResults.json"));
			writer.write(json.toString());
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
