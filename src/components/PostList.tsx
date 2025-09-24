import { useContext, useState } from "react";
import { PostContext } from "../context/PostContext";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import type { Post } from "../models/Post";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

export const PostList = () => {
  const postContext = useContext(PostContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<number | string | null>(null);

  if (!postContext) return null;

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
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(params.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => setEditPost(params.row as Post)}
        />,
      ],
    },
  ];

  return (
    <>
      {/* Contenedor con position:relative para poner el spinner encima */}
      <div style={{ height: 400, width: "100%", position: "relative" }}>
        {/*  Mostrar loader encima de la tabla */}
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </div>
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
      </div>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>¿Seguro que quieres eliminar este post?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
