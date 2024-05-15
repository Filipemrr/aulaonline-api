import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NewTrilhaDto } from './dtos/new-trilha-dto';
import { TrilhaEntity } from '../../core/data/entities/trilhaEntity/trilha.entity';
import { AddCourseToTrilhaDto } from './dtos/add-course-to-trilha-dto';
import { CourseEntity } from '../../core/data/entities/courseEntity/course.entity';
import { GetCoursesOfTrilhaDto } from './dtos/get-Courses-of-Trilha.dto';

@Injectable()
export class TrilhaService {
  constructor(
    @Inject('TRILHA_REPOSITORY')
    private trilhaRepository: Repository<TrilhaEntity>,

    @Inject('COURSE_REPOSITORY')
    private courseRepository: Repository<CourseEntity>,
  ) {}

  async getaAllTrilhas(): Promise<TrilhaEntity[]> {
    return this.trilhaRepository.find();
  }

  async getAllCoursesOfTrilha(trilhaInfo: GetCoursesOfTrilhaDto): Promise<object> {
    const trilha = await this.trilhaRepository.findOne({
      where: { id: trilhaInfo.trilhaID },
      relations: ['courses']
    });

    if (!trilha)
      throw new BadRequestException("Essa Trilha Nao existe");

    const courses = trilha.courses.map((course, index) => ({
      id: course.id,
      [`Curso_${index + 1}`]: course.name,
    }));

    return {
      trilha: trilha.name,
      courses: courses
    };
  }

  async createNewTrilha(trilhaCaracteristics: NewTrilhaDto): Promise<object> {
    const Trilha: TrilhaEntity = await this.trilhaRepository.findOne({
      where: {
        name: trilhaCaracteristics.name,
      },
    });
    if (Trilha) throw new ConflictException('Ja Existe um Curso Com esse nome');

    const NewTrilha: TrilhaEntity = this.trilhaRepository.create();
    NewTrilha.name = trilhaCaracteristics.name;
    await this.trilhaRepository.save(NewTrilha);
    return {
      mensagem:
        'O CURSO ' +
        trilhaCaracteristics.name +
        ' foi cadastrado na plataforma',
    };
  }
  async addCourseToTrilha(courseToTrilha: AddCourseToTrilhaDto): Promise<object> {
    const course: CourseEntity = await this.courseRepository.findOne({
      where: {
        id: courseToTrilha.courseID,
      },
    });

    if (!course)
      throw new NotFoundException('Esse curso nao existe no Sistema');

    const trilha = await this.trilhaRepository.findOne({
      where: { id: courseToTrilha.trilhaID },
      relations: ['courses']  // Carrega cursos associados para evitar duplicatas
    });
    if (!trilha)
      throw new BadRequestException("Essa Trilha não Existe");

    const alreadyExists = trilha.courses.find(c => c.id === course.id);
    if (alreadyExists)
      throw new BadRequestException("Curso já está associado a esta trilha");

    trilha.courses.push(course);
    await this.trilhaRepository.save(trilha);

    return { message: "Curso adicionado à trilha com sucesso" };
  }


}
