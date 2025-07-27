
export interface UserModel {
    _id: string;
    userName: string;
    email: string;
    profilePicture: string;
}

// types/Auth.ts

// login: you send email + password
export interface LoginPayload {
    email: string;
    password: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    userData: UserModel;
}


// register: you send userName + email + password (maybe confirmPassword)
export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
}


export interface AuthContextType {
    user: UserModel | null;
    setUser: (user: UserModel | null) => void;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<void>;
    register: (data: RegisterPayload) => Promise<void>;
    logout: () => void;
}

