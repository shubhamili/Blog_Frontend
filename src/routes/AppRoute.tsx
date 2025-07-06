import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/routes/PrivateRoute";
import Landing from "@/pages/landing/Landing";
import Home from "@/pages/Home";
import EditBlog from "@/pages/blog/EditBlog";
import BlogDetail from "@/pages/blog/BlogDetail";
import CreateBlog from "@/pages/blog/CreateBlog";



const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private (Protected) */}
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/blogs/new"
                element={
                    <PrivateRoute>
                        <CreateBlog />
                    </PrivateRoute>
                }
            />
            <Route
                path="/blogs/:id/edit"
                element={
                    <PrivateRoute>
                        <EditBlog />
                    </PrivateRoute>
                }
            />
            <Route path="/blogs/:id" element={<BlogDetail />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRoutes;

// <Route path="/blogs/new" element={<PrivateRoute><CreateBlog /></PrivateRoute>} />
// <Route path="/blogs/:id/edit" element={<PrivateRoute><EditBlog /></PrivateRoute>} />
// <Route path="/blogs/:id" element={<BlogDetail />} />
