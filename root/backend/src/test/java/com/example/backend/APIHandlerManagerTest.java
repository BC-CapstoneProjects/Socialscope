package com.example.backend;

import handlers.IApiHandler;
import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import util.AppCredentials;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class APIHandlerManagerTest extends APIHandlerManager {

    Map<String, IApiHandler> handlers;

    void APIHandlerManager() {
        AppCredentials cred = new AppCredentials();
        this.handlers = initializeApiHandlers(cred);
        System.out.println("Handlers initialized");
    }

    @Test
    void testInitialize() {
        APIHandlerManager();
        assert (this.handlers.size() == 3);
    }

    @Test
    void testInitialize1() {
        Assertions.assertThrows(AssertionError.class, () -> {
            APIHandlerManager();
            assert (this.handlers.size() == 2);
        });
    }

    @Test
    void testExecuteReddit() {
        APIHandlerManager();
        List<String> namesOfHandlersInQuery = new ArrayList<>();
        namesOfHandlersInQuery.add("reddit");
        JSONObject actual = executeSearch(namesOfHandlersInQuery, "facebook", "10", "", "");
        JSONObject meta = actual.getJSONObject("meta");
        String text = meta.getString("query");
        JSONArray posts = actual.getJSONArray("posts");
        assert (posts.length() == 10);
        assert (text.equals("facebook"));
    }

    @Test
    void testReddit() {
        AppCredentials cred = new AppCredentials();
        this.handlers = initializeApiHandlers(cred);
        List<String> namesOfHandlersInQuery = new ArrayList<>();
        namesOfHandlersInQuery.add("reddit");
        JSONObject actual = executeSearch(namesOfHandlersInQuery, "facebook", "10", "", "");
        JSONObject meta = actual.getJSONObject("meta");
        String text = meta.getString("query");
        JSONArray posts = actual.getJSONArray("posts");
        System.out.println(this.handlers.get("reddit").getLimiters().get(0).getBudgetRemaining());
        assert (posts.length() == 10);
        assert (text.equals("facebook"));
    }

    @Test
    void testReddit1() {
        AppCredentials cred = new AppCredentials();
        this.handlers = initializeApiHandlers(cred);
        List<String> namesOfHandlersInQuery = new ArrayList<>();
        namesOfHandlersInQuery.add("reddit");
        JSONObject actual = executeSearch(namesOfHandlersInQuery, "facebook", "10", "", "");
        JSONObject meta = actual.getJSONObject("meta");
        String text = meta.getString("query");
        JSONArray posts = actual.getJSONArray("posts");
        System.out.println(this.handlers.get("reddit").getLimiters().get(0).getBudgetRemaining());
        assert (posts.length() == 10);
        assert (text.equals("facebook"));
    }

    @Test
    void testExecuteTwitter() {
        APIHandlerManager();
        List<String> namesOfHandlersInQuery = new ArrayList<>();
        namesOfHandlersInQuery.add("twitter");
        JSONObject actual = executeSearch(namesOfHandlersInQuery, "apple", "10", "", "");
        JSONObject meta = actual.getJSONObject("meta");
        String text = meta.getString("query");
        JSONArray posts = actual.getJSONArray("posts");
        assert (posts.length() > Integer.parseInt("10") / 2);
        assert (text.equals("apple"));
    }

/*
    @Test
    void testExecuteYoutube()  //YouTube API crashing for some reasons
    {
        APIHandlerManager();
        List<String> namesOfHandlersInQuery = new ArrayList<>();
        namesOfHandlersInQuery.add("youtube");
        JSONObject actual = executeSearch(namesOfHandlersInQuery, "egg", "10", "", "");
        JSONObject meta = actual.getJSONObject("meta");
        String text = meta.getString("query");
    }

*/
 
}
