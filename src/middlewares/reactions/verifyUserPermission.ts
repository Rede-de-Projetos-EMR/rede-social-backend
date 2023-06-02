import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ReactionsRepository } from "src/modules/reactions/repositories/reactions.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class VerifyUserPermission implements NestMiddleware {
  constructor(private reactionsRepository: ReactionsRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const userId = tokenToId(token);
    const reactionId = req.params["0"];

    const findReaction = await this.reactionsRepository.findByReactionId(
      reactionId,
    );

    if (findReaction.User.id !== userId) {
      throw new ForbiddenException("Você não pode acessar esses dados");
    }

    next();
  }
}
