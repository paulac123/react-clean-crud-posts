import { useState, useEffect, createContext } from "react";
import type { Post, PostContextType } from "../models/Post";
import type { Props } from "../models/commin";
import type { Notification } from "../models/notifications";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import type { FormValues } from "../models/form";
import { PostService } from "../services/postsService";
import { PostApiRepository } from "../infra/PostApiRepository";
import type { AlertColor } from "@mui/material";
import { useContext } from "react";

// Instanciamos repository y service
const repository = new PostApiRepository();
const service = new PostService(repository);

// Creamos el contexto
export const PostContext = createContext<PostContextType | undefined>(
  undefined
);

export const usePostContext = () => {
  const ctx = useContext(PostContext);
  if (!ctx)
    throw new Error("usePostContext debe usarse dentro de PostProvider");
  return ctx;
};

export const PostProvider = ({ children }: Props) => {
  const [post, setPost] = useState<Post[]>([]);
  const [editPost, setEditPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appNotification, setAppNotification] = useState<Notification | null>(
    null
  );

  const notify = (msg: string, severity: AlertColor) => {
    setAppNotification({ message: msg, severity });
  };

  // Traer posts al iniciar
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await service.getAllPosts();
        setPost(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Crear un post
  const createPost = async (data: FormValues) => {
    try {
      setLoading(true);
      setError(null);
      // El contexto completa los campos que el form no da
      const newPost: Post = {
        id: Date.now(), // ⚡ generar id aquí
        title: data.title,
        description: data.description,
        createdAt: new Date(),
      };
      const created = await service.createPost(newPost);
      if (created) {
        setPost((prev) => [...prev, created]);
        notify("¡Post creado correctamente!", "success");
      } else {
        notify("Error al crear el post", "error");
      }
    } catch (error) {
      setError("Error creando el post");
      console.error("Error creating post:", error);
      notify("Error al crear el post", "error");
    } finally {
      setLoading(false);
    }
  };

  // Actualizar un post
  const updatePost = async (id: number | string, updated: Partial<Post>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedPost = await service.updatePost(id, updated);
      if (updatedPost) {
        setPost((prev) => prev.map((p) => (p.id === id ? updatedPost : p)));
        notify("¡Post actualizado correctamente!", "success");
      }
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un post
  const deletePost = async (id: number | string) => {
    try {
      setLoading(true);
      setError(null);
      const success = await service.deletePost(id);
      if (success) {
        setPost((prev) => prev.filter((p) => p.id !== id));
        notify("¡Post eliminado correctamente!", "success");
      }
    } catch (error) {
      setError("Error eliminando el post");
      console.error(`Error deleting post ${id}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        post,
        createPost,
        updatePost,
        deletePost,
        editPost,
        setEditPost,
        appNotification,
        setAppNotification,
        notify,
        loading,
        error,
        setLoading,
        setError,
      }}
    >
      {children}
      {appNotification && (
        <Snackbar
          open
          autoHideDuration={3000}
          onClose={() => setAppNotification(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setAppNotification(null)}
            severity={appNotification.severity}
            variant="filled"
          >
            {appNotification.message}
          </Alert>
        </Snackbar>
      )}
    </PostContext.Provider>
  );
};
