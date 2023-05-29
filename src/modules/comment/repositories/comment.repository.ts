import { ICommentWhithPost } from "src/interfaces/commentWhitPost";
import { CreateCommentDto } from "../dto/create-comment.dto";
import { Comment } from "../entities/comment.entity";

export abstract class CommentRepository {
  abstract create(userId: string, data: CreateCommentDto, postId: string): Promise<Comment>
  abstract findAll(): Promise<Comment[] | []>
  abstract findOne(id: string): Promise<ICommentWhithPost>
  abstract update(id:string, data: CreateCommentDto): Promise<Comment | undefined>
  abstract remove(id: string): Promise<void>
}