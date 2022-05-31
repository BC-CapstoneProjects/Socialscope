package com.example.backend;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
    @RequestMapping(value="/api/search", method=RequestMethod.POST)
    public Map<String, Object> api(@RequestBody Map<String, Object> requestBody) {
    	System.out.println("Executing search...");
//    	for(String s : requestBody.keySet()) {
//    		System.out.println(s + "  " + requestBody.get(s).toString());
//    	}
        List<String> namesOfHandlersInQuery = buildHandlerNames(
        		(Boolean)requestBody.get("doPlatformTwitter"), 
        		(Boolean)requestBody.get("doPlatformReddit"), 
        		(Boolean)requestBody.get("doPlatformYoutube")
        	);
        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("queryText", requestBody.get("keyword").toString());
        queryParams.put("doSentimentAnalysis", requestBody.get("doSentimentAnalysis").toString());
        queryParams.put("maxResults", requestBody.get("maxResults").toString());
        queryParams.put("start", requestBody.get("startDate").toString());
        queryParams.put("end", requestBody.get("endDate").toString());
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
