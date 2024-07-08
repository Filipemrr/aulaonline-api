import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './features/users/users.module';
import { VideoModule } from './features/video/video.module';
import { NotationsModule } from './features/notations/notations.module';
import * as process from 'process';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    VideoModule,
    NotationsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
  ],
})
export class AppModule {}