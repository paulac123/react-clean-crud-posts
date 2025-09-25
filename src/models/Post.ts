import type React from "react";
import type { AlertColor } from "@mui/material";
import type { Notification as AppNotification } from "./Notifications";
import type { FormValues } from "./form";

export interface Post {
  id: number;
  title: string;
  description: string;
  createdAt: Date;
}

export interface PostContextType {
  post: Post[];
  createPost: (newPost: FormValues) => Promise<void>;
  updatePost: (id: number | string, data: FormValues) => Promise<void>;
  deletePost: (id: number | string) => Promise<void>;
  editPost: Post | null;
  setEditPost: React.Dispatch<React.SetStateAction<Post | null>>;
  appNotification: AppNotification | null;
  setAppNotification: (n: AppNotification | null) => void;
  notify: (msg: string, severity: AlertColor) => void;
  loading: boolean;
  error: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}
