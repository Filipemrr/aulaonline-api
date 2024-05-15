import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import * as dotenv from 'dotenv';
import { AulaModule } from './features/aula/aula.module';
import { RatingModule } from './features/rating/rating.module';
import { CommentModule } from './features/comment/comment.module';
import { CourseModule } from './features/course/course.module';
import { TrilhaModule } from './features/trilha/trilha.module';
dotenv.config();
@Module({
  imports: [UsersModule, AulaModule, RatingModule, CommentModule, CourseModule, TrilhaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
