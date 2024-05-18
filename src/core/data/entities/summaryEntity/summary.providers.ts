import { DataSource } from 'typeorm';
import { SummaryEntity } from './summary.entity';

export const UserProviders = [
  {
    provide: 'SUMMARY_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SummaryEntity),
    inject: ['DATA_SOURCE'],
  },
];