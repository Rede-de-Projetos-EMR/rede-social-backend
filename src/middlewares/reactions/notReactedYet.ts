import { Injectable, NestMiddleware, ConflictException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ReactionsRepository } from "src/modules/reactions/repositories/reactions.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class NotReactedYet implements NestMiddleware {
  constructor(private reactionsRepository: ReactionsRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const userId = tokenToId(token);
    const postId = req.params.id;

    const findReaction = await this.reactionsRepository.findOne(userId, postId);

    if (!findReaction) {
      throw new ConflictException("Você não reagiu a esse post");
    }

    next();
  }
}
