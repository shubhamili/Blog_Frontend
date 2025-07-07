export interface User {
    _id: string;
    userName: string;
    email: string;
    role?: "user" | "admin";
}
