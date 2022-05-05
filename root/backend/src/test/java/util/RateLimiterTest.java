package util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import util.limiter.IRateLimiter;
import util.limiter.LocalRateLimiter;
import util.limiter.RedisRateLimiter;

class RateLimiterTest {
    IRateLimiter testRateLimit = new RedisRateLimiter(20, 900000);
    
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