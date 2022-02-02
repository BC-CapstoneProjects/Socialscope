package com.example.capstone;

import handlers.IApiHandler;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import util.Credentials;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import static com.example.capstone.CapstoneApplication.executeSearch;
import static com.example.capstone.CapstoneApplication.initializeApiHandlers;

@RestController
public class APIController {
    @CrossOrigin
    @GetMapping("/")
    public Map<String, Object> index(@RequestParam String keyword, @RequestParam String maxresults, String startdate, String enddate,@RequestParam boolean twitterChoose, @RequestParam boolean redditChoose, @RequestParam boolean youtubeChoose, @RequestParam String maxChoose, @RequestParam String pickerChoose) {
        Credentials cred = new Credentials();
        List<IApiHandler> inputAPI = initializeApiHandlers(cred, twitterChoose, youtubeChoose, redditChoose);
        System.out.println("Executing search...");
        JSONObject results = executeSearch(keyword, maxresults,  startdate,  enddate, inputAPI);
        return results.toMap();
    }
  
        
  
}
