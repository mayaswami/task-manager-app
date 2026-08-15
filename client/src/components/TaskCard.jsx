import { useDispatch } from "react-redux";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { deleteTask, toggleComplete } from "../features/tasks/tasksSlice";

const priorityStyles = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-700",
};

function TaskCard({ task, onEdit }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="flex items-start gap-3">
        <button
          onClick={() => dispatch(toggleComplete(task.id))}
          className="mt-0.5 text-gray-400 hover:text-green-500 transition-colors"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        <div>
          <h3
            className={`font-medium ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}
          >
            {task.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{task.category}</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyles[task.priority]}`}
            >
              {task.priority}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 self-end sm:self-auto">
        <button
          onClick={() => onEdit(task)}
          className="text-gray-400 hover:text-blue-500 transition-colors p-1.5"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button
          onClick={() => dispatch(deleteTask(task.id))}
          className="text-gray-400 hover:text-red-500 transition-colors p-1.5"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
