// import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
// import { createPost, getDetailedBlog, updatePost } from "../services/Blog";
// import type { createEditPostPayload } from "../types/Blog";
// import { useParams } from "react-router-dom";

// const PostForm: React.FC = () => {
//     const { id } = useParams<{id:string}>(); // from react-router
//     const isEditMode = Boolean(id);
//     const [formData, setFormData] = useState<createEditPostPayload>({
//         content: "",
//         postPicture: null,
//     });
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const [success, setSuccess] = useState("");

//     useEffect(() => {
//         if (isEditMode) {
//             const fetchPost = async () => {
//                 try {
//                     const res = await getDetailedBlog(id!);
//                     const post = res;
//                     setFormData({
//                         content: post.content,
//                         postPicture: null, // don't preload File
//                     });
//                     if (post.postPicture) {
//                         setImagePreview(post.postPicture); // backend should return image URL
//                     }
//                 } catch (err) {
//                     setError("Failed to fetch post");
//                 }
//             };
//             fetchPost();
//         }
//     }, [id]);


//     const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         const file = e.target.files?.[0];
//         if (!file) return;

//         const previewUrl = URL.createObjectURL(file);
//         setFormData(prev => ({ ...prev, postPicture: file }));
//         setImagePreview(previewUrl);
//     };

//     const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
//         const value = e.target.value;
//         setFormData(prev => ({ ...prev, content: value }));
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();


//         if (!formData.content.trim()) {
//             setError("Content is required");
//             return;
//         }

//         setLoading(true);
//         setError("");
//         setSuccess("");

//         try {
//             const realFormData = new FormData();
//             realFormData.append("content", formData.content);
//             if (formData.postPicture) {
//                 realFormData.append("postPicture", formData.postPicture);
//             }

//             let response = null;
//             if (isEditMode) {
//                 response = await updatePost(id, realFormData); // make this service
//             } else {
//                 response = await createPost(realFormData);
//             }

//             if (response.success) {
//                 setSuccess("Post created successfully!");
//                 setFormData({ content: "", postPicture: null });
//                 setImagePreview(null);
//             } else {
//                 setError(response.message || "Failed to create post");
//             }
//         } catch (err: any) {
//             setError(err.response?.data?.message || "Network error. Please try again.");
//             console.error("Create post error:", err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const removeImage = (): void => {
//         setImagePreview(null);
//         setFormData(prev => ({ ...prev, postPicture: null }));

//         if (imagePreview) {
//             URL.revokeObjectURL(imagePreview);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
//             <div className="max-w-2xl mx-auto">
//                 <div className="bg-white rounded-lg shadow-md p-6">
//                     <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Post</h1>

//                     <form onSubmit={handleSubmit} className="space-y-6">
//                         {/* Content Input */}
//                         <div>
//                             <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
//                                 What's on your mind?
//                             </label>
//                             <textarea
//                                 id="content"
//                                 value={formData.content}
//                                 onChange={handleContentChange}
//                                 placeholder="Share your thoughts..."
//                                 rows={6}
//                                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
//                             />
//                             <div className="text-right text-sm text-gray-500 mt-1">
//                                 {formData.content.length} characters
//                             </div>
//                         </div>

//                         {/* Image Upload */}
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Add Image (optional)
//                             </label>

//                             {!imagePreview ? (
//                                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
//                                     <input
//                                         type="file"
//                                         id="postPicture"
//                                         accept="image/*"
//                                         onChange={handleImageChange}
//                                         className="hidden"
//                                     />
//                                     <label htmlFor="postPicture" className="cursor-pointer flex flex-col items-center">
//                                         <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                         </svg>
//                                         <span className="text-sm text-gray-600">Click to upload image</span>
//                                         <span className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</span>
//                                     </label>
//                                 </div>
//                             ) : (
//                                 <div className="relative">
//                                     <img
//                                         src={imagePreview}
//                                         alt="Preview"
//                                         className="w-full h-64 object-cover rounded-lg"
//                                     />
//                                     <button
//                                         type="button"
//                                         onClick={removeImage}
//                                         className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
//                                     >
//                                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                         </svg>
//                                     </button>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Feedback Messages */}
//                         {error && (
//                             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
//                                 {error}
//                             </div>
//                         )}
//                         {success && (
//                             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
//                                 {success}
//                             </div>
//                         )}

//                         {/* Action Buttons */}
//                         <div className="flex gap-4">
//                             <button
//                                 type="button"
//                                 onClick={() => window.history.back()}
//                                 className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 disabled={loading || !formData.content.trim()}
//                                 className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//                             >
//                                 {loading ? (
//                                     <>
//                                         <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                                         </svg>
//                                         Creating...
//                                     </>
//                                 ) : (
//                                     "Create Post"
//                                 )}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PostForm;



import {
    useEffect,
    useState,
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

    const [formData, setFormData] = useState<createEditPostPayload>({
        content: "",
        postPicture: null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!isEditMode || !id) return;

        const fetchPost = async () => {
            try {
                const post = await getDetailedBlog(id);
                setFormData({
                    content: post.content,
                    postPicture: null, // We don’t load image as File
                });
                if (post.postPicture) {
                    setImagePreview(post.postPicture); // Expect image URL from backend
                }
            } catch (err) {
                console.error(err);
                setError("Failed to fetch post.");
            }
        };

        fetchPost();
    }, [id, isEditMode]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({ ...prev, postPicture: file }));
        setImagePreview(previewUrl);
    };

    const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prev) => ({ ...prev, content: e.target.value }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.content.trim()) {
            setError("Content is required.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const realFormData = new FormData();
            realFormData.append("content", formData.content);
            if (formData.postPicture) {
                realFormData.append("postPicture", formData.postPicture);
            }

            const response = isEditMode
                ? await updatePost(id!, realFormData)
                : await createPost(realFormData);

            if (response.success) {
                setSuccess(
                    isEditMode
                        ? "Post updated successfully!"
                        : "Post created successfully!"
                );
                setFormData({ content: "", postPicture: null });
                setImagePreview(null);

                // Optional: navigate to profile or post page
                setTimeout(() => {
                    navigate("/profile"); // Adjust route if needed
                }, 1000);
            } else {
                setError(response.message || "Failed to save post.");
            }
        } catch (err: any) {
            console.error("Post submission error:", err);
            setError(err.response?.data?.message || "Network error.");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }

        setFormData((prev) => ({ ...prev, postPicture: null }));
        setImagePreview(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">
                        {isEditMode ? "Edit Post" : "Create New Post"}
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Textarea */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                What's on your mind?
                            </label>
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={handleContentChange}
                                placeholder="Share your thoughts..."
                                rows={6}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                                {formData.content.length} characters
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
                                        type="file"
                                        id="postPicture"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="postPicture"
                                        className="cursor-pointer flex flex-col items-center"
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
                                            PNG, JPG, GIF up to 10MB
                                        </span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
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

                        {/* Feedback */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                                {success}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !formData.content.trim()}
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
