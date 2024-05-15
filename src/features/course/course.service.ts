import { BadRequestException, ConflictException, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CourseEntity } from '../../core/data/entities/courseEntity/course.entity';
import { NewCourseDto } from './dtos/new-course-dto';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @Inject('COURSE_REPOSITORY')
    private courseRepository: Repository<CourseEntity>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async getaAllCourses(): Promise<CourseEntity[]> {
    return this.courseRepository.find();
  }

  async createCourse(
    courseCaracteristics: NewCourseDto,
    CreatorID: number,
  ): Promise<object> {
    if (CreatorID === undefined)
      throw new BadRequestException('Usuario Nao Autenticado, Faca O login');

    const Course: CourseEntity = await this.courseRepository.findOne({
      where: {
        name: courseCaracteristics.name,
      },
    });
    const UserCreator: UserEntity = await this.userRepository.findOne({
      where: {
        id: CreatorID,
      },
    });

    if (Course) throw new ConflictException('Ja Existe um Curso Com esse nome');

    if (!UserCreator)
      throw new BadRequestException('Usuario Invalido ou Nao Encontrado');

    const NewCourse: CourseEntity = this.courseRepository.create();
    NewCourse.name = courseCaracteristics.name;
    NewCourse.user = UserCreator;
    await this.courseRepository.save(NewCourse);
    return {
      mensagem:
        'O CURSO ' +
        courseCaracteristics.name +
        ' foi cadastrado na plataforma',
    };
  }
}
