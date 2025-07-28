import type { ReactNode } from "react"
import { useAuth } from "../hooks/UseAuth"
import { Navigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const PublicRoute = ({ children }: { children: ReactNode }) => {

    const { user, isLoading } = useAuth();

    if (isLoading) return <Spinner />

    if (user) return <Navigate to="/" replace />

    return <> {children}</>

}

export default PublicRoute