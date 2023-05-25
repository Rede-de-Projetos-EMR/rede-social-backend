import { Module } from "@nestjs/common";
import { FollowingService } from "./following.service";
import { FollowingController } from "./following.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { FollowingRepository } from "./repositories/following.repository";
import { FollowingPrismaRepository } from "./repositories/prisma/prisma.repository";

@Module({
  controllers: [FollowingController],
  providers: [
    FollowingService,
    PrismaService,
    {
      provide: FollowingRepository,
      useClass: FollowingPrismaRepository,
    },
  ],
})
export class FollowingModule {}
