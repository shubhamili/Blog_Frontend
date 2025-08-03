import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import BlogDetail from "../pages/BlogDetail";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import CreatePost from "../pages/CreatePage";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    return (
        <BrowserRouter future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true,
        }}>
            <Routes>
                <Route path="/login" element={
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                } />
                <Route path="/signup" element={
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                } />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/blog/:id" element={
                    <ProtectedRoute>
                        <BlogDetail />
                    </ProtectedRoute>
                } />
                <Route path="/create" element={
                    <ProtectedRoute>
                        <CreatePost />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;