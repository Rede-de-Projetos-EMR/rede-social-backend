import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { IDataDecode } from "src/interfaces/decode";
import jwt_decode from "jwt-decode";
import { PostRepository } from "src/modules/post/repositories/post.repository";

@Injectable()
export class VerifyUserIdPermission implements NestMiddleware {
  constructor(private postRepository: PostRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const decode: IDataDecode = jwt_decode(token);

    const findPost = await this.postRepository.findOne(req.params["0"]);

    if (decode.sub != findPost.User.id) {
      throw new ConflictException("Você não pode acessar esses dados");
    }

    next();
  }
}
