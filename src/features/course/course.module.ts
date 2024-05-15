import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CourseController } from './course.controller';
import { DatabaseModule} from '../../core/data/database.module';
import { CourseService } from './course.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { CourseProviders } from '../../core/data/entities/courseEntity/course.providers';
import { UserProviders } from '../../core/data/entities/userEntity/user.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [CourseController],
  providers: [...CourseProviders, ...UserProviders, CourseService],
  exports: [CourseService],
})

export class CourseModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'course/createNewCourse', method: RequestMethod.POST },
        { path: 'course/allCourses', method: RequestMethod.GET },
        { path: 'course/*', method: RequestMethod.PUT },
      );
  }
}
