import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentRepository } from "./repositories/comment.repository";
import { CommentPrismaRepository } from "./repositories/prisma/prisma.repository";
import { CommentOwner } from "src/middlewares/comment/commentOwner";
import { CommentOwnerAndPostOwner } from "src/middlewares/comment/commentOwnerAndPostOwner";
import { FindPost } from "src/middlewares/post/findPost";
import { PostRepository } from "../post/repositories/post.repository";
import { PostPrismaRepository } from "../post/repositories/prisma/prisma.repository";

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    PrismaService,
    {
      provide: CommentRepository,
      useClass: CommentPrismaRepository,
    },
    {
      provide: PostRepository,
      useClass: PostPrismaRepository,
    },
  ],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FindPost)
      .forRoutes(
        { path: "comment/*", method: RequestMethod.POST },
        { path: "comment/*", method: RequestMethod.GET },
      );
    consumer
      .apply(CommentOwner)
      .forRoutes({ path: "comment/*", method: RequestMethod.PATCH });
    consumer
      .apply(CommentOwnerAndPostOwner)
      .forRoutes({ path: "comment/*", method: RequestMethod.DELETE });
  }
}
