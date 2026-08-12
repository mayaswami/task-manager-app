import { useDispatch } from "react-redux";
import { deleteTask, toggleComplete } from "../features/tasks/tasksSlice";

function TaskCard({ task }) {
  const dispatch = useDispatch();

  return (
    <div>
      <h3 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
        {task.title}
      </h3>
      <p>
        {task.category} | {task.priority}
      </p>
      <button onClick={() => dispatch(toggleComplete(task.id))}>
        {task.completed ? "Mark Incomplete" : "Mark Complete"}
      </button>
      <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
    </div>
  );
}
export default TaskCard;