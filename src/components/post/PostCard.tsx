import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Blog } from "@/types/Blog";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }: { post: Blog }) => {
    const navigate = useNavigate();

    return (
        <Card
            onClick={() => navigate(`/blogs/${post._id}`)}
            className="hover:shadow-lg transition cursor-pointer overflow-hidden"
        >
            {post.postPicture && (
                <AspectRatio ratio={16 / 9}>
                    <img
                        src={post.postPicture}
                        alt="Post"
                        className="object-cover w-full h-full rounded-t-md"
                    />
                </AspectRatio>
            )}

            <CardContent className="p-4 space-y-2">
                <p className="text-lg font-medium text-gray-800">
                    {post.content.length > 100
                        ? post.content.slice(0, 100) + "..."
                        : post.content}
                </p>

                <div className="text-sm text-gray-500 flex items-center justify-between">
                    <span>
                        By <strong>{post.author?.name || "Anonymous"}</strong>
                    </span>
                    <span>
                        {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default PostCard;
