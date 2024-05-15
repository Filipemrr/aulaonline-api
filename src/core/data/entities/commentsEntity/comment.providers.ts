import { DataSource } from 'typeorm';
import { CommentEntity } from './comment.entity';

export const CommentProviders = [
  {
    provide: 'COMMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommentEntity),
    inject: ['DATA_SOURCE'],
  },
];