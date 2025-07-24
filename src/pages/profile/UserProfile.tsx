import { useAppSelector } from "@/hooks/useAppSelector";
import { useEffect, useState } from "react";
import { getAllBlogs } from "@/api/blog";
import { Blog } from "@/types/Blog";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import logo from '@/assets/logo.png'

const UserProfile = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const res = await getAllBlogs(); // get all blogs
                const filtered = res.posts.filter((post: Blog) => post.author?._id === user?._id);
                setUserBlogs(filtered);
            } catch (err) {
                console.error("Failed to fetch user blogs", err);
            }
        };

        if (user?._id) fetchUserBlogs();
    }, [user]);

    if (!user) return <p className="text-center pt-10">Loading profile...</p>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-6">
            <div className="text-center space-y-2">
                <img src={user.profilePicture || logo} alt="userpic" className="mx-auto h-24 w-24 rounded-full object-cover" />
                <h1 className="text-3xl font-bold"> {user.userName}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <span className="inline-block px-3 py-1 text-xs bg-primary/10 rounded-full text-primary">
                    Role: {user.role}
                </span>
            </div>

            <div className="pt-8">
                <h2 className="text-xl font-semibold mb-4">📚 Your Blogs</h2>

                {userBlogs.length === 0 ? (
                    <p className="text-muted-foreground">No blogs created yet.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userBlogs.map((blog) => (
                            <Card key={blog._id} className="overflow-hidden">
                                <img
                                    src={blog.postPicture}
                                    alt="Blog"
                                    className="h-40 w-full object-cover"
                                />
                                <CardContent className="p-4">
                                    <p className="font-semibold">{blog.content.slice(0, 60)}...</p>
                                    <Button
                                        variant="link"
                                        className="p-0 text-sm mt-2"
                                        onClick={() => navigate(`/blogs/${blog._id}`)}
                                    >
                                        View Details →
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
