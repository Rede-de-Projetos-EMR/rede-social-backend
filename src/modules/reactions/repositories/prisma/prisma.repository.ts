import { PrismaService } from "src/prisma/prisma.service";
import { CreateReactionDto } from "../../dto/create-reaction.dto";
import { UpdateReactionDto } from "../../dto/update-reaction.dto";
import { Reaction } from "../../entities/reaction.entity";
import { ReactionsRepository } from "../reactions.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ReactionsPrismaRepository implements ReactionsRepository {
  constructor(private prisma: PrismaService) { }

  async create(postId: string, userId: string, data: CreateReactionDto): Promise<any> {
    const reaction = new Reaction();
    Object.assign(reaction, { ...data });

    const newReaction = await this.prisma.reaction.create({
      data: {
        ...reaction,
        postId,
        userId
      }
    });

    return newReaction;
  }

  async findByPostId(postId: string): Promise<any[]> {
    const findReactions = await this.prisma.reaction.findMany({
      where: {
        postId
      }
    });

    return findReactions;
  }

  async findOne(userId: string, postId: string): Promise<any> {
    const findReaction = await this.prisma.reaction.findFirst({
      where: {
        userId,
        postId,
      }
    });

    return findReaction;
  }

  async findByReactionId(reactionId: string): Promise<any> {
    const findReaction = await this.prisma.reaction.findUnique({
      where: {
        id: reactionId
      }
    });

    return findReaction;
  }

  async update(reactionId: string, data: UpdateReactionDto): Promise<any> {
    const updateReaction = await this.prisma.reaction.update({
      where: {
        id: reactionId,
      },
      data
    });

    return updateReaction;
  }

  async remove(reactionId: string): Promise<void> {
    await this.prisma.reaction.delete({
      where: {
        id: reactionId
      }
    });
  }
}