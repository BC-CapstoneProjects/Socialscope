package util.limiter;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import io.lettuce.core.RedisClient;
import io.lettuce.core.RedisConnectionException;
import io.lettuce.core.RedisException;
import io.lettuce.core.RedisFuture;
import io.lettuce.core.SetArgs;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.async.RedisAsyncCommands;
import io.lettuce.core.api.async.RedisStringAsyncCommands;

public class RedisRateLimiter implements IRateLimiter{
	
	private static final String CONNECTION_URI = "redis://socialscope-redis-cluster.kj3oee.0001.use1.cache.amazonaws.com:6379";
	private static final String TEST_URI = "redis://localhost";
	
	private String id;
	private int budget;
	private long duration;
	
	private static RedisClient client = setupClient();
	
	public RedisRateLimiter(int budget, long duration) {
		this(UUID.randomUUID().toString(), budget, duration);
	}
	
	public RedisRateLimiter(String id, int budget, long duration) {
		if (client == null) throw new RedisException("Could not instantiate redis client");
		this.id = id;
		this.budget = budget;
		this.duration = duration;
	}
	
	private static RedisClient setupClient() {
		System.out.println("setting up new redis client");
		RedisClient client = null;
		StatefulRedisConnection<String, String> conn = null;
		try {
			client = RedisClient.create(CONNECTION_URI);
			conn = client.connect();
		}
		catch (RedisConnectionException ex) {
			client = null;
		}
		if (client == null) {
			try {
				client = RedisClient.create(TEST_URI);
				conn = client.connect();
			}
			catch (RedisConnectionException ex) {
				client = null;
			}
		}
		if (client == null) {
			System.out.println("Could not instantiate redis client");
			return client;
		}
		System.out.println("testing redis connection");
		try {
			RedisAsyncCommands<String, String> async = conn.async();
			RedisFuture<String> ping = async.ping();
			ping.await(5, TimeUnit.SECONDS);
			System.out.println("Redis instantiation successful");
			conn.close();
		}
		catch (InterruptedException ex) {
			System.out.println("Redis instantiation thread interrupt");
			client = null;
		}
		catch (Exception ex) {
			client = null;
		}
		if (conn != null && conn.isOpen()) {
			conn.close();
		}
		return client;
	}
	
	@Override
	public int getBudgetRemaining() {
		return this.budget - this.getCachedSpendings();
	}

	@Override
	public boolean hasBudget(int amount) {
		return this.getBudgetRemaining() >= amount || this.isCurrentPeriodOver();
	}

	@Override
	public void spendBudget(int amount) {
		this.setCachedSpendings(this.getCachedSpendings() + amount, this.getNextExpireTime());
		
	}

	@Override
	public boolean isCurrentPeriodOver() {
		return this.getCachedSpendings() == 0;
	}

	@Override
	public void resetPeriodIfElapsed() {
		if(!this.isCurrentPeriodOver()) return;
		StatefulRedisConnection<String, String> conn = null;
		try {
			conn = client.connect();
			RedisAsyncCommands<String, String> async = conn.async();
			RedisFuture<Boolean> expFuture = async.expire(this.getRedisLimiterKey(), 0);
			boolean expSuccess = expFuture.get();
			if (!expSuccess) throw new RuntimeException("Unable to expire redis key for RedisRateLimiter id" + this.id);
		}
		catch (InterruptedException | ExecutionException ex) {
			System.out.println("Redis expire thread interruption");
		}
		catch (RedisException ex) {
			System.out.println("Redis expire exception");
		}
	}
	
	private String getRedisLimiterKey() {
		return this.id + ".limit";
	}
	
	private int getCachedSpendings() {
		StatefulRedisConnection<String, String> conn = null;
		int getReturn = 0;
		try {
			conn = client.connect();
			RedisAsyncCommands<String, String> async = conn.async();
			RedisFuture<String> getFuture = async.get(this.getRedisLimiterKey());
			String getString = getFuture.get();
			if (getString != null) {
				getReturn = Integer.parseInt(getString);
			}
		}
		catch (InterruptedException | ExecutionException ex) {
			System.out.println("Redis get thread interruption");
			System.out.println(ex.getMessage());
		}
		catch (RedisException ex) {
			System.out.println("Redis get exception");
			System.out.println(ex.getMessage());
		}
		catch (NumberFormatException ex) {
			System.out.println("Redis get has non-numerical return");
		}
		finally {
			if (conn != null) conn.close();
		}
		return getReturn;
	}
	
	private long getNextExpireTime() {
		StatefulRedisConnection<String, String> conn = null;
		long cacheExpire = this.duration;
		try {
			conn = client.connect();
			RedisAsyncCommands<String, String> async = conn.async();
			RedisFuture<Long> expFuture = async.pttl(this.getRedisLimiterKey());
			cacheExpire = expFuture.get();
			if (cacheExpire <= 0) cacheExpire = this.duration;
		}
		catch (InterruptedException | ExecutionException ex) {
			System.out.println("Redis exp thread interruption");
			System.out.println(ex.getMessage());
		}
		catch (RedisException ex) {
			System.out.println("Redis exp exception");
			System.out.println(ex.getMessage());
		}
		return cacheExpire;
	}
	
	private boolean setCachedSpendings(int value, long expire) {
		StatefulRedisConnection<String, String> conn = null;
		boolean setStatus = false;
		try {
			conn = client.connect();
			RedisAsyncCommands<String, String> async = conn.async();
			SetArgs setArgs = new SetArgs();
			setArgs.px(expire);
			RedisFuture<String> setFuture = async.set(this.getRedisLimiterKey(), Integer.toString(value), setArgs);
			String setReturn = setFuture.get();
			setStatus = setReturn.equals("OK");
		}
		catch (InterruptedException | ExecutionException ex) {
			System.out.println("Redis set thread interruption");
			System.out.println(ex.getMessage());
		}
		catch (RedisException ex) {
			System.out.println("Redis set exception");
			System.out.println(ex.getMessage());
		}
		finally {
			if (conn != null) conn.close();
		}
		return setStatus;
	}

}
