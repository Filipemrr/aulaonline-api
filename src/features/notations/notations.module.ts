import { Module } from '@nestjs/common';
import { NotationsController } from './notations.controller';
import { NotationsService } from './notations.service';
import { DatabaseModule } from '../../core/data/database.module';
import { NotationProviders } from '../../core/data/entities/noteEntity/notation.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotationsController],
  providers: [...NotationProviders, NotationsService],
  exports: [NotationsService],
})
export class NotationsModule {}
