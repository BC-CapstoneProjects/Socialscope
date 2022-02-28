package util;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class RateLimiterTest {
    RateLimiter testRateLimit = new RateLimiter(20, 900000);
    @Test
    void getBudgetRemaining() {
        assert(testRateLimit.getBudgetRemaining() == 20);
    }

    @Test
    void spendBudget()
    {
        testRateLimit.spendBudget(10);
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

    @Test
    void isCurrentPeriodOver() {
    }

    @Test
    void resetPeriodIfElapsed() {
    }
}