import { Injectable } from "@nestjs/common";
import { FollowingRepository } from "../following.repository";
import { CreateFollowingDto } from "../../dto/create-following.dto";
import { Following } from "../../entities/following.entity";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FollowingPrismaRepository implements FollowingRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateFollowingDto,
    followerId: string,
  ): Promise<Following> {
    const following = new Following();
    Object.assign(following, { ...data });

    const newFollowing = await this.prisma.following.create({
      data: {
        ...following,
        followerId,
      },
    });

    return newFollowing;
  }

  async findAllFollowers(id: string): Promise<Following[]> {
    const followers = await this.prisma.following.findMany({
      where: { followingId: id },
    });

    return followers;
  }

  async findAllFollowings(id: string): Promise<Following[]> {
    const followings = await this.prisma.following.findMany({
      where: { followerId: id },
    });

    return followings;
  }

  async remove(id: string): Promise<void> {
    await this.prisma.following.delete({ where: { id } });
  }

  async findFollow(
    followingId: string,
    followerId: string,
  ): Promise<Following> {
    const follow = await this.prisma.following.findFirst({
      where: {
        followerId,
        followingId,
      },
    });

    return follow;
  }

  async findOne(id: string): Promise<Following> {
    const follow = await this.prisma.following.findUnique({
      where: { id },
    });

    return follow;
  }
}
