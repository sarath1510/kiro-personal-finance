function BudgetUtilization({ spent, budget }) {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  const cappedPercentage = Math.min(percentage, 100);

  // Determine color based on utilization
  let colorClass = 'bg-green-500';
  let textColorClass = 'text-green-600';
  
  if (percentage >= 90) {
    colorClass = 'bg-red-500';
    textColorClass = 'text-red-600';
  } else if (percentage >= 70) {
    colorClass = 'bg-yellow-500';
    textColorClass = 'text-yellow-600';
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-2xl font-bold ${textColorClass}`}>
          {percentage.toFixed(0)}%
        </span>
        <span className="text-sm text-gray-500">
          ${(budget - spent).toFixed(2)} remaining
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${colorClass} transition-all duration-300 rounded-full`}
          style={{ width: `${cappedPercentage}%` }}
        />
      </div>

      {percentage > 100 && (
        <p className="text-xs text-red-600 mt-2">
          ⚠️ Over budget by ${(spent - budget).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default BudgetUtilization;
