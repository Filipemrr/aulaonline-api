import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateAulaDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.name || !value.courseID || !value.link) {
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (
      typeof value.name !== 'string' ||
      typeof value.courseID !== 'number' ||
      typeof value.link !== 'string'
    ) {
      throw new BadRequestException('Dados Da Aula Sao Invalidos');
    }
    return value;
  }
}
