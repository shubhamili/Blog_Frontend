import axios from "./config";
import { LoginPayload, RegisterPayload } from "@/types/Auth";
import { User } from "@/types/User";


export const loginUser = async (data: LoginPayload): Promise<User> => {
    const res = await axios.post("/user/login", data, {
        withCredentials: true,
    });

    return res.data.user;
};

export const registerUser = async (data: RegisterPayload): Promise<{ user: User }> => {
    const res = await axios.post("/user/register", data);
    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.post("/user/logout"); // adjust route
    return res.data;
};



export const fetchCurrentUser = async () => {
    const res = await axios.get("/user/getUserProfile");
    return res.data;
};
