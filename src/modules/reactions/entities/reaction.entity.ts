import { randomUUID } from "crypto";

export class Reaction {
  readonly id: string;
  type: string;
  postId: string;

  constructor() {
    this.id = randomUUID();
  }
}
