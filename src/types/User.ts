export interface User {
    _id: string; // <-- Add this line
    userName: string;
    email: string;
    profilePicture?: string;
    role?: "user" | "admin" | "editor"; // Optional: extend based on your app
}
