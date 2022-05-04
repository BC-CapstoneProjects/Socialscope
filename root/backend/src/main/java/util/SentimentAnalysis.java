package util;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONObject;
import util.AppCredentials;
import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
public class SentimentAnalysis {
	 private List<IRateLimiter> limiters = new LinkedList<>();

	private Sentiment sentiment =null;
	private AppCredentials credentials;
	
	public  SentimentAnalysis(AppCredentials credentials) {
	 IRateLimiter minuteLimiter = null;
	 IRateLimiter dayLimiter = null;
	 try {
		minuteLimiter = new RedisRateLimiter(600, 60000); 
		dayLimiter = new RedisRateLimiter(800000, 86400000);
	 }
	 catch (RuntimeException ex) {
		System.out.println("Local sentiment limiter fallback triggered...");
		minuteLimiter = new LocalRateLimiter(600, 60000); 
		dayLimiter = new LocalRateLimiter(800000, 86400000);
	 }
	 limiters.add(minuteLimiter);
	 limiters.add(dayLimiter);
	 this.credentials = credentials;
	}
	
	  private boolean hasRequestBudget(int amount) {
	        boolean hasBudget = true;
	        for (IRateLimiter limiter : this.limiters) {
	            if (!limiter.hasBudget(amount))
	                hasBudget = false;
	        }
	        return hasBudget;
	    }
	  
	  public boolean allocateBudget(int amount) {
		  // spend necessary budget to process a batch; return true if possible and successful
		  if (this.hasRequestBudget(amount)) {
			  this.limiters.forEach((limiter) -> limiter.spendBudget(amount));
			  return true;
		  }
		  return false;
	  }
	
	  private void requestBudget(String numberOfResults, String text) {
	        boolean requestPassed = false;
	        if(numberOfResults.equals(""))
	        {
	            numberOfResults = "15";
	        }
	        int temp = 1 + Integer.parseInt(numberOfResults);
	        // request a token if sufficient budget and token needed
	        if (hasRequestBudget(temp)) {
	            requestPassed = true;
	            try {
					analyzeSentimentText(text);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            this.limiters.forEach((limiter) -> {limiter.spendBudget(temp);});
	        }
	        if (requestPassed)
	            System.out.println("The Sentiment request passed");
	        else
	            System.out.println("The Sentiment reques failed");
	    
	    }
	  
	  
	/** Identifies the sentiment in the string {@code text}. */
    public  Sentiment analyzeSentimentText(String text) throws Exception {
      try (LanguageServiceClient language = LanguageServiceClient.create(credentials.getGoogleLanguageServiceSettings())) {
        Document doc = Document.newBuilder().setContent(text).setType(Type.PLAIN_TEXT).build();
        AnalyzeSentimentResponse response = language.analyzeSentiment(doc);
        Sentiment sentiment = response.getDocumentSentiment();
        if (sentiment == null) {
          System.out.println("No sentiment found");
        } 
        return sentiment;
      }
     
    }
    
    public JSONObject sentiment( JSONObject obj, String text, String title) {
    	
    try {
    
    if(!text.equals("")) {
        sentiment= analyzeSentimentText(text);
        if(sentiment.getScore()<=-0.1) {
        	 obj.put("sentiment_score",  "Negative");  	
        }else if(sentiment.getScore()>-0.1&& sentiment.getScore()<0.1) {
        	 obj.put("sentiment_score",  "Neutral");
        }else { obj.put("sentiment_score",  "Positive");}
        obj.put("sentiment_confidence", sentiment.getMagnitude());
        }else {
        	sentiment= analyzeSentimentText(title);
        	  if(sentiment.getScore()<=-0.1) {
             	 obj.put("sentiment_score",  "Negative");  	
             }else if(sentiment.getScore()>-0.1 && sentiment.getScore()<0.1) {
             	 obj.put("sentiment_score",  "Neutral");
             }else { obj.put("sentiment_score",  "Positive");}
             obj.put("sentiment_confidence", sentiment.getMagnitude());
          
        }
    }
    catch (Exception e) {
    	e.printStackTrace();
    	obj.put("sentiment_score",  "Neutral");
    	obj.put("sentiment_confidence", 0);
    }
    return obj;
	
     }
    

}
