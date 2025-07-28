import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const useAuth = () => {
    const context_user = useContext(AuthContext);
    if (!context_user) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context_user;
}