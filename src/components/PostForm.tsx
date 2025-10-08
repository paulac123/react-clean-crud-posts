// src/components/PostForm.tsx
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import type { FormValues } from "../models/form";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import { usePostContext } from "../context/PostContext";

export const PostForm = () => {
  const { createPost, updatePost, editPost, setEditPost } = usePostContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

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
    <Paper
      elevation={3}
      sx={{ p: 3, mb: 3, maxWidth: 800, margin: "30px auto" }}
    >
      <Typography variant="h6" sx={{ mb: 4 }}>
        {editPost ? "Editar Post" : "Nuevo Post"}
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 3 }}
      >
        <TextField
          label="Título"
          variant="outlined"
          fullWidth
          error={!!errors.title}
          helperText={errors.title ? "El título es requerido" : ""}
          InputLabelProps={{ shrink: true }}
          {...register("title", { required: true })}
        />

        <TextField
          label="Descripción"
          variant="outlined"
          fullWidth
          error={!!errors.description}
          helperText={errors.description ? "La descripción es requerida" : ""}
          {...register("description", { required: true })}
        />

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
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
