import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
    const { blogs, loading, fetchBlogs } = useBlog();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleCreatePost = () => navigate("/create");

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
                        Discover Stories
                    </h1>
                    {/* <button
                        onClick={handleCreatePost}
                        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        New Story
                    </button> */}
                </div>

                {loading ? (
                    <div className="flex justify-center mt-20">
                        <Spinner />
                    </div>
                ) : blogs?.length === 0 ? (
                    <div className="text-center mt-20">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Stories Yet</h3>
                        <p className="text-gray-500 text-sm mb-4">Start the conversation by sharing your first story.</p>
                        <button
                            onClick={handleCreatePost}
                            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 text-sm font-medium"
                        >
                            Write Your First Story
                        </button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} post={blog} />
                        ))}
                    </div>
                )}

                {/* Floating Action Button */}
                <button
                    onClick={handleCreatePost}
                    className="fixed bottom-6 right-6 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 hover:shadow-xl transition-all duration-200 z-50"
                    aria-label="Create new story"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Home;