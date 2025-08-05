
export interface UserModel {
    _id: string;
    userName: string;
    email: string;
    profilePicture: string;
    accessToken?: string;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface LoginPayload {
    userName: string;
    password: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    user: UserModel;
}
export interface LogOutResponse {
    success: boolean;
    message: string;
}


// register: you send userName + email + password (maybe confirmPassword)
export interface RegisterPayload {
    userName: string;
    email: string;
    password: string;
}


export interface AuthContextType {
    user: UserModel | null;
    accessToken: string | null;
    setUser: (user: UserModel | null) => void;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<LoginResponse>;
    register: (data: RegisterPayload) => Promise<LoginResponse>;
    logout: () => Promise<LogOutResponse>;
}

