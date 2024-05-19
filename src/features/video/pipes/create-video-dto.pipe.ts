import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateVideoDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.name || !value.title || !value.video_link) {
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (
      typeof value.name !== 'string' ||
      typeof value.title !== 'string' ||
      typeof value.video_link !== 'string'
    ) {
      throw new BadRequestException('Dados Da Aula Sao Invalidos');
    }
    return value;
  }
}
