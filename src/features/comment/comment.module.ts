import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { DatabaseModule } from '../../core/data/database.module';
import { CommentService } from './comment.service';
import { AuthMiddleware } from '../../core/infra/middlewares/auth-middleware.service';
import { CommentProviders } from '../../core/data/entities/commentsEntity/comment.providers';
import { UserProviders } from '../../core/data/entities/userEntity/user.providers';
import { AulaProviders } from '../../core/data/entities/aulaEntity/aula.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentController],
  providers: [
    ...CommentProviders,
    ...UserProviders,
    ...AulaProviders,
    CommentService,
  ],
  exports: [CommentService],
})
export class CommentModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'comment/getCommentsByAula', method: RequestMethod.POST });
  }
}
