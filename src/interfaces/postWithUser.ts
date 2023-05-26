import { Post } from "src/modules/post/entities/post.entity";

export interface IPostWithUser extends Post {
  User: {
    id: string,
    username: string,
    avatarUrl: string,
  }
}