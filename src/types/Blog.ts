export interface createEditPostPayload {
    content: string;
    postPicture: File;
}

export interface getPostById {

}

export interface addComment {
    comment: string
}
export interface Author {
    _id: string;
    email: string;
    profilePicture: string;
}

export interface Comment {
    _id: string;
    user: Author;
    content: string;
    createdAt: string;
}

export interface postModel {
    _id: string;
    author: Author;
    content: string;
    postPicture: string;
    postPicturePublicID: string;
    likes: (Author | null)[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export interface PaginatedBlogResponse {
    totalPosts: number;
    currentPage: number;
    totalPages: number;
    postsPerPage: number;
    posts: postModel[];
}


export interface BlogContextType {
    blogs: postModel[];
    setBlogs: (blogs: postModel[]) => void;
    loading: boolean;
    createPost: (data: createEditPostPayload) => Promise<postModel>;
    updatePost: (id: string, data: createEditPostPayload) => Promise<postModel>;
    deletePost: (id: string) => Promise<{ message: string }>;
    likePost: (id: string) => Promise<{ likes: (string | null)[] }>;
    addComment: (id: string, comment: string) => Promise<Comment>;
}
