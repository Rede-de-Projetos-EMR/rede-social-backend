import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { CommentRepository } from "src/modules/comment/repositories/comment.repository";

@Injectable()
export class CommentExist implements NestMiddleware {
  constructor(private commentRepository: CommentRepository){}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const idComment = req.params["0"];
    const findComment = await this.commentRepository.findOne(idComment);

    if (!findComment) {
      throw new NotFoundException("Comentário não existe!");
    }

    next();

  } 
}
