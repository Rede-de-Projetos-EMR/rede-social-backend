import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { PostModule } from "./modules/post/post.module";

@Module({
  imports: [UserModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
