package util;

import java.io.IOException;

import org.json.JSONObject;
import util.Credentials;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.LanguageServiceSettings;
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.google.cloud.language.v1.Document.Type;

public class SentimentAnalysis {
	private Sentiment sentiment =null;
	Credentials credentials= new Credentials();
	
	
	/** Identifies the sentiment in the string {@code text}. */
    public  Sentiment analyzeSentimentText(String text) throws Exception {
      try (LanguageServiceClient language = LanguageServiceClient.create(credentials.readGoogleCredentials())) {
        Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
        AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
        Sentiment sentiment = response.getDocumentSentiment();
        if (sentiment == null) {
          System.out.println("No sentiment found");
        } 
        return sentiment;
      }
     
    }
    
    public void sentiment( JSONObject obj, String text, String title) throws Exception {
    	
    
    
    if(text !="") {
        sentiment= analyzeSentimentText(text);
        if(sentiment.getScore()<=-0.1) {
        	 obj.put("sentiment_score",  "Negative");  	
        }else if(sentiment.getScore()>-0.1&& sentiment.getScore()<0.1) {
        	 obj.put("sentiment_score",  "Neutral");
        }else { obj.put("sentiment_score",  "Positive");}
        System.out.println(sentiment.getScore());
        System.out.println(sentiment.getMagnitude());
        obj.put("sentiment_confidence", sentiment.getMagnitude());
        }else {
        	sentiment= analyzeSentimentText(title);
        	  if(sentiment.getScore()<=-0.1) {
             	 obj.put("sentiment_score",  "Negative");  	
             }else if(sentiment.getScore()>-0.1 && sentiment.getScore()<0.1) {
             	 obj.put("sentiment_score",  "Neutral");
             }else { obj.put("sentiment_score",  "Positive");}
        	  System.out.println(sentiment.getScore());
        	  System.out.println(sentiment.getMagnitude());
             obj.put("sentiment_confidence", sentiment.getMagnitude());
          
        }
	
     }
    

}
