import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MainLayout from "../layouts/MainLayout";
import Spinner from "../components/Spinner";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <Spinner />; // ✅ spinner before redirect or showing form
    if (user) return <Navigate to="/" replace />;

    return <MainLayout>{children}</MainLayout>;
};

export default PublicRoute;
