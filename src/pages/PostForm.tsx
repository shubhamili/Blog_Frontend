import {
    useEffect,
    useState,
    useRef,
    type ChangeEvent,
    type FormEvent,
} from "react";
import {
    createPost,
    getDetailedBlog,
    updatePost,
} from "../services/Blog";
import type { createEditPostPayload } from "../types/Blog";
import { useParams, useNavigate } from "react-router-dom";

const PostForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const isEditMode = Boolean(id);
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const currentImagePreviewRef = useRef<string | null>(null);

    const [formData, setFormData] = useState<createEditPostPayload>({
        content: "",
        postPicture: "",
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [fetchingPost, setFetchingPost] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Cleanup function for object URLs
    const cleanupImagePreview = () => {
        if (currentImagePreviewRef.current && currentImagePreviewRef.current.startsWith('blob:')) {
            URL.revokeObjectURL(currentImagePreviewRef.current);
            currentImagePreviewRef.current = null;
        }
    };

    useEffect(() => {
        if (!isEditMode || !id) return;

        const fetchPost = async () => {
            setFetchingPost(true);
            setError("");

            try {
                const post = await getDetailedBlog(id);
                setFormData({
                    content: post.content,
                    postPicture: null, // We don't load image as File
                });
                if (post.postPicture) {
                    setImagePreview(post.postPicture); // Expect image URL from backend
                    currentImagePreviewRef.current = post.postPicture;
                }
            } catch (err: any) {
                console.error("Failed to fetch post:", err);
                setError(err.response?.data?.message || "Failed to fetch post. Please try again.");
            } finally {
                setFetchingPost(false);
            }
        };

        fetchPost();
    }, [id, isEditMode]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            cleanupImagePreview();
        };
    }, []);

    const validateImage = (file: File): string | null => {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

        if (file.size > maxSize) {
            return "Image size must be less than 10MB";
        }

        if (!allowedTypes.includes(file.type)) {
            return "Please select a valid image file (JPEG, PNG, GIF, or WebP)";
        }

        return null;
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const validationError = validateImage(file);
        if (validationError) {
            setError(validationError);
            // Reset the input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            return;
        }

        // Clear any existing error
        setError("");

        // Cleanup previous preview
        cleanupImagePreview();

        const previewUrl = URL.createObjectURL(file);
        currentImagePreviewRef.current = previewUrl;

        setFormData((prev) => ({ ...prev, postPicture: file }));
        setImagePreview(previewUrl);
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // Clear error when user starts typing
        if (error && error.includes("Content is required")) {
            setError("");
        }
        setFormData((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedContent = formData.content.trim();
        if (!trimmedContent) {
            setError("Content is required.");
            return;
        }

        if (trimmedContent.length > 5000) { // Assuming a reasonable limit
            setError("Content must be less than 5000 characters.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const realFormData = new FormData();
            realFormData.append("content", trimmedContent);

            // Only append image if there's a new file selected
            if (formData.postPicture instanceof File || formData.postPicture) {
                realFormData.append("postPicture", formData.postPicture);
            }

            const response = isEditMode
                ? await updatePost(id!, realFormData)
                : await createPost(realFormData);

            if (response.success) {
                const successMessage = isEditMode
                    ? "Post updated successfully!"
                    : "Post created successfully!";

                setSuccess(successMessage);

                if (!isEditMode) {
                    // Only reset form for new posts
                    setFormData({ content: "", postPicture: "" });
                    cleanupImagePreview();
                    setImagePreview(null);
                    if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                    }
                }

                // Navigate after a short delay
                setTimeout(() => {
                    navigate("/profile");
                }, 1500);
            } else {
                setError(response.message || "Failed to save post. Please try again.");
            }
        } catch (err: any) {
            console.error("Post submission error:", err);
            const errorMessage = err.response?.data?.message ||
                err.message ||
                "Network error. Please check your connection and try again.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const removeImage = () => {
        cleanupImagePreview();
        setFormData((prev) => ({ ...prev, postPicture: null }));
        setImagePreview(null);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        // Clear any image-related errors
        if (error && (error.includes("Image") || error.includes("file"))) {
            setError("");
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
            navigate(-1);
        }
    };

    // Show loading state when fetching post data
    if (fetchingPost) {
        return (
            <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-32 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const isSubmitDisabled = loading || !formData.content.trim() || formData.content.trim().length > 5000;

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        {isEditMode ? "Edit Post" : "Create New Post"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Content Textarea */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                What's on your mind? *
                            </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={handleContentChange}
                                placeholder="Share your thoughts..."
                                rows={6}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 resize-vertical transition-colors ${formData.content.length > 5000
                                        ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                        : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                disabled={loading}
                            />
                            <div className={`text-right text-sm mt-1 ${formData.content.length > 5000 ? 'text-red-500' : 'text-gray-500'
                                }`}>
                                {formData.content.length}/5000 characters
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Add Image (optional)
                            </label>

                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        id="postPicture"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        disabled={loading}
                                    />
                                    <label
                                        htmlFor="postPicture"
                                        className={`cursor-pointer flex flex-col items-center ${loading ? 'cursor-not-allowed opacity-50' : ''
                                            }`}
                                    >
                                        <svg
                                            className="w-12 h-12 text-gray-400 mb-2"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                            />
                                        </svg>
                                        <span className="text-sm text-gray-600">
                                            Click to upload image
                                        </span>
                                        <span className="text-xs text-gray-400 mt-1">
                                            JPEG, PNG, GIF, WebP up to 10MB
                                        </span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                        onError={() => {
                                            setError("Failed to load image preview");
                                            removeImage();
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        disabled={loading}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Remove image"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Feedback Messages */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                <div className="flex">
                                    <svg
                                        className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}

                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                                <div className="flex">
                                    <svg
                                        className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {success}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitDisabled}
                                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                        {isEditMode ? "Updating..." : "Creating..."}
                                    </>
                                ) : (
                                    isEditMode ? "Update Post" : "Create Post"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostForm;