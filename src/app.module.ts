import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './features/users/users.module';
import * as dotenv from 'dotenv';
import { VideoModule } from './features/video/video.module';
dotenv.config();
@Module({
  imports: [UsersModule, VideoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
