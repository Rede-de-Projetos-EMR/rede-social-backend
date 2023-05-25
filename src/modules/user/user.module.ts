import { MiddlewareConsumer, Module, NestModule, Req, RequestMethod } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "./repositories/user.repositorie";
import { UserPrismaRepository } from "./repositories/prisma/prisma.repositorie";
import { VerifyIdPermission } from "src/middlewares/common/verifyIdPermission";

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyIdPermission).exclude({path: "user/*", method: RequestMethod.GET}).forRoutes({path: "user/*", method: RequestMethod.ALL});
  }
}
