import static org.junit.jupiter.api.Assertions.fail;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;
import java.util.function.Consumer;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.testcontainers.Testcontainers;
import org.testcontainers.containers.BindMode;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.containers.output.OutputFrame;
import org.testcontainers.utility.DockerImageName;

import com.example.backend.BackendApplication;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT, classes = BackendApplication.class)
public class CypressTest {

	@LocalServerPort
	private int port;
	
	private static String cypressVersion;
	private static int maxTestDurationMinutes;
	
	@BeforeAll
	private static void beforeAll() throws Exception {
		cypressVersion = "9.6.1";
		maxTestDurationMinutes = 1;
	}
	
	@Test
	void runCypressTests() throws InterruptedException, TimeoutException {
		Testcontainers.exposeHostPorts(port);
		CountDownLatch countdown = new CountDownLatch(1);
		try (GenericContainer<?> container = createCypressContainer()){
			container.start();
			TestResults results = new TestResults();
			container.followOutput( new Consumer<OutputFrame>() {
				
				private static final int testScoreLineIndex = 3;  // the location of the count of tests passed/failed in a whitespace split cypress line
				
				public void accept(OutputFrame outputFrame) {
					String logLine = outputFrame.getUtf8String();
					System.out.println(logLine); // TODO: debug
					if(logLine.contains("Run Finished")) {
						countdown.countDown();
					}
					else if (logLine.contains("Passing:")) {
						String[] lineArr = logLine.split("\\s+");
						int i = Integer.parseInt(lineArr[testScoreLineIndex]);
						results.setPasses(i);
					}
					else if (logLine.contains("Failing:")) {
						String[] lineArr = logLine.split("\\s+");
						results.setFails(Integer.parseInt(lineArr[testScoreLineIndex]));
					}
				}
				
			});
			boolean testFinished = countdown.await(maxTestDurationMinutes, TimeUnit.MINUTES);
			if (testFinished) {
				if (results.getFails() == 0) {
					System.out.println(String.format("Cypress testing complete with %d tests passing.", results.getPasses()));
				}
				else {
					System.out.println(String.format("Cypress testing complete with %d failures", results.getFails()));
					fail("Cypress test failures");
				}
				
			}
			else {
				System.out.println("Cypress tests timed out.");
				throw new TimeoutException("Cypress tests timed out.");
			}
		}
		catch(NumberFormatException ex) {
			System.out.println(ex.getMessage());
		}
		catch (IndexOutOfBoundsException ex) {
			System.out.println(ex.getMessage());
		}
	}
	
	private GenericContainer<?> createCypressContainer() {
		GenericContainer<?> container = new GenericContainer<>(DockerImageName.parse("cypress/included:" + cypressVersion));
		container.withClasspathResourceMapping("e2e", "/e2e", BindMode.READ_WRITE);
		container.setWorkingDirectory("/e2e");
		container.addEnv("CYPRESS_baseUrl", "http://" + GenericContainer.INTERNAL_HOST_HOSTNAME + ":" + port);
		return container;
	}
	
	private class TestResults {
		private int passes;
		private int fails;
		
		public TestResults() {
			passes = 0;
			fails = 0;
		}
		
		public void setPasses(int n) {
			System.out.println("in results");
			passes = n;
		}
		
		public int getPasses() {
			return passes;
		}
		
		public void setFails(int n) {
			fails = n;
		}
		
		public int getFails() {
			return fails;
		}
	}
	
	
}
