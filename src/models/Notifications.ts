import type { AlertColor } from "@mui/material";

export type Notification = {
  message: string;
  severity: AlertColor; // "success" | "error" | "info" | "warning"
};
