import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { FollowingRepository } from "./repositories/following.repository";
import { tokenToId } from "src/utils/tokenToId";

@Injectable()
export class FollowingService {
  constructor(private followingRepository: FollowingRepository) {}

  async create(createFollowingDto: CreateFollowingDto, token: string) {
    const followerId = tokenToId(token);

    const follow = await this.followingRepository.findFollow(
      createFollowingDto.followingId,
      followerId,
    );

    if (follow) {
      throw new ConflictException("Você já segue este usuário");
    }

    const newFollow = await this.followingRepository.create(
      createFollowingDto,
      followerId,
    );

    return newFollow;
  }

  async findAllFollowers(token: string) {
    const userId = tokenToId(token);

    const followers = await this.followingRepository.findAllFollowers(userId);

    return followers;
  }

  async findAllFollowings(token: string) {
    const userId = tokenToId(token);

    const followings = await this.followingRepository.findAllFollowings(userId);

    return followings;
  }

  async remove(id: string, token: string) {
    const userId = tokenToId(token);
    const follow = await this.followingRepository.findOne(id);

    if (!follow) {
      throw new NotFoundException("Esse vínculo de seguidor não existe");
    }

    if (userId !== follow.followerId) {
      throw new ForbiddenException("Você não pode acessar esses dados");
    }

    await this.followingRepository.remove(id);
  }
}
