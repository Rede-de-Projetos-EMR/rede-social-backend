import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateReactionDto } from "./create-reaction.dto";
import { IsEnum, IsNotEmpty } from "class-validator";
import { ReactionTypes } from "../enum/reactions.enum";

export class UpdateReactionDto extends PartialType(CreateReactionDto) {
  @ApiProperty()
  @IsNotEmpty({ message: "O 'type' não pode ser vazio" })
  @IsEnum(ReactionTypes)
  type: ReactionTypes;
}
