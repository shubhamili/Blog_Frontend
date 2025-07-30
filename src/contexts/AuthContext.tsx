import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, LoginPayload, LoginResponse, RegisterPayload, UserModel } from "../types/Auth";
import API from "../services/Api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);


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
        setUser(response.data.userData)
        return response.data;
    }

    const register = async (data: RegisterPayload): Promise<LoginResponse> => {
        const response = await API.post('/user/register', data);
        setUser(response.data.userData)
        return response.data;
    }


    const logout = async () => {
        await API.post('user/logout');
        setUser(null)
    }


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

