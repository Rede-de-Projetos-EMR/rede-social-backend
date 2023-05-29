import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRepository } from "./repositories/user.repositorie";
import { UserPrismaRepository } from "./repositories/prisma/prisma.repositorie";
import { VerifyIdPermission } from "src/middlewares/common/verifyIdPermission";
import { VerifyUserExists } from "src/middlewares/common/verifyUserExists";
import { VerifyUniqueUserData } from "src/middlewares/user/verifyUniqueUserData";

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
    consumer
      .apply(VerifyUniqueUserData)
      .forRoutes(
        { path: "user", method: RequestMethod.POST },
        { path: "user/*", method: RequestMethod.PATCH },
      );
    consumer.apply(VerifyUserExists).forRoutes("user/*");
    consumer
      .apply(VerifyIdPermission)
      .exclude({ path: "user", method: RequestMethod.GET }, "user/(.*)")
      .forRoutes("user/*");
  }
}
