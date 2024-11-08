import KanbanBoard from "../components/KanbanBoard";
import { useAuthStore } from "../store/authStore";

import { Calendar, ListTodo, FileText, Users } from "lucide-react";

const ContentCRM = () => {
  const { hasPermission } = useAuthStore();

  if (!hasPermission("content")) {
    return <div>Access denied</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Content Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your content creation workflow and tasks
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Total Tasks",
            value: "24",
            icon: ListTodo,
            color: "bg-blue-500",
          },
          {
            title: "In Progress",
            value: "8",
            icon: FileText,
            color: "bg-yellow-500",
          },
          {
            title: "Completed",
            value: "16",
            icon: Calendar,
            color: "bg-green-500",
          },
          {
            title: "Team Members",
            value: "6",
            icon: Users,
            color: "bg-purple-500",
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className="bg-white rounded-lg shadow p-6 flex items-center"
          >
            <div className={`${stat.color} rounded-lg p-3 mr-4`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Content Tasks
          </h3>
        </div>
        <div className="p-4">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
};

export default ContentCRM;
