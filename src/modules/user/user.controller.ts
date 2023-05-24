import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User as UserEntity } from "./entities/user.entity";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("user")
@ApiTags("Users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "Criação de um usuário" })
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: "Listagem de usuários" })
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Listagem de usuário com base no Id" })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualização de um usuário" })
  @ApiOkResponse({ type: UserEntity })
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "Deleção de um usuário" })
  @ApiResponse({ description: "Sem retorno nesse método ;)" })
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.userService.remove(id);
  }
}
