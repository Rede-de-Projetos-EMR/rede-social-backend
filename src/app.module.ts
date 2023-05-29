import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { PostModule } from "./modules/post/post.module";
import { AuthModule } from "./modules/auth/auth.module";
import { FollowingModule } from "./modules/following/following.module";
import { CommentModule } from './modules/comment/comment.module';
import { ReactionsModule } from './modules/reactions/reactions.module';

@Module({
  imports: [UserModule, PostModule, AuthModule, FollowingModule, CommentModule, ReactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
