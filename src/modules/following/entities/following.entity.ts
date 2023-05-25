import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class Following {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  followingId: string;

  @ApiProperty()
  readonly since: Date;

  constructor() {
    this.id = randomUUID();
  }
}
