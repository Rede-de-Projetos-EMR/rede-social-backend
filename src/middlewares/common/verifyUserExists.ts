import { NotFoundException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user.repositorie";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class VerifyUserExists implements NestMiddleware {
  constructor(private userRepository: UserRepository) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const findUser = await this.userRepository.findOne(req.params["0"]);

    if (!findUser) {
      throw new NotFoundException("Usuário não foi encontrado");
    }

    next();
  }
}
