export interface User {
    id: string;
    userName: string;
    email: string;
    role?: "user" | "admin" | "editor";
    profilePicture: string
}
  