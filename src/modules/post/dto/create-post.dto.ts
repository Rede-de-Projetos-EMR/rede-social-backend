import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @ApiProperty()
  @IsString({ message: "O título precisa ser uma string" })
  @IsNotEmpty({ message: "O título não pode ser vazio" })
  @MinLength(2, { message: "Insira pelo menos uma palavra" })
  title: string;

  @ApiProperty()
  @IsString({ message: "O conteúdo precisa ser uma string" })
  @IsNotEmpty({ message: "O conteúdo não pode ser vazio" })
  content: string;

  @ApiProperty()
  userId: "ac68849b-52e3-4698-8450-02a47c4a0adb";

  @ApiProperty()
  @IsArray()
  reactions?: any;
}
