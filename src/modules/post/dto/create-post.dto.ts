import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
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
