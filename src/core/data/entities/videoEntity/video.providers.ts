import { DataSource } from 'typeorm';
import { VideoEntity } from './videoEntity';

export const VideoProviders = [
  {
    provide: 'VIDEO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(VideoEntity),
    inject: ['DATA_SOURCE'],
  },
];
