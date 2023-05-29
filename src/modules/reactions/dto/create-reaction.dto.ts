import { ApiProperty } from "@nestjs/swagger";
import { ReactionTypes } from "../enum/type.enum";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateReactionDto {
  @ApiProperty()
  @IsString({ message: "O 'type' deve ser uma String" })
  @IsNotEmpty({ message: "O 'type' não pode ser vazio" })
  type: ReactionTypes;

  @ApiProperty()
  @IsNotEmpty({ message: "O 'postId' não pode ser vazio" })
  @IsUUID()
  postId: string;
}
