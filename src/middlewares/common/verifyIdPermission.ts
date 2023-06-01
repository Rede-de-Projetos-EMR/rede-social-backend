import { Injectable, NestMiddleware, ForbiddenException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class VerifyIdPermission implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const decode: string = tokenToId(token);

    if (decode != req.params["0"]) {
      throw new ForbiddenException("Você não pode acessar esses dados");
    }

    next();
  }
}
