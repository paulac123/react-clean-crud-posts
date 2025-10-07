import { useState } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Tooltip } from "@mui/material";
import type { Post } from "../models/Post";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { ConfirmDialog } from "./Modal/Modal";
import { usePostContext } from "../context/PostContext";

export const PostList = () => {
  const postContext = usePostContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  const { post, setEditPost, loading, error } = postContext;

  // Mapea los posts del contexto a las filas del DataGrid
  const rows = post.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
  }));

  const handleDeleteClick = (id: number | string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedId !== null) await postContext.deletePost(selectedId);
    setOpenDialog(false);
    setSelectedId(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      getActions: (params) => [
        <Tooltip title="Delete">
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
          />
        </Tooltip>,
        <Tooltip title="Edit">
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={() => setEditPost(params.row as Post)}
          />
        </Tooltip>,
      ],
    },
  ];

  return (
    <>
      <Box sx={{ height: 400, width: "100%", position: "relative" }}>
        {/*  Mostrar loader encima de la tabla */}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/*  Mostrar error si existe */}
        {error && <Alert severity="error">{error}</Alert>}

        {/*  Mostrar tabla solo cuando no está cargando ni con error */}
        {!loading && !error && (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 5, page: 0 } },
            }}
            pageSizeOptions={[5, 10, 20]}
            pagination
          />
        )}
      </Box>
      <ConfirmDialog
        open={openDialog}
        title="¿Seguro que quieres eliminar este post?"
        onClose={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};
