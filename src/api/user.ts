import axios from "./config";
import { User } from "@/types/User";

export const getMyProfile = async (): Promise<User> => {
    const res = await axios.get("/users/me");
    return res.data;
};

export const updateProfile = async (data: Partial<User>): Promise<User> => {
    const res = await axios.put("/users/me", data);
    return res.data;
};
