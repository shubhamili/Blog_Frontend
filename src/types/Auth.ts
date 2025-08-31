import type { postModel } from "./Blog";

export interface UserModel {
    id: string;
    userName: string;
    email: string;
    bio?: string;
    location?: string;
    website?: string;
    profilePicture?: string;
    accessToken?: string;
    createdAt: string;
    updatedAt: string;
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

export interface updateProfileResponse {
    success: boolean;
    message: string;
    user?: UserModel;
}




export interface followerResponse {
    success: boolean;
    message: string;
    data: {
        followersCount: number;
        followingCount: number;
        followers: followAuther[];
        following: followAuther[];
    };
}

export interface followAuther {
    _id: string;
    author: string;
    follower: string;
}

export interface reqProfileResponse {
    success: boolean;
    message: string;
    data: ProfileData;
}

export interface ProfileData {
    followersCount: number;
    followingCount: number;
    followers: followAuther[];
    following: followAuther[];
    userData: UserModel;
    userPosts: postModel[];
}




export interface AuthContextType {
    user: UserModel | null;
    accessToken: string | null;
    setUser: (user: UserModel | null) => void;
    isLoading: boolean;
    login: (data: LoginPayload) => Promise<LoginResponse>;
    register: (data: RegisterPayload) => Promise<LoginResponse>;
    logout: () => Promise<LogOutResponse>;
    updateProfile: (data: FormData) => Promise<updateProfileResponse>;
    getFollows: (id: string) => Promise<followerResponse>;
    reqProfile: (profileId: string) => Promise<reqProfileResponse>;

}

