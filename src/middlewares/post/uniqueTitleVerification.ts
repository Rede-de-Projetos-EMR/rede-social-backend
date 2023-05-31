import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { PostRepository } from "src/modules/post/repositories/post.repository";
import jwt_decode from "jwt-decode";
import { IDataDecode } from "src/interfaces/decode";

@Injectable()
export class UniqueTitleVerification implements NestMiddleware {
  constructor(private postRepository: PostRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const { title, content } = req.body;

    if (!title || !content) {
      return next();
    }

    const decode: IDataDecode = jwt_decode(token);

    const findPost = await this.postRepository.findByTitle(decode.sub, title);

    if (findPost) {
      throw new ConflictException("Você já criou um post com esse título");
    }

    next();
  }
}
