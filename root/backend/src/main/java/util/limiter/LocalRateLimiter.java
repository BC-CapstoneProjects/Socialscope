package util.limiter;

public class LocalRateLimiter implements IRateLimiter {

    private int periodRequestBudget;
    private long periodDuration;
    private long currentPeriodStartTime;
    private int currentPeriodBudgetSpent;

    public LocalRateLimiter(int budget, long duration) {
        this.periodRequestBudget = budget;
        this.periodDuration = duration;
        this.currentPeriodStartTime = -1;
        this.currentPeriodBudgetSpent = 0;
    }

    @Override
    public int getBudgetRemaining() {
        return (this.periodRequestBudget - this.currentPeriodBudgetSpent);
    }
    
    @Override
    public void spendBudget(int amount) {
    	resetPeriodIfElapsed();
    	this.currentPeriodBudgetSpent += amount;
    }
    
    @Override
    public boolean hasBudget(int amount) {
        return (this.getBudgetRemaining() >= amount || this.isCurrentPeriodOver());
    }

    @Override
    public boolean isCurrentPeriodOver() {
        return ((System.currentTimeMillis() - this.currentPeriodStartTime) > this.periodDuration);
    }

    @Override
    public void resetPeriodIfElapsed() {
        if (isCurrentPeriodOver()) {
            this.currentPeriodStartTime = System.currentTimeMillis();
            this.currentPeriodBudgetSpent = 0;
        }
    }

}


