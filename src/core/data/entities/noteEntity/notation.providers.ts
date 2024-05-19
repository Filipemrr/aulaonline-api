import { DataSource } from 'typeorm';
import { NotationEntity } from './notation.entity';

export const NotationProviders = [
  {
    provide: 'NOTATION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(NotationEntity),
    inject: ['DATA_SOURCE'],
  },
];
