package util.limiter;

public interface IRateLimiter {
	
	public int getBudgetRemaining();
	
	public boolean hasBudget(int amount);
	
	public void spendBudget(int amount);
	
	public boolean isCurrentPeriodOver();
	
	public void resetPeriodIfElapsed();
	

}
