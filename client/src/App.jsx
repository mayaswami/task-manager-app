import { ListTodo } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-blue-500 p-2 rounded-lg">
            <ListTodo className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
        </div>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  );
}

export default App;