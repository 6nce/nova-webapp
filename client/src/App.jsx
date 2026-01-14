import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";

export default function App() {
    return (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
            <header style={{ display: "flex", gap: 12, marginBottom: 16 }}>
                <NavLink to="/applications">Applications</NavLink>
                <NavLink to="/tasks">Tasks</NavLink>
            </header>

            <Routes>
                <Route path="/" element={<Navigate to="/applications" replace />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
        </div>
    );
}