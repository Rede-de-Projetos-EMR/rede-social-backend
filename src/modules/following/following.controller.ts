import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Headers,
} from "@nestjs/common";
import { FollowingService } from "./following.service";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Following as FollowingEntity } from "./entities/following.entity";
import { IHeadersUser } from "src/interfaces/headersUser";

@Controller("following")
@ApiTags("Followings")
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @Post()
  @ApiOperation({ summary: "Criação do vínculo de seguidor" })
  @ApiCreatedResponse({ type: FollowingEntity })
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createFollowingDto: CreateFollowingDto,
    @Headers() user: IHeadersUser,
  ) {
    return this.followingService.create(
      createFollowingDto,
      user.authorization?.split(" ")[1],
    );
  }

  @Get("myfollowers")
  @ApiOperation({ summary: "Listagem dos seguidores do usuário" })
  @ApiOkResponse({ type: FollowingEntity })
  @UseGuards(JwtAuthGuard)
  findAllFollowers(@Headers() user: IHeadersUser) {
    return this.followingService.findAllFollowers(
      user.authorization?.split(" ")[1],
    );
  }

  @Get("myfollowings")
  @ApiOperation({ summary: "Listagem de quem o usuário está seguindo" })
  @ApiOkResponse({ type: FollowingEntity })
  @UseGuards(JwtAuthGuard)
  findAllFollowings(@Headers() user: IHeadersUser) {
    return this.followingService.findAllFollowings(
      user.authorization?.split(" ")[1],
    );
  }

  @HttpCode(204)
  @Delete(":id")
  @ApiOperation({ summary: "Deleção do vínculo de seguidor" })
  @ApiResponse({ description: "Sem retorno nesse método ;)" })
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.followingService.remove(id);
  }
}
