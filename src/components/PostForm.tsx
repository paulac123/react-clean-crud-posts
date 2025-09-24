// src/components/PostForm.tsx
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { PostContext } from "../context/PostContext";
import type { Post } from "../models/Post";
import type { FormValues } from "../models/form";

export const PostForm = () => {
  const postContext = useContext(PostContext);

  const { createPost, updatePost, editPost, setEditPost } = postContext;

  const { register, handleSubmit, reset } = useForm<FormValues>();

  // 👇 Cargar valores al formulario cuando editPost cambie
  useEffect(() => {
    if (editPost) {
      reset({
        title: editPost.title,
        description: editPost.description,
      });
    }
  }, [editPost, reset]);

  const onSubmit = (data: FormValues) => {
    if (editPost) {
      // Modo edición
      updatePost(editPost.id, data);
      setEditPost(null); // salir del modo edición
    } else {
      // Modo creación
      const newPost: Post = {
        id: Date.now(), // temporal, normalmente lo da la API
        title: data.title,
        description: data.description,
        createdAt: new Date(),
      };
      createPost(newPost);
    }

    reset(); // limpiar formulario
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "20px" }}>
      <div>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          {...register("title", { required: true })}
          placeholder="Escribe el título"
        />
      </div>

      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          {...register("description", { required: true })}
          placeholder="Escribe la descripción"
        />
      </div>

      <button type="submit">
        {editPost ? "Actualizar Post" : "Crear Post"}
      </button>
      {editPost && (
        <button
          type="button"
          onClick={() => {
            reset();
            setEditPost(null);
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};
