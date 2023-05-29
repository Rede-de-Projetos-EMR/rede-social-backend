import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { UserRepository } from "src/modules/user/repositories/user.repositorie";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class VerifyUniqueUserData implements NestMiddleware {
  constructor(private usersRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.body.email && req.body.username) {
      const findEmail = await this.usersRepository.findEmail(req.body.email);
      const findUsername = await this.usersRepository.findUsername(
        req.body.username,
      );

      if (findEmail && findUsername) {
        throw new ConflictException("Email e Username já existem");
      }
    }

    if (req.body.email) {
      const findEmail = await this.usersRepository.findEmail(req.body.email);

      if (findEmail) {
        throw new ConflictException("Email já existe");
      }
    }

    if (req.body.username) {
      const findUsername = await this.usersRepository.findUsername(
        req.body.username,
      );

      if (findUsername) {
        throw new ConflictException("Username já existe");
      }
    }

    next();
  }
}
