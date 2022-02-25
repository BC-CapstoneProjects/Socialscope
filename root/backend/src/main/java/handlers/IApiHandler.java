package handlers;

import org.json.JSONObject;

public interface IApiHandler {

    public void requestToken(String numberOfResults);
    public boolean hasValidToken();
    public JSONObject makeQuery(String q, String maxValue, String start, String end);

}
