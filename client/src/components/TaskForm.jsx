import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/tasksSlice";

function TaskForm({ existingTask, onDone }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setCategory(existingTask.category);
      setPriority(existingTask.priority);
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (existingTask) {
      dispatch(editTask({ ...existingTask, title, category, priority }));
      onDone();
    } else {
      dispatch(
        addTask({
          id: Date.now(),
          title,
          category,
          priority,
          completed: false,
        }),
      );
    }
    setTitle("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col gap-3"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="flex gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm flex-1"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-blue-500 w-full hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium"
        >
          {existingTask ? "Update Task" : "Add Task"}
        </button>
        {existingTask && (
          <button
            type="button"
            onClick={onDone}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
