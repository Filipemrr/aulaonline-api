import { DataSource } from 'typeorm';
import { NotationEntity } from './note.entity';

export const NoteProviders = [
  {
    provide: 'NOTATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NotationEntity),
    inject: ['DATA_SOURCE'],
  },
];
