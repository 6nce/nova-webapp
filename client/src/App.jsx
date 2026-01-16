import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import HomePage from "./pages/HomePage.jsx";

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace/>}/>
                <Route path="/applications" element={<ApplicationsPage/>}/>
                <Route path="/tasks" element={<TasksPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </div>
    );
}