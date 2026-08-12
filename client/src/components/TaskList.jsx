import { useSelector } from "react-redux";
import TaskCard from "./TaskCard";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.list);

  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above!</p>;
  }
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
export default TaskList;