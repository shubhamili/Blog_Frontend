import { Navigate } from "react-router-dom"; // Keep this for redirect component
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../hooks/UseAuth";
import Spinner from "../components/Spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth(); // useNavigate() not needed here

    if (isLoading) return <Spinner/>

    if (!user) return <Navigate to="/login" replace />; // this is correct ✅

    return <MainLayout>{children}</MainLayout>; // wrap in layout if needed
};
