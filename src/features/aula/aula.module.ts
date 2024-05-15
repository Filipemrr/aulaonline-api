import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AulaController } from './aula.controller';
import { DatabaseModule} from '../../core/data/database.module';
import { AulaService } from './aula.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { AulaProviders } from '../../core/data/entities/aulaEntity/aula.providers';
import { CourseProviders } from '../../core/data/entities/courseEntity/course.providers';
@Module({
  imports: [DatabaseModule],
  controllers: [AulaController],
  providers: [...AulaProviders, ...CourseProviders, AulaService],
  exports: [AulaService],
})

export class AulaModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'aula/all', method: RequestMethod.GET },
        { path: 'aula/allAulasOfCourse', method: RequestMethod.GET },
      );
  }
}
