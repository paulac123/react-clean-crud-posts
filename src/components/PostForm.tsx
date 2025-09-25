// src/components/PostForm.tsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { FormValues } from "../models/form";
import { Box, TextField, Button, Paper } from "@mui/material";
import { usePostContext } from "../context/PostContext";

export const PostForm = () => {
  const { createPost, updatePost, editPost, setEditPost } = usePostContext();

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

  const handleCreate = async (data: FormValues) => {
    await createPost(data);
  };

  const handleUpdate = async (id: number | string, data: FormValues) => {
    await updatePost(id, data);
    setEditPost(null); // salir del modo edición
  };

  const onSubmit = async (data: FormValues) => {
    if (editPost) {
      await handleUpdate(editPost.id, data);
    } else {
      await handleCreate(data);
    }
    reset(); // limpiar formulario
  };

  return (
    // ✅ Paper da un fondo con sombra y borde redondeado
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          {...register("title", { required: true })}
        />

        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          {...register("description", { required: true })}
        />

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            {editPost ? "Actualizar Post" : "Crear Post"}
          </Button>
          {editPost && (
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={() => {
                reset();
                setEditPost(null);
              }}
            >
              Cancelar
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};
