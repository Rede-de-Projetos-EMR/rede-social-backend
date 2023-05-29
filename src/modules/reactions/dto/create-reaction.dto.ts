import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ReactionTypes } from "../enum/reactions.enum";

export class CreateReactionDto {
  @ApiProperty()
  @IsString({ message: "O 'type' deve ser uma String" })
  @IsNotEmpty({ message: "O 'type' não pode ser vazio" })
  @IsEnum(ReactionTypes)
  type: ReactionTypes;
}
