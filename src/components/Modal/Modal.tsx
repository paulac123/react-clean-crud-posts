import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import type { ConfirmDialogProps } from "../../models/ConfirmDialogProps";

export const ConfirmDialog = ({
  open,
  title,
  onClose,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onConfirm} color="error">
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
