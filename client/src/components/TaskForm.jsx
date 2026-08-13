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
      dispatch(
        editTask({
          ...existingTask,
          title,
          category,
          priority,
        }),
      );
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Study">Study</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button type="submit">{existingTask ? "Update Task" : "Add Task"}</button>
      {existingTask && (
        <button type="button" onClick={onDone}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;
