import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentRepository {
  abstract create(userId: string, data: CreateCommentDto): Promise<Comment>
  abstract findAll(): Promise<Comment[] | []>
  abstract findOne(id: string): Promise<Comment[] | undefined>
  abstract update(id:string, data: CreateCommentDto): Promise<Comment | undefined>
  abstract remove(id: string): Promise<void>
}