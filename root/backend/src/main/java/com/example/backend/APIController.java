package com.example.backend;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class APIController {
	
	@Autowired
	private APIHandlerManager manager;
	
    @CrossOrigin
    @GetMapping("/api/")
    public Map<String, Object> api(@RequestParam String keyword, @RequestParam boolean doPlatformTwitter, @RequestParam boolean doPlatformReddit, @RequestParam boolean doPlatformYoutube, @RequestParam boolean doSentimentAnalysis, @RequestParam String maxResults, @RequestParam String start, @RequestParam String end) {
    	System.out.println("Executing search...");
        List<String> namesOfHandlersInQuery = buildHandlerNames(doPlatformTwitter, doPlatformReddit, doPlatformYoutube);
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("queryText", keyword);
        queryParams.put("doSentimentAnalysis", Boolean.toString(doSentimentAnalysis));
        queryParams.put("maxResults", maxResults);
        queryParams.put("start", start);
        queryParams.put("end", end);
        JSONObject results = manager.executeSearch(namesOfHandlersInQuery, queryParams);
        System.out.println(results.toString());
        return results.toMap();
    }
    
    public static List<String> buildHandlerNames(boolean twitterIncluded, boolean redditIncluded, boolean youtubeIncluded) {
    	List<String> handlerNames = new ArrayList<>();
    	if (twitterIncluded)
    		handlerNames.add("twitter");
    	if (redditIncluded)
    		handlerNames.add("reddit");
    	if (youtubeIncluded)
    		handlerNames.add("youtube");
    	return handlerNames;
    }
}
