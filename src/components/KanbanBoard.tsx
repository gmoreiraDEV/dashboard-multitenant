import { useState } from "react";
import { Grip, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
}

const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Create blog post", status: "todo" },
    { id: "2", title: "Design social media graphics", status: "inProgress" },
    { id: "3", title: "Review content strategy", status: "done" },
  ]);

  const [newTask, setNewTask] = useState("");

  const columns = [
    { id: "todo", title: "To Do", color: "bg-gray-100" },
    { id: "inProgress", title: "In Progress", color: "bg-blue-50" },
    { id: "done", title: "Done", color: "bg-green-50" },
  ];

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: newTask, status: "todo" },
      ]);
      setNewTask("");
    }
  };

  const moveTask = (
    taskId: string,
    newStatus: "todo" | "inProgress" | "done"
  ) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div className="h-full">
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add new task"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={addTask}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Task
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`${column.color} p-4 rounded-lg shadow`}
          >
            <h3 className="font-semibold text-lg mb-4">{column.title}</h3>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-200"
                  >
                    <div className="flex items-center">
                      <Grip className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{task.title}</span>
                    </div>
                    <div className="mt-2 flex gap-1">
                      {columns.map((col) => (
                        <button
                          key={col.id}
                          onClick={() => moveTask(task.id, col.id as never)}
                          disabled={task.status === col.id}
                          className={`px-2 py-1 text-xs rounded ${
                            task.status === col.id
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                          }`}
                        >
                          {col.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
