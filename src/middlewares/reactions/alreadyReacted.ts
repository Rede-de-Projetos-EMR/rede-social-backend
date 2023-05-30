import { Injectable, NestMiddleware, ConflictException, BadRequestException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ReactionsRepository } from "src/modules/reactions/repositories/reactions.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class AlreadyReacted implements NestMiddleware {
  constructor(private reactionsRepository: ReactionsRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const userId = tokenToId(token);
    const postId = req.params["0"];

    if (!postId) {
      throw new BadRequestException("Você não passou um id válido!");
    }

    const findReaction = await this.reactionsRepository.findOne(userId, postId);

    if (findReaction) {
      throw new ConflictException("Você já reagiu esse post");
    }

    next();
  }
}
