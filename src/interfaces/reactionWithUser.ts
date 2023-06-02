import { Reaction } from "src/modules/reactions/entities/reaction.entity";

export interface IReactionWithUser extends Reaction {
  User: {
    id: string;
  };
}
