import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, Headers, } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IHeadersUser } from "src/interfaces/headersUser";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCommentDto: CreateCommentDto, @Headers() user: IHeadersUser) {
    return this.commentService.create(createCommentDto, user.authorization?.split(" ")[1]);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.commentService.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @HttpCode(204)
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.commentService.remove(id);
  }
}
