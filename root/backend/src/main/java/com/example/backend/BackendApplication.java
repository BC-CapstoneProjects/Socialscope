package com.example.backend;

import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import util.AppCredentials;

import java.io.*;

@SpringBootApplication
public class BackendApplication {

	public static void main(String args[]) {
		SpringApplication.run(BackendApplication.class, args);
	}

	private static String getUserQuery() {
		BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
		String userInput = null;
		System.out.println("Enter a query: ");
		try {
			userInput = reader.readLine();
			while (userInput.isBlank()) {
				System.out.println("Please enter valid input.");
				userInput = reader.readLine();
			}
			reader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return userInput.strip();
	}


	private static void writeJsonFile(JSONObject json) {
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter("aggregateResults.json"));
			writer.write(json.toString());
			writer.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
