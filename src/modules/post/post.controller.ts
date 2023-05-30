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
  Headers,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";
import { Post as PostEntity } from "./entities/post.entity";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IHeadersUser } from "src/interfaces/headersUser";
import console from "console";

@Controller("post")
@ApiTags("Posts")
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @ApiOperation({ summary: "Criação de um post" })
  @ApiCreatedResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Headers() user: IHeadersUser) {
    return this.postService.create(createPostDto, user.authorization?.split(" ")[1]);
  }

  @Get()
  @ApiOkResponse({ type: PostEntity, isArray: true })
  @ApiOperation({ summary: "Listagem de posts" })
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query("page") page = "0",
    @Query("limit") limit = "10"
  ) {
    return this.postService.findAll(page, limit);
  }

  @Get(":id")
  @ApiOkResponse({ type: PostEntity })
  @ApiOperation({ summary: "Listagem de post com base no Id" })
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.postService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualização de um post" })
  @ApiOkResponse({ type: PostEntity })
  @UseGuards(JwtAuthGuard)
  update(@Param("id", ParseUUIDPipe) id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @HttpCode(204)
  @ApiOperation({ summary: "Deleção de um post" })
  @ApiResponse({ description: "Sem retorno nesse método ;)" })
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.postService.remove(id);
  }
}
