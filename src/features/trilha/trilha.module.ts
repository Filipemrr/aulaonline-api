import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TrilhaController } from './trilha.controller';
import { DatabaseModule} from '../../core/data/database.module';
import { TrilhaService } from './trilha.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { CourseProviders } from '../../core/data/entities/courseEntity/course.providers';
import { UserProviders } from '../../core/data/entities/userEntity/user.providers';
import { TrilhaProviders } from '../../core/data/entities/trilhaEntity/trilha.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [TrilhaController],
  providers: [...CourseProviders, ...UserProviders,...TrilhaProviders, TrilhaService],
  exports: [TrilhaService],
})

export class TrilhaModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'trilha/createNewTrilha', method: RequestMethod.POST },
      );
  }
}
