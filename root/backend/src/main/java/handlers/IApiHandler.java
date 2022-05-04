package handlers;

import org.json.JSONObject;

import util.limiter.IRateLimiter;

import java.util.List;

public interface IApiHandler {
    public void requestToken();
    public boolean hasValidToken();
    public JSONObject makeQuery(String q, String maxValue, String start, String end);
    public List<IRateLimiter> getLimiters();
	
}

