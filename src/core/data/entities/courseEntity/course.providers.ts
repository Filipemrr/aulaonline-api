import { DataSource } from 'typeorm';
import { CourseEntity } from './course.entity';

export const CourseProviders = [
  {
    provide: 'COURSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CourseEntity),
    inject: ['DATA_SOURCE'],
  },
];