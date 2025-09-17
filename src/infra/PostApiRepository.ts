import axios from "axios";
import type { Post } from "../models/Post";
import type { IPostRepository } from "../repositories/IPostRepository";

export class PostApiRepository implements IPostRepository {
  private readonly api = "https://jsonplaceholder.typicode.com/posts";

  async create(post: Post): Promise<Post> {
    try {
      const response = await axios.post<Post>(this.api, post);
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async findById(id: number | string): Promise<Post | null> {
    try {
      const response = await axios.get<Post>(`${this.api}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching post by ID:", error);
      throw error;
    }
  }
  async findAll(): Promise<Post[]> {
    try {
      const response = await axios.get<Post[]>(this.api);
      return response.data;
    } catch (error) {
      console.error("Error fetching all posts:", error);
      throw error;
    }
  }
  async update(id: number | string, post: Partial<Post>): Promise<Post | null> {
    try {
      const response = await axios.put<Post>(`${this.api}/${id}`, post);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw error;
    }
  }
  async delete(id: number | string): Promise<void> {
    try {
      await axios.delete(`${this.api}/${id}`);
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
}
