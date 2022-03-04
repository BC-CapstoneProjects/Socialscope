package util;
import java.util.LinkedList;
import java.util.List;
import util.RateLimiter;
import org.json.JSONObject;
import util.Credentials;
import com.google.cloud.language.v1.AnalyzeSentimentResponse;
//Imports the Google Cloud client library
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.Document.Type;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
public class SentimentAnalysis {
	 private List<RateLimiter> limiters_per_min = new LinkedList<>();
	 private List<RateLimiter> limiters_per_day = new LinkedList<>();

	private Sentiment sentiment =null;
	private Credentials credentials;
	
	public  SentimentAnalysis(Credentials credentials) {
	 this.limiters_per_min.add(new RateLimiter(600, 60000));
	 this.limiters_per_day.add(new RateLimiter(800000, 86400000));
	 this.credentials = credentials;
	}
	
	
	  private boolean hasRequestBudget_per_min(int amount) {
	        boolean hasBudget = true;
	        for (RateLimiter limiter : this.limiters_per_min) {
	            if (!limiter.hasBudget(amount))
	                hasBudget = false;
	        }
	        return hasBudget;
	    }
	  private boolean hasRequestBudget_per_day(int amount) {
	        boolean hasBudget = true;
	        for (RateLimiter limiter : this.limiters_per_day) {
	            if (!limiter.hasBudget(amount))
	                hasBudget = false;
	        }
	        return hasBudget;
	    }
	
	  public void requestBudget_per_min(String numberOfResults, String text) {
	        boolean requestPassed = false;
	        if(numberOfResults.equals(""))
	        {
	            numberOfResults = "15";
	        }
	        int temp = 1 + Integer.parseInt(numberOfResults);
	        // request a token if sufficient budget and token needed
	        if (hasRequestBudget_per_min(temp)) {
	            requestPassed = true;
	            try {
					analyzeSentimentText(text);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            this.limiters_per_min.forEach((limiter) -> {limiter.spendBudget(temp);});
	        }
	        if (requestPassed)
	            System.out.println("The Sentiment request passed");
	        else
	            System.out.println("The Sentiment reques failed");
	    
	    }
	  
	    public void requestBudget_per_day(String numberOfResults, String text) {
	        boolean requestPassed = false;
	        if(numberOfResults.equals(""))
	        {
	            numberOfResults = "1000";
	        }
	        int temp = 1 + Integer.parseInt(numberOfResults);
	        // request a token if sufficient budget and token needed
	        if (hasRequestBudget_per_day(temp)) {
	            requestPassed = true;
	            try {
					analyzeSentimentText(text);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
	            this.limiters_per_day.forEach((limiter) -> {limiter.spendBudget(temp);});
	        }
	        if (requestPassed)
	            System.out.println("The Sentiment reques passed");
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
    
    public void sentiment( JSONObject obj, String text, String title) {
    	
    try {
    
    if(text !="") {
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
	
     }
    

}
