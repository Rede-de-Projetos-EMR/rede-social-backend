import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCommentDto } from "./create-comment.dto";
import { IsString, IsNotEmpty, MinLength } from "class-validator";

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty()
  @IsString({ message: "O 'content' deve ser uma String" })
  @IsNotEmpty({ message: "O 'content' não pode ser vazio" })
  @MinLength(2, { message: "Insira pelo menos uma palavra" })
  content: string;
}
