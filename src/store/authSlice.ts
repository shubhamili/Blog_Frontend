import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";

interface AuthState {
    user: User | null;
    authLoaded: boolean;
}

const initialState: AuthState = {
    user: null,
    authLoaded: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user;
        },
        logout(state) {
            state.user = null;
            state.authLoaded = true;
        },
        setUser(state, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user;
            state.authLoaded = true;
        },
    },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;



// interface AuthState {
//     user: User | null;
//     authLoaded: boolean; // ✅ flag to detect if auth check is done
// }

// const initialState: AuthState = {
//     user: null,
//     authLoaded: false,
// };

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         setUser(state, action: PayloadAction<{ user: User }>) {
//             state.user = action.payload.user;
//             state.authLoaded = true;
//         },
//         logout(state) {
//             state.user = null;
//             state.authLoaded = true; // ✅ even if failed
//         },
//     },
// });
  