import { Module } from '@nestjs/common';
import { NotationsController } from './notations.controller';
import { NotationsService } from './notations.service';
import { DatabaseModule } from '../../core/data/database.module';
import { NoteProviders } from '../../core/data/entities/noteEntity/note.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [NotationsController],
  providers: [...NoteProviders, NotationsService],
  exports: [NotationsService],
})
export class NotationsModule {}
