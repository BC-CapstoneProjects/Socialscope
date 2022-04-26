package util;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
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
    
//    private void readCredentialsFromFile(String fp) {
//        BufferedReader reader;
//        try {
//        	String currPath = new java.io.File(".").getCanonicalPath();
//        	System.out.println(currPath);
//        	InputStream in = getClass().getResourceAsStream("/" + fp);
////        	if (in != null)
////        		reader = new BufferedReader(new InputStreamReader(in)); // read file from inside jar
////        	else
////            {
////                reader = new BufferedReader(new FileReader("src/main/resources/" + fp));
////            }
////                reader = new BufferedReader(new FileReader(fp));
//            if (in == null)
//            {
//                in = new FileInputStream("src/main/resources/" + fp);
//            }
//            if(in == null)
//            {
//                in = new FileInputStream("/home/runner/work/tests/tests/root/backend/secret/apple/credentials.json");
//            }
//            reader = new BufferedReader(new InputStreamReader(in));
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

    private void readCredentialsFromFile() {
        System.out.println(System.getenv("NAME"));
        this.redditAppId = "AV79bHKhGrsMuZgmoL2chw";
        this.redditAppSecret = "3eYG48zgNaVKoTWJcf3KTfVBin1GNQ";
        this.redditUserAgent = "SocialScope/0.1 by u/SocialScopeBot";
        this.twitterAppId = "eIRfrSsJ0OFDmxH1NVkqXb8oV";
        this.twitterAppSecret = "T3HMN5Xxz3sAM1d3iyVgaARdmfsPnZVq6f4SVGG5ixunlG0AFo";
        this.twitterUserAgent = "TwitterBot/1.0";
        this.youtubeUserAgent = "SocialScope/0.1";
        this.youtubeApiKey = "AIzaSyC4oyxeg5BaxWs2LU3hsvDngZQwX6gSj0s";
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


