import { CreateReactionDto } from "../dto/create-reaction.dto";
import { UpdateReactionDto } from "../dto/update-reaction.dto";
import { Reaction } from "../entities/reaction.entity";

export abstract class ReactionsRepository {
  abstract create(postId: string, userId: string, data: CreateReactionDto): Promise<Reaction>;
  abstract findByPostId(postId: string): Promise<Reaction[]>;
  abstract findOne(userId: string, postId: string): Promise<Reaction>;
  abstract findByReactionId(reactionId: string): Promise<Reaction>;
  abstract update(reactionId: string, data: UpdateReactionDto): Promise<Reaction>;
  abstract remove(reactionId: string): Promise<void>;
}