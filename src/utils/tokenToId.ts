import { IDataDecode } from "src/interfaces/decode";
import jwt_decode from "jwt-decode";

export function tokenToId(token: string){
  const decode: IDataDecode = jwt_decode(token);
  const id = decode.sub;
  return id;
}