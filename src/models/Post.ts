export interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface PostContextType {
  post: Post[];
  createPost: (newPost: Post) => Promise<void>;
  updatePost: (id: number | string, updated: Partial<Post>) => Promise<void>;
  deletePost: (id: number | string) => Promise<void>;
}
