import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { ReactionsService } from "./reactions.service";
import { ReactionsController } from "./reactions.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { ReactionsRepository } from "./repositories/reactions.repository";
import { ReactionsPrismaRepository } from "./repositories/prisma/prisma.repository";
import { AlreadyReacted } from "src/middlewares/reactions/alreadyReacted";
import { NotReactedYet } from "src/middlewares/reactions/notReactedYet";
import { FindPost } from "src/middlewares/post/findPost";
import { PostRepository } from "../post/repositories/post.repository";
import { PostPrismaRepository } from "../post/repositories/prisma/prisma.repository";

@Module({
  controllers: [ReactionsController],
  providers: [ReactionsService, PrismaService, {
    provide: PostRepository,
    useClass: PostPrismaRepository
  }, {
      provide: ReactionsRepository,
      useClass: ReactionsPrismaRepository
    }]
})
export class ReactionsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AlreadyReacted)
      .forRoutes({ path: "reactions/*", method: RequestMethod.POST });
    consumer
      .apply(NotReactedYet)
      .forRoutes(
        { path: "reactions/*", method: RequestMethod.PATCH },
        { path: "reactions/*", method: RequestMethod.DELETE }
      );
    consumer
      .apply(FindPost)
      .forRoutes(
        { path: "reactions/*", method: RequestMethod.POST },
        { path: "reactions/*", method: RequestMethod.GET }
      );
  }
}
