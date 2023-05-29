import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { UpdateReactionDto } from "./dto/update-reaction.dto";
import { ReactionsRepository } from "./repositories/reactions.repository";

@Injectable()
export class ReactionsService {
  constructor(private reactionsRepository: ReactionsRepository) { }

  async create(userId: string, postId: string, createReactionDto: CreateReactionDto) {
    const findReaction = await this.reactionsRepository.findOne(userId, createReactionDto.postId);

    if (findReaction) {
      throw new ConflictException("Você já reagiu esse post");
    }

    const createdReaction = await this.reactionsRepository.create(postId, createReactionDto);

    return createdReaction;
  }

  async findByPostId(postId: string) {
    const reactions = await this.reactionsRepository.findByPostId(postId);

    return reactions;
  }

  async update(reactionId: string, updateReactionDto: UpdateReactionDto) {
    const findReaction = await this.reactionsRepository.findByReactionId(reactionId);

    if (!findReaction) {
      throw new NotFoundException("Você ainda não reagiu a esse post");
    }

    const updatedReaction = await this.reactionsRepository.update(findReaction.id, updateReactionDto);

    return updatedReaction;
  }

  async remove(reactionId: string) {
    const findReaction = await this.reactionsRepository.findByReactionId(reactionId);

    if (!findReaction) {
      throw new NotFoundException("Você ainda não reagiu a esse post");
    }

    await this.reactionsRepository.remove(reactionId);
  }
}
