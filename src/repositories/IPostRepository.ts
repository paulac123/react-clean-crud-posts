import type { Post } from "../models/Post";

export interface IPostRepository {
  create(post: Post): Promise<Post>;
  findById(id: number | string): Promise<Post | null>;
  findAll(): Promise<Post[]>;
  update(id: number | string, post: Partial<Post>): Promise<Post | null>;
  delete(id: number | string): Promise<void>;
}
