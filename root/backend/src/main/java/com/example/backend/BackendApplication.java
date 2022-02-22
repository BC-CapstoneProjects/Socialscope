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

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class BackendApplication {

	private static final int MAX_REQUEST_RETRIES = 3;

	private static List<IApiHandler> apiHandlers; ;

	public static void main(String args[]) {

		SpringApplication.run(BackendApplication.class, args);
//		Scanner console = new Scanner(System.in);
//		System.out.println("Choose Twitter: ");
//		boolean twitterCheck = console.nextBoolean();
//		System.out.println("Choose YouTube ");
//		boolean youtubeCheck = console.nextBoolean();
//		System.out.println("Choose Reddit: ");
//		boolean redditCheck = console.nextBoolean();

//		Credentials cred = new Credentials();
//		apiHandlers = initializeApiHandlers(cred, twitterCheck, youtubeCheck, redditCheck);
//		String query = getUserQuery();
//		System.out.println("Executing search...");
//		JSONObject results = executeSearch(query, apiHandlers);
//		System.out.println("Writing results to file...");
//		writeJsonFile(results);
//		System.out.println("Done!");
	}

	public static List<IApiHandler> initializeApiHandlers(Credentials cred, boolean twitterCheck, boolean youtubeCheck, boolean redditCheck) {
		List<IApiHandler> handlers = new ArrayList<IApiHandler>();
		if(twitterCheck == true)
		{
			handlers.add(new TwitterApiHandler(cred.getTwitterAppId(), cred.getTwitterAppSecret(), cred.getTwitterAppUserAgent()));
		}
		if(youtubeCheck == true)
		{
			handlers.add(new YoutubeApiHandler(cred.getYoutubeApiKey(), cred.getYoutubeAppUserAgent()));
		}
		if(redditCheck == true)
		{
			handlers.add(new RedditApiHandler(cred.getRedditAppId(), cred.getRedditAppSecret(), cred.getRedditAppUserAgent()));
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


	public static JSONObject executeSearch(String queryText, List<IApiHandler> apis, String maxResults, String start, String end) {
		JSONObject aggregateResults = new JSONObject();
		try {
			JSONArray aggregatePosts = new JSONArray();
			// get posts
			for (IApiHandler handler : apis) {
				int counter = 0;
				JSONArray posts = null;
				while (posts == null && counter < MAX_REQUEST_RETRIES) {
					handler.requestToken();
					if (handler.hasValidToken()) posts = handler.makeQuery(queryText, maxResults, start, end).getJSONArray("posts");
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
