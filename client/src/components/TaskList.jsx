import { useSelector } from "react-redux";
import { useState } from "react";
import { Search, ClipboardList } from "lucide-react";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.list);
  const [editingTask, setEditingTask] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "All" || task.category === categoryFilter;
    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    const searchMatch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return categoryMatch && priorityMatch && searchMatch;
  });

  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="relative mb-3">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
          >
            <option value="All">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {editingTask && (
        <TaskForm
          existingTask={editingTask}
          onDone={() => setEditingTask(null)}
        />
      )}

      {filteredTasks.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <ClipboardList className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm">No tasks match this filter.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={setEditingTask} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;
