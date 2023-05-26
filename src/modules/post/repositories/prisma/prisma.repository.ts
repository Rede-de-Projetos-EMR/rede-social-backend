import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "../../dto/create-post.dto";
import { UpdatePostDto } from "../../dto/update-post.dto";
import { Post } from "../../entities/post.entity";
import { PostRepository } from "../post.repository";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PostPrismaRepository implements PostRepository {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreatePostDto): Promise<Post> {
    const post = new Post();
    Object.assign(post, { ...data });

    const newPost = await this.prisma.post.create({
      data: {
        ...post,
        userId,
      },
    });

    return newPost;
  }
  async findAll(): Promise<any[]> {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        comments: true,
        reactions: true,
        User: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return posts;
  }
  async findOne(id: string): Promise<any> {
    const posts = await this.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        comments: true,
        reactions: true,
        User: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
      },
    });

    return posts;
  }
  async findByTitle(id: string, title: string): Promise<Post | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        userId: id,
        title,
      },
      include: {
        comments: true,
        reactions: true,
      }
    });

    return post;
  }
  async update(id: string, data: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.prisma.post.update({
      where: {
        id,
      },
      data,
    });

    return updatedPost;
  }
  async remove(id: string): Promise<void> {
    await this.prisma.post.delete({
      where: {
        id,
      },
    });

    return;
  }
}
