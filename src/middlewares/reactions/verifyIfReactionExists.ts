import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ReactionsRepository } from "src/modules/reactions/repositories/reactions.repository";

@Injectable()
export class VerifyIfReactionExists implements NestMiddleware {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const reactionId = req.params["0"];

    const findReaction = await this.reactionsRepository.findByReactionId(
      reactionId,
    );

    if (!findReaction) {
      throw new NotFoundException("Essa reação não existe");
    }

    next();
  }
}
