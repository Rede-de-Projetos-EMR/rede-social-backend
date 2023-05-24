import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { PostRepository } from "./repositories/post.repository";
import { PostPrismaRepository } from "./repositories/prisma/prisma.repository";

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, {
    provide: PostRepository,
    useClass: PostPrismaRepository
  }]
})
export class PostModule { }
