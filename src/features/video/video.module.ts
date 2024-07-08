import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { Video } from '../../core/data/entities/video.entity';
import { User } from '../../core/data/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Video, User])],
  controllers: [VideoController],
  providers: [VideoService],
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
