import { Injectable } from "@nestjs/common";
import { CommentRepository } from "../comment.repository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "../../dto/create-comment.dto";
import { Comment } from "../../entities/comment.entity";

@Injectable()
export class CommentPrismaRepository implements CommentRepository{
  constructor(private prisma: PrismaService) {}
  
  async create(userId: string, data: CreateCommentDto, postId: string): Promise<Comment> {
    const comment = new Comment();
    Object.assign(comment, {...data});

    const newComment = await this.prisma.comment.create({
      data:  {
        ...comment,
        userId,
        postsId: postId,
      }
    });

    return newComment;
  }
  async findAll(): Promise<[] | Comment[]> {
    return await this.prisma.comment.findMany();
  }
  async findOne(id: string): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: {id}
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