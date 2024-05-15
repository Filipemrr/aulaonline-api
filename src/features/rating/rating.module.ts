import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { DatabaseModule } from '../../core/data/database.module';
import { RatingService } from './rating.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { RatingProviders } from '../../core/data/entities/ratingEntity/rating.providers';
import { UserProviders } from '../../core/data/entities/userEntity/user.providers';
import { AulaProviders } from '../../core/data/entities/aulaEntity/aula.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RatingController],
  providers: [...RatingProviders, ...UserProviders,...AulaProviders, RatingService],
  exports: [RatingService],
})
export class RatingModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'rating/getAllRatingsByClass', method: RequestMethod.GET },
        { path: 'rating/newRating', method: RequestMethod.POST },
      );
  }
}
