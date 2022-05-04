package util;


import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.language.v1.LanguageServiceSettings;
import org.json.JSONException;
import org.json.JSONObject;

public class Credentials {

	private static final String DEFAULT_CREDENTIALS_FILE = "private/credentials.json";
    private static final String DEFAULT_CREDENTIALS_GOOGLEFILE ="private/socialsentanalysis.json";

    private String redditAppId;
    private String redditAppSecret;  // private
    private String redditUserAgent;

    private String twitterAppId;
    private String twitterAppSecret;  // private
    private String twitterUserAgent;
    private String youtubeUserAgent;
    private String youtubeApiKey;  // private
    
    private LanguageServiceSettings googleLanguageServiceSettings;

    public Credentials() {
        readCredentialsFromFile();
        readGoogleCredentials(DEFAULT_CREDENTIALS_GOOGLEFILE);
    }

    public void readGoogleCredentials(String fp) {
    	try {
            System.out.println("working-directory");;
            System.out.println(System.getProperty("user.dir"));
    		InputStream in = getClass().getResourceAsStream("/" + fp); // in jar
    		if (in == null)
    			in = new FileInputStream("src/main/resources/" + fp); // not in jar
            if(in == null)
            {
                in = new FileInputStream("/home/runner/work/tests/tests/root/backend/secret/apple/socialsentanalysis.json");
            }
    		this.googleLanguageServiceSettings =
    			LanguageServiceSettings.newBuilder()
                	.setCredentialsProvider(FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(in)))
                	.build();
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    }
    private void readCredentialsFromFile() {
        this.redditAppId = System.getenv("redditAppId");
        this.redditAppSecret = System.getenv("redditAppSecret");
        this.redditUserAgent = System.getenv("redditUserAgent");
        this.twitterAppId = System.getenv("twitterAppId");
        this.twitterAppSecret = System.getenv("twitterAppSecret");
        this.twitterUserAgent = System.getenv("twitterUserAgent");
        this.youtubeUserAgent = System.getenv("youtubeUserAgent");
        this.youtubeApiKey = System.getenv("youtubeApiKey");
    }

    @SuppressWarnings("unused")
    private void writeCredentialsToFile(String fp) {
        // debugging method to write initial data
        JSONObject jo = new JSONObject();
        try {
            jo.put("redditAppId", redditAppId);
            jo.put("redditAppSecret", redditAppSecret);
            jo.put("redditUserAgent", redditUserAgent);
            jo.put("twitterAppId", twitterAppId);
            jo.put("twitterAppSecret", twitterAppSecret);
            jo.put("twitterUserAgent", twitterUserAgent);
        } catch (JSONException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        try {
            BufferedWriter writer = new BufferedWriter(new FileWriter(fp));
            writer.write(jo.toString());
            writer.close();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    // reddit credentials
    public String getRedditAppId() {
        return redditAppId;
    }

    public String getRedditAppSecret() {
        return redditAppSecret;
    }

    public String getRedditAppUserAgent() {
        return redditUserAgent;
    }

    // twitter credentials
    public String getTwitterAppId() {
        return twitterAppId;
    }

    public String getTwitterAppSecret() {
        return twitterAppSecret;
    }

    public String getTwitterAppUserAgent() {
        return twitterAppSecret;
    }

    // youtube credentials
    public String getYoutubeAppUserAgent() {
        return youtubeUserAgent;
    }
    public String getYoutubeApiKey() {
        return youtubeApiKey ;
    }
    
    // google credentials
    public LanguageServiceSettings getGoogleLanguageServiceSettings() {
    	return googleLanguageServiceSettings;
    }
}


