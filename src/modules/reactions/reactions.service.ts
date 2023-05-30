import { Injectable } from "@nestjs/common";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { UpdateReactionDto } from "./dto/update-reaction.dto";
import { ReactionsRepository } from "./repositories/reactions.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class ReactionsService {
  constructor(private reactionsRepository: ReactionsRepository) { }

  async create(userToken: string, postId: string, createReactionDto: CreateReactionDto) {
    const userId: string = tokenToId(userToken);

    const createdReaction = await this.reactionsRepository.create(postId, userId, createReactionDto);

    return createdReaction;
  }

  async findByPostId(postId: string) {
    const reactions = await this.reactionsRepository.findByPostId(postId);

    return reactions;
  }

  async update(reactionId: string, updateReactionDto: UpdateReactionDto) {
    const findReaction = await this.reactionsRepository.findByReactionId(reactionId);

    const updatedReaction = await this.reactionsRepository.update(findReaction.id, updateReactionDto);

    return updatedReaction;
  }

  async remove(reactionId: string) {
    await this.reactionsRepository.remove(reactionId);
  }
}
