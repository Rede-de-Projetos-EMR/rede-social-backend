import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../comment.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Comment } from "../../entities/comment.entity";

@Injectable()
export class CommentPrismaRepository implements CommentRepository {
  constructor(private prisma: PrismaService) { }

  async create(userId: string, data: CreateCommentDto, postId: string): Promise<Comment> {
    const comment = new Comment();
    Object.assign(comment, { ...data });

    const newComment = await this.prisma.comment.create({
      data: {
        ...comment,
        userId,
        postId,
      }
    });

    return newComment;
  }
  async findAll(): Promise<Comment[] | []> {
    return await this.prisma.comment.findMany();
  }
  async findOne(id: string): Promise<any> {
<<<<<<< HEAD
    const comment = await this.prisma.post.findUnique({
      where: { 
        id,
      },
      select: {
        comments: true
=======
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        createdAt: true,
        id: true,
        postId: true,
        updatedAt: true,
        userId: true,
        Post: {
          select: {
            id: true,
            userId: true,
          }
        }
>>>>>>> 61ba18ea2c1c6488e071629ad0796e017899b43b
      }
    });
    return comment;
  }
  async update(id: string, data: CreateCommentDto): Promise<Comment> {
    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data,
    });

    return updatedComment;
  }
  async remove(id: string): Promise<void> {
    await this.prisma.comment.delete({
      where: { id }
    });
  }
}