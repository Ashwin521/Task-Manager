import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TaskList from "./components/TaskList";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 py-6 px-4">
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
       <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
  Built with ❤️ using <span className="font-medium text-indigo-600">React</span>, 
  <span className="font-medium text-purple-600"> Redux Toolkit</span> & 
  <span className="font-medium text-pink-600"> Tailwind CSS</span>
</footer>
      </div>
    </Router>
  );
}

