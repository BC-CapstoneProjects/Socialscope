package com.example.capstone;

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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

@SpringBootApplication
public class CapstoneApplication {

private static final int MAX_REQUEST_RETRIES = 3;

	private static List<IApiHandler> apiHandlers; ;

	public static void main(String args[]) throws ParseException {

		SpringApplication.run(CapstoneApplication.class, args);
		Scanner console = new Scanner(System.in);
		System.out.println("Choose Twitter: ");
		boolean twitterCheck = console.nextBoolean();
		System.out.println("Choose YouTube ");
		boolean youtubeCheck = console.nextBoolean();
		System.out.println("Choose Reddit: ");
		boolean redditCheck = console.nextBoolean();

		Credentials cred = new Credentials();
		apiHandlers = initializeApiHandlers(cred, twitterCheck, youtubeCheck, redditCheck);
		String query = getUserQuery();
		String maxresults = maxQuery();
		String startdate = startdateQuery();
		String enddate = enddateQuery();
		System.out.println("Executing search...");
		JSONObject results = executeSearch(query, maxresults, startdate, enddate, apiHandlers);
		System.out.println("Writing results to file...");
		writeJsonFile(results);
		System.out.println("Done!");
	
	}

	public static List<IApiHandler> initializeApiHandlers(Credentials cred, boolean twitterCheck, boolean youtubeCheck, boolean redditCheck) {
		List<IApiHandler> handlers = new ArrayList<>();
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
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userInput.strip();
	}
	private static String maxQuery() {
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		String max= null;
		System.out.println("Enter maxresults: ");
		try {
			max = reader.readLine();
			while (max.isBlank()) {
				System.out.println("Please enter valid input.");
				max = reader.readLine();
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return max.strip();
	}
	
	private static String startdateQuery() {
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String stdate= null;
		System.out.println("Enter startdate: ");
		try {
			stdate = reader.readLine();
			while ( stdate.isBlank()) {
				System.out.println("Please enter valid input.");
				
				stdate = reader.readLine();
				
			}
		
		} catch (IOException e) {
			e.printStackTrace();
		}
		return stdate.strip();
	}
	
	
	private static String enddateQuery() {
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		
		String edate= null;
		System.out.println("Enter enddate: ");
		try {
			edate = reader.readLine();
			while (edate.isBlank()) {
				System.out.println("Please enter valid input.");
				edate = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return edate.strip();
	}
	


	public static JSONObject executeSearch(String queryText,String maxresults, String startdate, String enddate ,List<IApiHandler> apis) {
		JSONObject aggregateResults = new JSONObject();
		try {
			JSONArray aggregatePosts = new JSONArray();
			// get posts
			for (IApiHandler handler : apis) {
				int counter = 0;
				JSONArray posts = null;
				while (posts == null && counter < MAX_REQUEST_RETRIES) {
					handler.requestToken();
					if (handler.hasValidToken()) posts = handler.makeQuery(queryText, maxresults, startdate,  enddate).getJSONArray("posts");
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
