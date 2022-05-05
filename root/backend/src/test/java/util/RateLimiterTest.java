package util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import io.lettuce.core.RedisException;
import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;

class RateLimiterTest {
    IRateLimiter testRateLimit = initializeTestLimiter();
    
    private IRateLimiter initializeTestLimiter() {
    	IRateLimiter testLimiter = null;
    	try {
    		testLimiter = new RedisRateLimiter(20, 900000);
    	}
    	catch (RedisException ex) {
    		testLimiter = new LocalRateLimiter(20, 900000);
    	}
    	return testLimiter;
    	
    }
    
    @Test
    void getBudgetRemaining() {
        assert(testRateLimit.getBudgetRemaining() == 20);
    }

    @Test
    void spendBudget()
    {
        testRateLimit.spendBudget(10);
        System.out.println(testRateLimit.getBudgetRemaining());
        assert(testRateLimit.getBudgetRemaining() == 10);
    }

    @Test
    void spendBudget1()
    {
        Assertions.assertThrows(AssertionError.class, () -> {
            testRateLimit.spendBudget(10);
            testRateLimit.spendBudget(5);
            assert(testRateLimit.getBudgetRemaining() == 4);
        });
    }

    @Test
    void hasBudget() {
        assert(testRateLimit.hasBudget(18) == true);
    }

    
}