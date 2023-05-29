import { Module } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { ReactionsController } from "./reactions.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ReactionsRepository } from "./repositories/reactions.repository";
import { ReactionsPrismaRepository } from "./repositories/prisma/prisma.repository";

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService, {
    provide: ReactionsRepository,
    useClass: ReactionsPrismaRepository
  }]
})
export class ReactionsModule { }
