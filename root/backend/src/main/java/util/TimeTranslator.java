package util;

import java.time.Instant;

public class TimeTranslator {
	
	public static long getEpochTime(String time) {
		Instant timestamp;
		timestamp = Instant.parse(time);
		return(timestamp.getEpochSecond());
	}

}
