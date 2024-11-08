import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { formatCurrency } from "../lib/utils";

const BudgetTracker = () => {
  const { hasPermission } = useAuthStore();
  const [expenses] = useState([
    { id: 1, category: "Marketing", amount: 12500, change: 8 },
    { id: 2, category: "Sales Tools", amount: 8750, change: -3 },
    { id: 3, category: "Content Creation", amount: 6300, change: 12 },
    { id: 4, category: "Team Training", amount: 4500, change: 5 },
  ]);

  if (!hasPermission("finance")) {
    return <div>Access denied</div>;
  }

  const totalBudget = 45000;
  const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const remaining = totalBudget - totalSpent;

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Budget Tracker
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Monitor and manage your department budgets
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Add Expense
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Budget
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(totalBudget)}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingDown className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Spent
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(totalSpent)}
                    </div>
                    <p className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                      <ArrowUpRight className="self-center flex-shrink-0 h-5 w-5" />
                      <span className="sr-only">Increased by</span>
                      12%
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Remaining Budget
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {formatCurrency(remaining)}
                    </div>
                    <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      <ArrowDownRight className="self-center flex-shrink-0 h-5 w-5" />
                      <span className="sr-only">Decreased by</span>
                      8%
                    </p>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">
              Expenses by Category
            </h2>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div key={expense.id} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-600">
                    {expense.category}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(expense.amount)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{
                      width: `${(expense.amount / totalBudget) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Monthly Trend</h2>
            <BarChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="mt-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-sm font-medium text-gray-500">
                    Category
                  </th>
                  <th className="text-right text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-right text-sm font-medium text-gray-500">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="py-4 text-sm text-gray-900">
                      {expense.category}
                    </td>
                    <td className="py-4 text-right text-sm text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="py-4 text-right text-sm">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          expense.change > 0
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {expense.change > 0 ? "+" : ""}
                        {expense.change}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;
