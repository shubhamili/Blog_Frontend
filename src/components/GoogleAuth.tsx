/* global google */
import { useEffect } from 'react';
import API from '../services/Api.jsx';
import { toast } from 'react-toastify';
import socket from '../socket.js';
import { useNavigate } from 'react-router-dom';

export default function GoogleAuth() {
    const navigate = useNavigate();
    const handleGoogleResponse = async (response: any) => {
        try {
            const credential = response.credential;

            const res = await API.post(
                "/google/auth",
                { credential }
            );

            const data = res.data;

            // console.log("Google Login Response:", data);

            if (!data.success) {
                toast.error("Google login failed");
                return;
            }

            // SAME AS MANUAL LOGIN
            localStorage.setItem("userId", data.user.id);

            toast.success("Login successful!");

            socket.connect();
            console.log("navigateign ");

            Promise.resolve().then(() => {
                navigate("/");
            });

            console.log("navigated");

        } catch (error) {
            console.error(error);
            toast.error("Google Login failed!");
        }
    };


    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleResponse
        });


        window.google.accounts.id.renderButton(
            document.getElementById('googleLoginBtn'), // FIXED
            { theme: 'filled_blue', size: 'large' }
        );
    }, []);

    return (
        <div>
            <div id="googleLoginBtn" ></div>
        </div>
    );
}
