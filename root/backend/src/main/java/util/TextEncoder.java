package util;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class TextEncoder {
	
	public static String ensureUTF8(String in) {
		byte bytes[] = in.getBytes(StandardCharsets.UTF_8);
		return new String(bytes, StandardCharsets.UTF_8);
	}
	
	public static String base64encodeUTF8(String in) {
		return Base64.getEncoder().encodeToString(in.getBytes(StandardCharsets.UTF_8));
	}
	
	public static String base64decodeUTF8(String in) {
		byte[] bytes = Base64.getDecoder().decode(in);
		return new String(bytes);
	}

}
