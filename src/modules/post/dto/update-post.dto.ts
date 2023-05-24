import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsString({ message: "O 'title' deve ser uma String" })
  @IsNotEmpty({ message: "O 'title' não pode ser vazio" })
  @MinLength(2, { message: "Insira pelo menos uma palavra" })
  title: string;

  @ApiProperty()
  @IsString({ message: "O 'content' deve ser uma String" })
  @IsNotEmpty({ message: "O 'content' não pode ser vazio" })
  content: string;
}
