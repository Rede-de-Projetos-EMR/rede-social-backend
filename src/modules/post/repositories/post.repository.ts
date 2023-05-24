import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { Post } from "../entities/post.entity";

export abstract class PostRepository {
  abstract create(data: CreatePostDto): Promise<Post>;
  abstract findAll(): Promise<Post[]>;
  abstract findOne(id: string): Promise<Post>;
  abstract findByTitle(id: string, title: string): Promise<Post | null>;
  abstract update(id: string, data: UpdatePostDto): Promise<Post>;
  abstract remove(id: string): Promise<void>;
}