import { CreateFollowingDto } from "../dto/create-following.dto";
import { Following } from "../entities/following.entity";

export abstract class FollowingRepository {
  abstract create(
    data: CreateFollowingDto,
    followerId: string,
  ): Promise<Following>;
  abstract findAllFollowers(id: string): Promise<Following[]>;
  abstract findAllFollowings(id: string): Promise<Following[]>;
  abstract remove(id: string): Promise<void>;
  abstract findFollow(
    followingId: string,
    followerId: string,
  ): Promise<Following>;
  abstract findOne(id: string): Promise<Following>;
}
