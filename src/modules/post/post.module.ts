import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PostRepository } from "./repositories/post.repository";
import { PostPrismaRepository } from "./repositories/prisma/prisma.repository";
import { FindPost } from "src/middlewares/post/findPost";
import { UniqueTitleVerification } from "src/middlewares/post/uniqueTitleVerification";
import { VerifyUserIdPermission } from "src/middlewares/post/verifyUserIdPermission";

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    PrismaService,
    {
      provide: PostRepository,
      useClass: PostPrismaRepository,
    },
  ],
})
export class PostModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FindPost).forRoutes("post/*");
    consumer
      .apply(VerifyUserIdPermission)
      .forRoutes(
        { path: "post/*", method: RequestMethod.PATCH },
        { path: "post/*", method: RequestMethod.DELETE },
      );
    consumer
      .apply(UniqueTitleVerification)
      .forRoutes(
        { path: "post", method: RequestMethod.POST },
        { path: "post/*", method: RequestMethod.PATCH },
      );
  }
}
