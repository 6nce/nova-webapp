import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import TasksPage from "./pages/TasksPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProtectedRoute from "./components/utils/ProtectedRoute.jsx";

export default function () {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute>
                            <ApplicationsPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/tasks"
                    element={
                        <ProtectedRoute>
                            <TasksPage/>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <HomePage/>
                        </ProtectedRoute>
                    }
                />
            </Routes>

        </div>
    );
}