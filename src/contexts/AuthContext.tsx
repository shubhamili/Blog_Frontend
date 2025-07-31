import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, LoginPayload, LoginResponse, LogOutResponse, RegisterPayload, UserModel } from "../types/Auth";
import API from "../services/Api";
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<UserModel | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    console.log("hello from authcontext", user);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get("/user/me");
                setUser(response.data.user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUser();
    }, []);



    const login = async (data: LoginPayload): Promise<LoginResponse> => {
        const response = await API.post('/user/login', data);
        if (!response.data.success) {
            return response.data;
        }
        setUser(response.data.user)
        return response.data;
    }

    const register = async (data: RegisterPayload): Promise<LoginResponse> => {
        const response = await API.post('/user/register', data);
        if (!response.data.success) {
            return response.data;
        }
        setUser(response.data.user);
        return response.data;
    }

    const logout = async (): Promise<LogOutResponse> => {
        try {
            const res = await API.post("user/logout");
            setUser(null);
            console.log("logout", res.data);
            return res.data;
        } catch (err) {
            console.error("Logout failed", err);
            toast.error("Logout failed!");
            return {
                success: false,
                message: "Logout failed due to an error.",
            };
        }
    };




    return (
        <AuthContext.Provider value={
            {
                user,
                setUser,
                isLoading,
                login,
                register,
                logout,
            }} >
            {children}
        </AuthContext.Provider>

    )
}

