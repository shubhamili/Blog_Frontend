import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/api/auth"; // optional, if backend logout

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser(); // optional
        } catch (err) {
            console.warn("Logout API failed");
        }

        dispatch(logout());
        navigate("/login");
    };

    return (
        <Button variant="outline" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
