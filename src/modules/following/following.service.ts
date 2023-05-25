import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateFollowingDto } from "./dto/create-following.dto";
import { FollowingRepository } from "./repositories/following.repository";
import jwt_decode from "jwt-decode";
import { IDataDecode } from "src/interfaces/decode";

@Injectable()
export class FollowingService {
  constructor(private followingRepository: FollowingRepository) {}

  async create(createFollowingDto: CreateFollowingDto, token: string) {
    const decode: IDataDecode = jwt_decode(token);
    const followerId = decode.sub;

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
    const decode: IDataDecode = jwt_decode(token);
    const userId = decode.sub;

    const followers = await this.followingRepository.findAllFollowers(userId);

    return followers;
  }

  async findAllFollowings(token: string) {
    const decode: IDataDecode = jwt_decode(token);
    const userId = decode.sub;

    const followings = await this.followingRepository.findAllFollowings(userId);

    return followings;
  }

  async remove(id: string) {
    const follow = await this.followingRepository.findOne(id);

    if (!follow) {
      throw new NotFoundException("Esse vínculo de seguidor não existe");
    }

    await this.followingRepository.remove(id);
  }
}
