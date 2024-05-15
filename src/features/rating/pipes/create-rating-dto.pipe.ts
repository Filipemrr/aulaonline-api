import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateRatingDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.stars || !value.aulaID) {
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (typeof value.stars !== 'number' || typeof value.aulaID !== 'number') {
      throw new BadRequestException(
        'Dados de login inválidos, preencha corretamente',
      );
    }
    if (value.stars < 0 || value.stars > 5) {
      throw new BadRequestException(
        'A avaliacao deve ser entre 0 e 5 estrelas.',
      );
    }
    return value;
  }
}
