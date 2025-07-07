import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { registerUser } from "@/api/auth";
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
            const { user } = await registerUser({ userName, email, password });
            dispatch(login({ user }));
            navigate("/");
        } catch (error) {
            alert("Register failed: " + (error as any).response?.data?.message || "Unknown error");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10 space-y-4">
            <Input placeholder="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleRegister} className="w-full">Register</Button>
        </div>
    );
};

export default Register;
