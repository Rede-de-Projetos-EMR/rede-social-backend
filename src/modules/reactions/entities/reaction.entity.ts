import { randomUUID } from "crypto";
import { ApiProperty } from "@nestjs/swagger";
import { ReactionTypes } from "../enum/reactions.enum";

export class Reaction {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  type: ReactionTypes;

  constructor() {
    this.id = randomUUID();
  }
}
