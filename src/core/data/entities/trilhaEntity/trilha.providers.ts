import { DataSource } from 'typeorm';
import { TrilhaEntity } from './trilha.entity';

export const TrilhaProviders = [
  {
    provide: 'TRILHA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(TrilhaEntity),
    inject: ['DATA_SOURCE'],
  },
];