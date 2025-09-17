// src/components/PostForm.tsx
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import type { Post } from "../models/Post";
import type { FormValues } from "../models/form";

export const PostForm = () => {
  const postContext = useContext(PostContext);

  if (!postContext) return <div>Contexto no disponible</div>;

  const { createPost } = postContext;

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const newPost: Post = {
      id: Date.now(), // ID temporal; la API real dará uno único
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    createPost(newPost);
    reset(); // Limpiar formulario
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

      <button type="submit">Crear Post</button>
    </form>
  );
};
