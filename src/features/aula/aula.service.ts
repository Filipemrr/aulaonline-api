import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AulaEntity } from '../../core/data/entities/aulaEntity/aula.entity';
import { NewAulaDto } from './dtos/new-aula-dto';
import { CourseEntity } from '../../core/data/entities/courseEntity/course.entity';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';

@Injectable()
export class AulaService {
  constructor(
    @Inject('AULA_REPOSITORY')
    private aulaRepository: Repository<AulaEntity>,

    @Inject('COURSE_REPOSITORY')
    private courseRepository: Repository<CourseEntity>,
  ) {}
  async newAula(prospectAula: NewAulaDto): Promise<object> {
    const Course: CourseEntity = await this.courseRepository.findOne({
      where: {
        id: prospectAula.courseID,
      },
    });
    if (!Course)
      throw new NotFoundException('Esse Curso Nao Existe No Sistema');

    const AulaAlreadyExist: AulaEntity = await this.aulaRepository.findOneBy({
      link: prospectAula.link,
    });
    if (AulaAlreadyExist)
      throw new ConflictException('Essa Aula Ja foi Cadastrada Nesse Curso');

    const newAula: AulaEntity = this.aulaRepository.create();
    newAula.name = prospectAula.name;
    newAula.link = prospectAula.link;
    newAula.course = Course;
    await this.aulaRepository.save(newAula);

    return {
      mensagem:
        'A Aula ' +
        prospectAula.name +
        'foi cadastrada ' +
        'no Curso' +
        Course.name,
    };
  }

  async allAulasOfCourse(courseID: number): Promise<AulaEntity[]> {
    const Course: CourseEntity = await this.courseRepository.findOne({
      where: {
        id: courseID,
      },
    });
    if (!Course) throw new BadRequestException('Esse Curso Nao Existe');

    const allAulas = await this.aulaRepository.find({
      where: {
        course: Course,
      },
    });

    if (!allAulas) {
      throw new NotFoundException('Esse Curso Nao Existe ');
    }
    return allAulas;
  }
}
