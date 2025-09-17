import type { Post } from "../models/Post";
import type { IPostRepository } from "../repositories/IPostRepository";

export class PostService {
  private repository: IPostRepository;

  constructor(repository: IPostRepository) {
    this.repository = repository;
  }

  // Traer todos los posts
  async getAllPosts(): Promise<Post[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      console.error("Error fetching all posts:", error);
      return [];
    }
  }

  // Traer un post por ID
  async getPostById(id: number | string): Promise<Post | null> {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      console.error(`Error fetching post with ID ${id}:`, error);
      return null;
    }
  }

  async createPost(post: Post): Promise<Post | null> {
    try {
      return await this.repository.create(post);
    } catch (error) {
      console.error("Error creating post:", error);
      return null;
    }
  }

  async updatePost(
    id: number | string,
    post: Partial<Post>
  ): Promise<Post | null> {
    try {
      return await this.repository.update(id, post);
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      return null;
    }
  }
  async deletePost(id: number | string): Promise<boolean> {
    try {
      await this.repository.delete(id);
      return true;
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      return false;
    }
  }
}
