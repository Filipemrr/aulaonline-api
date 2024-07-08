import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annotation } from '../../core/data/entities/annotation.entity';
import { NotationsController } from './notations.controller';
import { NotationsService } from './notations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Annotation])],
  controllers: [NotationsController],
  providers: [NotationsService],
  exports: [NotationsService],
})
export class NotationsModule {}
