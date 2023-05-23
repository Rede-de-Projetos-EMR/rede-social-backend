import { hashSync } from "bcryptjs";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsDate()
  @IsNotEmpty()
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  bio: string;

  @IsString()
  @IsNotEmpty()
  avatarUrl: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @MaxLength(60)
  @IsNotEmpty()
  @Transform(({ value }: {value: string}) => hashSync(value, 10),{
    groups: ["transform"]
  })
  password: string;
}
