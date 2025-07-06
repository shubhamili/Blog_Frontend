import axios from "./config";
import { LoginPayload, RegisterPayload } from "@/types/Auth";
import { User } from "@/types/User";


export const loginUser = async (data: LoginPayload): Promise<User> => {
    const res = await axios.post("/user/login", data, {
        withCredentials: true, // 🧠 important to include cookie!
    });

    return res.data.user;
};

export const registerUser = async (
    data: RegisterPayload
): Promise<{ token: string; user: User }> => {
    const res = await axios.post("/user/register", data);
    return res.data;
};
