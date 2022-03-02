package util;

public class RateLimiter {

    private int periodRequestBudget;
    private long periodDuration;
    private long currentPeriodStartTime;
    private int currentPeriodBudgetSpent;

    public int getCurrentPeriodBudgetSpent() {
        return currentPeriodBudgetSpent;
    }

    public RateLimiter(int budget, long duration) {
        this.periodRequestBudget = budget;
        this.periodDuration = duration;
        this.currentPeriodStartTime = -1;
        this.currentPeriodBudgetSpent = 0;
    }

    public int getBudgetRemaining() {
        return (this.periodRequestBudget - this.currentPeriodBudgetSpent);
    }
    
    public void spendBudget(int amount) {
    	resetPeriodIfElapsed();
    	this.currentPeriodBudgetSpent += amount;
    }

    public boolean hasBudget(int amount) {
        return (this.getBudgetRemaining() >= amount || this.isCurrentPeriodOver());
    }

    public boolean isCurrentPeriodOver() {
        return ((System.currentTimeMillis() - this.currentPeriodStartTime) > this.periodDuration);
    }

    public void resetPeriodIfElapsed() {
        if (isCurrentPeriodOver()) {
            this.currentPeriodStartTime = System.currentTimeMillis();
            this.currentPeriodBudgetSpent = 0;
        }
    }

}


