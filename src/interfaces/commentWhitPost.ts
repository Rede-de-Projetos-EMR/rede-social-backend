import { Comment } from "src/modules/comment/entities/comment.entity";

export interface ICommentWhithPost extends Comment {
  Posts:{
    id: string,
    userId: string,
  }
}