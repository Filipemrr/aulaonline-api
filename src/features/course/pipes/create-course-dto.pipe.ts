import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateCourseDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.name) {
      throw new BadRequestException('Nome Do Curso Eh Invalido');
    }
    if (typeof value.name !== 'string') {
      throw new BadRequestException('Nome Do Curso eh Invalido');
    }
    return value;
  }
}
