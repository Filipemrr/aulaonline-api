import { DataSource } from 'typeorm';
import { RatingEntity } from './rating.entity';

export const RatingProviders = [
  {
    provide: 'RATING_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RatingEntity),
    inject: ['DATA_SOURCE'],
  },
];