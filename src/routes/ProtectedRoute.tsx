import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../components/Spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <Spinner />; // ✅ Show spinner while fetching /me
    if (!user) return <Navigate to="/login" replace />;

    return <MainLayout>{children}</MainLayout>;
};
