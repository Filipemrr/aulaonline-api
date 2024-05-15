import { DataSource } from 'typeorm';
import { AulaEntity } from './aula.entity';

export const AulaProviders = [
  {
    provide: 'AULA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(AulaEntity),
    inject: ['DATA_SOURCE'],
  },
];