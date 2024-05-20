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
import { NotationProviders } from '../../core/data/entities/noteEntity/notation.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [VideoController],
  providers: [
    ...VideoProviders,
    ...UserProviders,
    ...NotationProviders,
    VideoService,
  ],
  exports: [VideoService],
})
export class VideoModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'video/addVideo', method: RequestMethod.POST },
        { path: 'video/allVideosOfUser', method: RequestMethod.GET },
        { path: 'video/deleteVideo', method: RequestMethod.DELETE },
      );
  }
}
