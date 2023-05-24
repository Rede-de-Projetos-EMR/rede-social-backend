import { randomUUID } from "crypto";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  birthDate: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  @Exclude()
  password: string;

  constructor() {
    this.id = randomUUID();
  }
}
