import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, followerResponse, LoginPayload, LoginResponse, LogOutResponse, RegisterPayload, reqProfileResponse, updateProfileResponse, UserModel } from "../types/Auth";
import API from "../services/Api";
import { toast } from "react-toastify";
import { updateAccessToken as setAxiosToken } from "../services/Api";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState<UserModel | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const refreshAccessToken = async () => {
            try {
                const response = await API.get("/user/refreshAccessToken");
                console.log("Fetched user data:", response.data.user);
                setAccessToken(response.data.accessToken || null);
                setUser(response.data.user || null);
            } catch {
                setUser(null);
                setAccessToken(null);
                console.error("Failed to refresh access token");
            } finally {
                setIsLoading(false);
            }
        };
        refreshAccessToken();

    }, []);

    useEffect(() => {
        if (accessToken) {
            setAxiosToken(accessToken);
        } else {
            setAxiosToken("");
        }
    }, [accessToken]);


    const login = async (data: LoginPayload): Promise<LoginResponse> => {
        console.log("login data", data);
        const response = await API.post('/user/login', data);
        console.log("login response ====================>", response);
        if (!response.data.success) {
            return response.data;
        }
        setUser(response.data.user)
        setAccessToken(response.data.user.accessToken || null);
        return response.data;
    }

    const register = async (data: RegisterPayload): Promise<LoginResponse> => {
        const response = await API.post('/user/register', data);
        if (!response.data.success) {
            return response.data;
        }
        setUser(response.data.user);
        setAccessToken(response.data.user.accessToken || null);
        return response.data;
    }

    const logout = async (): Promise<LogOutResponse> => {
        try {
            const res = await API.post("user/logout");
            setUser(null);
            setAccessToken(null);
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

    const updateProfile = async (data: FormData): Promise<updateProfileResponse> => {
        try {
            const res = await API.put("/user/update", data);
            console.log("Update profile response:", res.data);
            if (!res.data.success) {
                // toast.error(res.data.message || "Failed to update profile");
                return res.data;
            }
            setUser(res.data.user);
            return res.data;

        } catch (error) {
            console.error("Error updating profile:", error);
            // toast.error("Failed to update profile");
            return {
                success: false,
                message: "An error occurred while updating profile",
            };
        }
    };


    const getFollows = async (id: string): Promise<followerResponse> => {
        try {
            const res = await API.get(`/user/getFollow/${id}`);
            return res.data;
        } catch (err) {
            console.error("Error fetching followers:", err);
            throw err;
        }
    }


    const reqProfile = async (profileId: string): Promise<reqProfileResponse> => {
        try {
            const res = await API.get(`/user/profile/${profileId}`);
            return res.data;
        } catch (err) {
            console.error("Error fetching profile:", err);
            throw err;
        }
    };


    return (
        <AuthContext.Provider value={
            {
                user,
                accessToken,
                setUser,
                isLoading,
                login,
                register,
                updateProfile,
                logout,
                getFollows,
                reqProfile
            }} >
            {children}
        </AuthContext.Provider>

    )
}

