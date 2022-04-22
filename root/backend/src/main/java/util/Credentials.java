package util;

import java.io.*;
import java.nio.charset.StandardCharsets;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.language.v1.LanguageServiceSettings;
import org.json.JSONException;
import org.json.JSONObject;

public class Credentials {

//	private static final String DEFAULT_CREDENTIALS_FILE = "private/credentials.json";
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

//    public Credentials() {
//        readCredentialsFromFile(DEFAULT_CREDENTIALS_FILE);
//        readGoogleCredentials(DEFAULT_CREDENTIALS_GOOGLEFILE);
//    }

    public Credentials() {
        readCredentialsFromFile();
        readGoogleCredentials(DEFAULT_CREDENTIALS_GOOGLEFILE);
    }
    
    public void readGoogleCredentials(String fp) {
    	try {
    		InputStream in = getClass().getResourceAsStream("/" + fp); // in jar
    		if (in == null)
    			in = new FileInputStream("src/main/resources/" + fp); // not in jar
            if(in == null)
            {
                in = getClass().getResourceAsStream("secret/socialsentanalysis.json"); // in jar
            }
    		this.googleLanguageServiceSettings =
    			LanguageServiceSettings.newBuilder()
                	.setCredentialsProvider(FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(in)))
                	.build();
    	} catch (IOException e) {
    		e.printStackTrace();
    	}
    }
//
//    private void readCredentialsFromFile(String fp) {
//        BufferedReader reader;
//        try {
//        	String currPath = new java.io.File(".").getCanonicalPath();
//        	System.out.println(currPath);
//        	InputStream in = getClass().getResourceAsStream("/" + fp);
//        	if (in != null)
//        		reader = new BufferedReader(new InputStreamReader(in)); // read file from inside jar
//        	else
//        		reader = new BufferedReader(new FileReader("src/main/resources/" + fp)); // read while not in jar
////                reader = new BufferedReader(new FileReader(fp));
//            StringBuilder sb = new StringBuilder();
//            reader.lines().forEach((String line) -> sb.append(line));
//            reader.close();
//            JSONObject jo = new JSONObject(sb.toString());
//            this.redditAppId = jo.getString("redditAppId");
//            this.redditAppSecret = jo.getString("redditAppSecret");
//            this.redditUserAgent = jo.getString("redditUserAgent");
//            this.twitterAppId = jo.getString("twitterAppId");
//            this.twitterAppSecret = jo.getString("twitterAppSecret");
//            this.twitterUserAgent = jo.getString("twitterUserAgent");
//            this.youtubeUserAgent = jo.getString("youtubeUserAgent");
//            this.youtubeApiKey = jo.getString("youtubeApiKey");
//        } catch (FileNotFoundException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } catch (IOException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        } catch (JSONException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }
//    }
//    public void readGoogleCredentials() {
//        try {
//            JSONObject google = new JSONObject();
//            google.put("type", System.getenv("type"));
//            google.put("project_id", System.getenv("project_id"));
//            google.put("private_key_id", System.getenv("private_key_id"));
//            google.put("private_key", System.getenv("private_key"));
//            google.put("client_email", System.getenv("client_email"));
//            google.put("client_id", System.getenv("client_id"));
//            google.put("auth_uri", System.getenv("auth_uri"));
//            google.put("token_uri", System.getenv("token_uri"));
//            google.put("auth_provider_x509_cert_url", System.getenv("auth_provider_x509_cert_url"));
//            google.put("client_x509_cert_url", System.getenv("client_x509_cert_url"));
//
//            String googleCredential = google.toString();
//            System.out.println(googleCredential);
//            InputStream in = new ByteArrayInputStream(googleCredential.getBytes(StandardCharsets.UTF_8));
//            System.out.println(in);
//            this.googleLanguageServiceSettings =
//                    LanguageServiceSettings.newBuilder()
//                            .setCredentialsProvider(FixedCredentialsProvider.create(ServiceAccountCredentials.fromStream(in)))
//                            .build();
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//    }

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


