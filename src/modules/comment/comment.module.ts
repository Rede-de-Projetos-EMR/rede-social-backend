import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentRepository } from "./repositories/comment.repository";
import { CommentPrismaRepository } from "./repositories/prisma/prisma.repository";
import { CommentOwner } from "src/middlewares/comment/commentOwner";
import { CommentOwnerAndPostOwner } from "src/middlewares/comment/commentOwnerAndPostOwner";

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, {
    provide: CommentRepository,
    useClass: CommentPrismaRepository
  }]
})
export class CommentModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CommentOwner).forRoutes({path: "comment/*", method: RequestMethod.PATCH});
    consumer.apply(CommentOwnerAndPostOwner).forRoutes({path: "comment/*", method: RequestMethod.DELETE});
  }
}
