import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Landing = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-slate-100 to-slate-200 px-4">
            <div className="max-w-2xl text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                    Welcome to <span className="text-blue-600">BlogSphere</span>
                </h1>
                <p className="text-slate-600 text-lg md:text-xl">
                    Share your thoughts, connect with the world, and explore amazing blogs by real people.
                </p>

                <div className="flex justify-center gap-4 pt-4 flex-wrap">
                    <Button onClick={() => navigate("/login")} size="lg">
                        Login
                    </Button>
                    <Button variant="outline" onClick={() => navigate("/register")} size="lg">
                        Register
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Landing;
