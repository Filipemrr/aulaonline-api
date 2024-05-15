import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class NewCommentDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.comment || !value.aulaID) {
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (
      typeof value.comment !== 'string' ||
      typeof value.aulaID !== 'number'
    ) {
      throw new BadRequestException(
        'A avaliacao deve ser entre 0 e 5 estrelas.',
      );
    }
    return value;
  }
}
