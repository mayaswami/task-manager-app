import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete } from "../features/tasks/tasksSlice";

function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div>
        <h3
          className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
        >
          {task.title}
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {task.category} • {task.priority}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => dispatch(toggleComplete(task.id))}
          className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded font-medium hover:bg-green-200"
        >
          {task.completed ? "Undo" : "Done"}
        </button>
        <button
          onClick={() => onEdit(task)}
          className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-medium hover:bg-blue-200"
        >
          Edit
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="text-xs bg-red-100 text-red-700 px-3 py-1.5 rounded font-medium hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
