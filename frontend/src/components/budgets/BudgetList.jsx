import BudgetUtilization from './BudgetUtilization';

function BudgetList({ budgets, onDelete }) {
  if (budgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-600 text-lg">No budgets yet</p>
        <p className="text-gray-500 text-sm mt-2">Create your first budget to start tracking spending</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {budgets.map((budget) => (
        <div key={budget.id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{budget.category_name}</h3>
              <p className="text-sm text-gray-500 capitalize">{budget.period} Budget</p>
            </div>
            <button
              onClick={() => onDelete(budget.id)}
              className="text-red-600 hover:text-red-800"
              title="Delete budget"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <BudgetUtilization
            spent={budget.spent || 0}
            budget={budget.amount}
          />

          <div className="mt-4 flex justify-between text-sm">
            <span className="text-gray-600">Budget: ${parseFloat(budget.amount).toFixed(2)}</span>
            <span className="text-gray-600">Spent: ${parseFloat(budget.spent || 0).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BudgetList;
