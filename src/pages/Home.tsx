import { useEffect } from "react";
import { useBlog } from "../hooks/useBlog";
import BlogCard from "../components/BlogCard";
import Spinner from "../components/Spinner";

const Home = () => {
    const { blogs, loading, fetchBlogs } = useBlog();

    useEffect(() => {
        fetchBlogs();

    }, []);

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                    Trending
                </h1>

                {loading ? (
                    <Spinner />
                ) : blogs?.length === 0 ? (
                    <div className="text-center text-gray-500 mt-16">
                        <p className="text-lg">No blogs available yet.</p>
                        <p className="text-sm mt-1">Create the first blog and share your thoughts!</p>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {blogs.map((blog) => (
                            <BlogCard key={blog._id} post={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
