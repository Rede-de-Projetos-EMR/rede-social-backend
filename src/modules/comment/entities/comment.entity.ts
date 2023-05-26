import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class Comment {
  @ApiProperty()
  readonly id: string;

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
