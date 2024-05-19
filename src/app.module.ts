import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import * as dotenv from 'dotenv';
import { VideoModule } from './features/video/video.module';
import { NotationsModule } from './features/notations/notations.module';
dotenv.config();
@Module({
  imports: [UsersModule, VideoModule, NotationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
