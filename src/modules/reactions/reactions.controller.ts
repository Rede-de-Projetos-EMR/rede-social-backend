import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Headers } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { UpdateReactionDto } from "./dto/update-reaction.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { IHeadersUser } from "src/interfaces/headersUser";

@Controller("reactions")
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) { }

  @Post(":id")
  @UseGuards(JwtAuthGuard)
  create(@Param("id") id: string, @Headers() user: IHeadersUser, @Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(id, user.authorization?.split(" ")[1], createReactionDto);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.reactionsService.findByPostId(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.update(id, updateReactionDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.reactionsService.remove(id);
  }
}
