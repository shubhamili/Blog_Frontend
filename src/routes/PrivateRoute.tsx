import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const user = useAppSelector((state) => state.auth.user);
    const authLoaded = useAppSelector((state) => state.auth.authLoaded);

    if (!authLoaded) {
        return <p className="text-center py-20">Loading...</p>; // or a spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default PrivateRoute;
