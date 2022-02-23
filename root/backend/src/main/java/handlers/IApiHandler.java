package handlers;

import org.json.JSONObject;

public interface IApiHandler {

    public void requestToken();
    public boolean hasValidToken();

    public JSONObject makeQuery(String q, String maxValue, String start, String end) throws Exception;

    public JSONObject makeQuery(String q, String maxValue, String start, String end);


}

