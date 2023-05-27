import { Injectable, NestMiddleware, NotAcceptableException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { CommentRepository } from "src/modules/comment/repositories/comment.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class CommentOwnerAndPostOwner implements NestMiddleware {
  constructor(private commentRepository: CommentRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }
    
    const decode: string = tokenToId(token);
    const idComment = req.params["0"]; 
    const findComment = await this.commentRepository.findOne(idComment);    
  
    if (!findComment) {
      return next();
    }

    if(decode != findComment.userId && decode != findComment.Posts.userId){
      throw new NotAcceptableException("Você não tem permissão");
    }

    next();
  }
}