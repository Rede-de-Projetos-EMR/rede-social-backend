import { randomUUID } from "crypto";

export class Post {
  readonly id: string;
  title: string;
  content: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor() {
    this.id = randomUUID();
  }
}