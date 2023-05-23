import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsString({ message: "O título precisa ser uma string" })
  @IsNotEmpty({ message: "O título não pode ser vazio" })
  @MinLength(2, { message: "Insira pelo menos uma palavra" })
  title: string;

  @ApiProperty()
  @IsString({ message: "O conteúdo precisa ser uma string" })
  @IsNotEmpty({ message: "O conteúdo não pode ser vazio" })
  content: string;
}
