import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class Post {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly updatedAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}