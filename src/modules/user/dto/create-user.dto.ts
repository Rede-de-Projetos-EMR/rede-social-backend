import { ApiProperty } from "@nestjs/swagger";
import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString({ message: "O 'firstName' deve ser uma String" })
  @IsNotEmpty({ message: "O 'firstName' não pode ser vazio" })
  @ApiProperty()
  firstName: string;

  @IsString({ message: "O 'lastName' deve ser uma String" })
  @IsNotEmpty({ message: "O 'lastName' não pode ser vazio" })
  @ApiProperty()
  lastName: string;

  @IsString({ message: "O 'birthDate' deve ser uma String" })
  @IsNotEmpty({ message: "O 'birthDate' não pode ser vazio" })
  @ApiProperty()
  birthDate: string;

  @IsString({ message: "O 'country' deve ser uma String" })
  @IsNotEmpty({ message: "O 'country' não pode ser vazio" })
  @ApiProperty()
  country: string;

  @IsString({ message: "O 'bio' deve ser uma String" })
  @IsNotEmpty({ message: "O 'bio' não pode ser vazio" })
  @ApiProperty()
  bio: string;

  @IsString({ message: "O 'avatarUrl' deve ser uma String" })
  @IsNotEmpty({ message: "O 'avatarUrl' não pode ser vazio" })
  @ApiProperty()
  avatarUrl: string;

  @IsString({ message: "O 'username' deve ser uma String" })
  @IsNotEmpty({ message: "O 'username' não pode ser vazio" })
  @ApiProperty()
  username: string;

  @IsString({ message: "O 'email' deve ser uma String" })
  @IsNotEmpty({ message: "O 'email' não pode ser vazio" })
  @ApiProperty()
  email: string;

  @MinLength(8, { message: "'password' mínimo de 8 caracteres" })
  @MaxLength(60, { message: "'password' máximo de 60 caracteres" })
  @IsNotEmpty({ message: "O 'password' não pode ser vazio" })
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ["transform"]
  })
  password: string;
}
