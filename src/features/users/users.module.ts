import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { DatabaseModule } from "../../core/data/database.module";
import { UserProviders } from "../../core/data/entities/userEntity/user.providers";
import { UsersService } from "./users.service";
import { AuthMiddleware } from "../../core/infra/middlewares/auth-middleware.service";

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...UserProviders, UsersService],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'users/getuser', method: RequestMethod.GET },
        { path: 'users/*', method: RequestMethod.PUT },
        { path: '/users/getUserAttribute', method: RequestMethod.GET },
      );
  }
}
