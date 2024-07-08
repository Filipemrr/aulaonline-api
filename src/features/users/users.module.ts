import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthMiddleware } from "../../core/infra/middlewares/auth-middleware.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../../core/data/entities/userEntitie';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
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
