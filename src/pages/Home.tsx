// import { useEffect } from "react";
// import { useBlog } from "../hooks/useBlog";
// import BlogCard from "../components/BlogCard";
// import Spinner from "../components/Spinner";

// const Home = () => {
//     const { blogs, loading, fetchBlogs } = useBlog();

//     useEffect(() => {
//         fetchBlogs();

//     }, []);

//     return (
//         <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
//             <div className="max-w-3xl mx-auto">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                     Trending
//                 </h1>

//                 {loading ? (
//                     <Spinner />
//                 ) : blogs?.length === 0 ? (
//                     <div className="text-center text-gray-500 mt-16">
//                         <p className="text-lg">No blogs available yet.</p>
//                         <p className="text-sm mt-1">Create the first blog and share your thoughts!</p>
//                     </div>
//                 ) : (
//                     <div className="space-y-8">
//                         {blogs.map((blog) => (
//                             <BlogCard key={blog._id} post={blog} />
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Home;











import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const { blogs, loading, fetchBlogs } = useBlog();
    const navigate = useNavigate();
    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleCreatePost = () => {
        navigate("/create");
        console.log("Navigate to create post page");
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                {/* Header with Create Post Button */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Trending
                    </h1>
                    <button
                        onClick={handleCreatePost}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        Create Post
                    </button>
                </div>

                {loading ? (
                    <Spinner />
                ) : blogs?.length === 0 ? (
                    <div className="text-center text-gray-500 mt-16">
                        <p className="text-lg">No blogs available yet.</p>
                        <p className="text-sm mt-1">Create the first blog and share your thoughts!</p>
                        <button
                            onClick={handleCreatePost}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
                        >
                            Create Your First Post
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} post={blog} />
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <button
                    onClick={handleCreatePost}
                    className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 z-50"
                    title="Create Post"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Home;