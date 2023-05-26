import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { CommentRepository } from "./repositories/comment.repository";
import { CommentPrismaRepository } from "./repositories/prisma/prisma.repository";

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, {
    provide: CommentRepository,
    useClass: CommentPrismaRepository
  }]
})
export class CommentModule {}
