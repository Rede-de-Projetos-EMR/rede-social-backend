import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateReactionDto } from "./create-reaction.dto";
import { IsString, IsNotEmpty, IsUUID } from "class-validator";
import { ReactionTypes } from "../enum/type.enum";

export class UpdateReactionDto extends PartialType(CreateReactionDto) {
  @ApiProperty()
  @IsString({ message: "O 'type' deve ser uma String" })
  @IsNotEmpty({ message: "O 'type' não pode ser vazio" })
  type: ReactionTypes;

  @ApiProperty()
  @IsNotEmpty({ message: "O 'postId' não pode ser vazio" })
  @IsUUID()
  postId: string;
}
