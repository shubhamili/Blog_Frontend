import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";
import { logoutUser } from "@/api/auth"; // optional: backend cookie clear
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
    const user = useAppSelector((state) => state.auth.user); // ✅ Fixed destructuring
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser(); // clear cookie on backend (optional)
        } catch (e) {
            console.warn("Logout API failed");
        }
        dispatch(logout());
        navigate("/login");
    };

    const navLinks = (
        <>
            <Link to="/home" className="hover:underline">Home</Link>
            {user && <Link to="/blogs/new" className="hover:underline">Create</Link>}
        </>
    );

    return (
        <header className="w-full border-b shadow-sm bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-primary">
                    📝 BlogApp
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm">
                    {navLinks}

                    {user ? (
                        <>
                            <span className="text-muted-foreground">Hi, {user.userName}</span>
                            <Link to="/profile" className="hover:underline">Profile</Link>

                            <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-medium">Login</Link>
                            <Link to="/register" className="text-sm font-medium">Register</Link>
                        </>
                    )}
                </nav>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <div className="flex flex-col gap-4 mt-8 text-sm">
                            {navLinks}

                            {user ? (
                                <>
                                    <span className="text-muted-foreground">Hi, {user.userName}</span>
                                    <Link to="/profile" className="hover:underline">Profile</Link>

                                    <Button variant="outline" size="sm" onClick={handleLogout}>Logout</Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                </>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};

export default Navbar;
