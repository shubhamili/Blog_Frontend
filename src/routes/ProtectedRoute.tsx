import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../components/Spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    console.log("inside protectedroute", user, isLoading);

    if (isLoading) return <Spinner />;

    if (!user) return <Navigate to="/login" replace />;

    return <MainLayout>{children}</MainLayout>;
};
