import { ConflictException, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { IDataDecode } from "src/interfaces/decode";
import jwt_decode from "jwt-decode";

@Injectable()
export class VerifyIdPermission implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization.split(" ")[1];
    const decode: IDataDecode = jwt_decode(token);

    if(decode.sub != req.params["0"]){
      throw new ConflictException("Você não pode acessar esses dados");
    }
    next();
  }
}
