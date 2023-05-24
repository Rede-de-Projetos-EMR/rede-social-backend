import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { PostModule } from "./modules/post/post.module";
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, PostModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
