import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class AddCourseToTrilhaDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.courseID) {
      throw new BadRequestException('Nome Do Curso Eh Invalido');
    }
    if (typeof value.courseID !== 'number') {
      throw new BadRequestException('ID do curso deve ser numerico');
    }
    return value;
  }
}
