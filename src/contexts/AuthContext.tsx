import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, LoginPayload, LoginResponse, RegisterPayload, UserModel } from "../types/Auth";
import API from "../services/Api";
//here currently im not using api calls from sevices but here directly. will be following in other contexts

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserModel | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await API.get("/user/me");
                setUser(response.data.user)
            } catch (error) {
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUser()
    }, [])



    // const login = async (data: LoginPayload): Promise<LoginResponse> => {
    //     const response = await API.post('/user/login', data);
    //     setUser(response.data.userData)
    // }

    const register = async (data: RegisterPayload) => {
        const response = await API.post('/user/register', data);
        setUser(response.data.userData)
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
                logout
            }} >
            {children}
        </AuthContext.Provider>

    )
}


export const useAuth = () => {
    const context_user = useContext(AuthContext);
    if (!context_user) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context_user;
}