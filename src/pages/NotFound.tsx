import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4 mb-2 text-gray-700">Page Not Found</p>
            <Link to="/" className="text-blue-500 underline hover:text-blue-700 mt-4">
                Go back to Home
            </Link>
        </div>
    );
};

export default NotFound;
