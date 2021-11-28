package main.java.util;

public class Credentials {
	
	// reddit credentials
	
	private static final String REDDIT_APP_ID = "AV79bHKhGrsMuZgmoL2chw";
	private static final String REDDIT_APP_SECRET = "3eYG48zgNaVKoTWJcf3KTfVBin1GNQ";  // PRIVATE: must not be shared
	private static final String REDDIT_USER_AGENT = "SocialScope/0.1 by u/SocialScopeBot";

	private static final String TWITTER_APP_ID = "eIRfrSsJ0OFDmxH1NVkqXb8oV";
	private static final String TWITTER_APP_SECRET = "T3HMN5Xxz3sAM1d3iyVgaARdmfsPnZVq6f4SVGG5ixunlG0AFo";  // PRIVATE: must not be shared
	private static final String TWITTER_USER_AGENT = "TwitterBot/1.0";

	public static String getRedditAppId() {
		return REDDIT_APP_ID;
	}
	
	public static String getRedditAppSecret() {
		return REDDIT_APP_SECRET;
	}
	
	public static String getRedditAppUserAgent() {
		return REDDIT_USER_AGENT;
	}
	
	// twitter credentials
	// TODO: put any credential constants here for privacy

	public static String getTwitterAppId() {
		return TWITTER_APP_ID;
	}

	public static String getTwitterAppSecret() {
		return TWITTER_APP_SECRET;
	}

	public static String getTwitterAppUserAgent() {
		return TWITTER_USER_AGENT;
	}

	// youtube credentials
	// TODO: put any credential constants here for privacy
}
