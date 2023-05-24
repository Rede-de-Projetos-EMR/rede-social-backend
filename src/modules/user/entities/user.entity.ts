import { randomUUID } from "crypto";
import { Exclude } from "class-transformer";

export class User {
  readonly id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  bio:string;
  avatarUrl: string;
  username: string;
  email: string;
  isActive: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  @Exclude()
  password: string;

  constructor(){
    this.id = randomUUID();
  }
}
