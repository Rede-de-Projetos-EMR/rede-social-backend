import { Comment } from "src/modules/comment/entities/comment.entity";

export interface ICommentWhithPost extends Comment {
  Post: {
    id: string;
    userId: string;
  };
}
