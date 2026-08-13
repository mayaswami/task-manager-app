import { useSelector } from "react-redux";
import { useState } from "react";
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
    const searchMatch =
      searchTerm === "" || task.title.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && priorityMatch && searchMatch;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {editingTask && (
        <TaskForm
          existingTask={editingTask}
          onDone={() => setEditingTask(null)}
        />
      )}

      {filteredTasks.length === 0 ? (
        <p>No tasks match this filter.</p>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={setEditingTask} />
        ))
      )}
    </div>
  );
}

export default TaskList;
