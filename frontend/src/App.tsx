import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/tasks/TaskList';
import PrivateRoute from './components/PrivateRoute';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      {/* Toaster for notifications */}
      <Toaster /> 

      {/* Route Configurations */}
      <Routes>
        {/* Redirect to Login if no specific route is provided */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route */}
        <Route 
          path="/tasks" 
          element={
            <PrivateRoute>
              <TaskList />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
