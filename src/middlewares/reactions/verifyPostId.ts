import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PostRepository } from "src/modules/post/repositories/post.repository";

@Injectable()
export class VerifyPostId implements NestMiddleware {
  constructor(private postRepository: PostRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const postId = req.body.id;

    if (!postId) {
      throw new BadRequestException("Você não passou um id válido!");
    }

    const findPost = await this.postRepository.findOne(postId);

    if (!findPost) {
      throw new NotFoundException("O post não foi encontrado");
    }

    next();
  }
}