import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VideoController } from './video.controller';
import { DatabaseModule } from '../../core/data/database.module';
import { VideoService } from './video.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { VideoProviders } from '../../core/data/entities/videoEntity/video.providers';
import { UserProviders } from '../../core/data/entities/userEntity/user.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [VideoController],
  providers: [...VideoProviders,...UserProviders , VideoService],
  exports: [VideoService],
})
export class VideoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'video/all', method: RequestMethod.GET },
        { path: 'video/allAulasOfCourse', method: RequestMethod.GET },
      );
  }
}
