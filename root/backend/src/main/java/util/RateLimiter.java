package util;

public class RateLimiter {

    private int periodRequestBudget;
    private long periodDuration;
    private long currentPeriodStartTime;
    private int currentPeriodBudgetSpent;

    public int getPeriodRequestBudget() {
        return periodRequestBudget;
    }

    public void setPeriodRequestBudget(int periodRequestBudget) {
        this.periodRequestBudget = periodRequestBudget;
    }

    public long getPeriodDuration() {
        return periodDuration;
    }

    public void setPeriodDuration(long periodDuration) {
        this.periodDuration = periodDuration;
    }

    public long getCurrentPeriodStartTime() {
        return currentPeriodStartTime;
    }

    public void setCurrentPeriodStartTime(long currentPeriodStartTime) {
        this.currentPeriodStartTime = currentPeriodStartTime;
    }

    public int getCurrentPeriodBudgetSpent() {
        return currentPeriodBudgetSpent;
    }

    public void setCurrentPeriodBudgetSpent(int currentPeriodBudgetSpent) {
        this.currentPeriodBudgetSpent = currentPeriodBudgetSpent;
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

    public boolean hasBudget(int amount) {
        return (this.getBudgetRemaining() >= amount);
    }
    public boolean notEnough(int amount) {
        return (this.getBudgetRemaining() < amount);
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
