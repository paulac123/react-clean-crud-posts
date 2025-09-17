// src/context/PostContext.tsx
import { useState, useEffect, createContext } from "react";
import type { Post, PostContextType } from "../models/Post";
import type { Props } from "../models/commin";

import { PostService } from "../services/postsService";
import { PostApiRepository } from "../infra/PostApiRepository";

// Instanciamos repository y service
const repository = new PostApiRepository();
const service = new PostService(repository);

// Creamos el contexto
export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

export const PostProvider = ({ children }: Props) => {
  const [post, setPost] = useState<Post[]>([]);

  // Traer posts al iniciar
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await service.getAllPosts();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Crear un post
  const createPost = async (newPost: Post) => {
    try {
      const created = await service.createPost(newPost);
      if (created) setPost((prev) => [...prev, created]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Actualizar un post
  const updatePost = async (id: number | string, updated: Partial<Post>) => {
    try {
      const updatedPost = await service.updatePost(id, updated);
      if (updatedPost) {
        setPost((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
      }
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
    }
  };

  // Eliminar un post
  const deletePost = async (id: number | string) => {
    try {
      const success = await service.deletePost(id);
      if (success) {
        setPost((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
    }
  };

  return (
    <PostContext.Provider value={{ post, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};
