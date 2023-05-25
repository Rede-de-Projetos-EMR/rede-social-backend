import { NotFoundException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PostRepository } from "src/modules/post/repositories/post.repository";

@Injectable()
export class FindPost implements NestMiddleware {
  constructor(private postRepository: PostRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const findPost = await this.postRepository.findOne(req.params["0"]);

    if (!findPost) {
      throw new NotFoundException("Não foi possível encontrar um post com esse id");
    }

    next();
  }
}