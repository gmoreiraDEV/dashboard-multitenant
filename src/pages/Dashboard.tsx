import { useAuthStore } from "../store/authStore";
import {
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  ListTodo,
  Target,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuthStore();

  const stats = [
    { name: "Total Leads", value: "2,651", icon: Users, change: "+12%" },
    { name: "Content Tasks", value: "42", icon: ListTodo, change: "+8%" },
    {
      name: "Monthly Budget",
      value: "$45,200",
      icon: DollarSign,
      change: "+3%",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's what's happening across your organization today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
          >
            <dt>
              <div className="absolute bg-indigo-500 rounded-md p-3">
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                <TrendingUp className="self-center flex-shrink-0 h-5 w-5" />
                <span className="sr-only">Increased by</span>
                {item.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="flow-root">
            <ul className="-mb-8">
              {[
                { title: "New lead captured", time: "3m ago", icon: Target },
                {
                  title: "Content task completed",
                  time: "1h ago",
                  icon: FileText,
                },
                { title: "Budget updated", time: "2h ago", icon: DollarSign },
              ].map((item, idx) => (
                <li key={idx}>
                  <div className="relative pb-8">
                    {idx !== 2 && (
                      <span
                        className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className="h-8 w-8 rounded-full bg-indigo-50 flex items-center justify-center">
                          <item.icon className="h-5 w-5 text-indigo-600" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-gray-500">{item.title}</p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          {item.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { name: "Add Lead", icon: Users, color: "bg-blue-500" },
              { name: "New Task", icon: ListTodo, color: "bg-green-500" },
              {
                name: "Update Budget",
                icon: DollarSign,
                color: "bg-yellow-500",
              },
              {
                name: "Create Content",
                icon: FileText,
                color: "bg-purple-500",
              },
            ].map((action) => (
              <button
                key={action.name}
                className="relative group bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                <div
                  className={`${action.color} rounded-lg p-3 inline-flex mb-2`}
                >
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {action.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
