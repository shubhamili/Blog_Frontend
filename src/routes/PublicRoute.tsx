import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading } = useAuth();
    // console.log("inside publicroute", user, isLoading);

    if (isLoading) return <Spinner />;
    if (user) return <Navigate to="/" replace />;

    return <>{children}</>;
}

export default PublicRoute;
