import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class GetRatingDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.aulaID) {
      console.log(value.aulaID)
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (typeof value.aulaID !== 'number') {
      throw new BadRequestException(
        'Dados de login inválidos, preencha corretamente',
      );
    }
    return value;
  }
}