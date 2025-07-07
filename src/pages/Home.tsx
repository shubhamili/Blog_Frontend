import { useEffect, useState } from "react";
import { getAllBlogs } from "@/api/blog";
import { Blog } from "@/types/Blog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PostCard from "@/components/post/PostCard";

interface PaginatedResponse {
    posts: Blog[];
    totalPosts: number;
    currentPage: number;
    totalPages: number;
}

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<PaginatedResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await getAllBlogs(page); // fetch page-wise
                setData(res);
            } catch (err) {
                console.error("Failed to fetch blogs", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page]);

    const handleNext = () => {
        if (data && page < data.totalPages) setPage((prev) => prev + 1);
    };

    const handlePrev = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">All Blogs</h1>
                <Button onClick={() => navigate("/blogs/new")}>+ New Blog</Button>
            </div>

            {loading ? (
                <p className="text-gray-500">Loading...</p>
            ) : !data?.posts?.length ? (
                <p className="text-gray-500">No blogs found.</p>
            ) : (
                <div className="grid sm:grid-cols-2 gap-6">
                    {data.posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>)}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                    <Button
                        onClick={handlePrev}
                        disabled={page === 1}
                        variant="outline"
                    >
                        ⬅ Prev
                    </Button>
                    <span className="text-sm text-gray-700">
                        Page {data.currentPage} of {data.totalPages}
                    </span>
                    <Button
                        onClick={handleNext}
                        disabled={page === data.totalPages}
                        variant="outline"
                    >
                        Next ➡
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Home;
