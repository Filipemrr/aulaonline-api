import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class CreateUserDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (
      !value.name ||
      !value.email ||
      !value.password
    ) {
      throw new BadRequestException('Itens obrigatórios não encontrados');
    }
    if (typeof value.email !== 'string' || typeof value.password !== 'string') {
      throw new BadRequestException(
        'Dados de login inválidos, preencha com Email e Senha',
      );
    }
    return value;
  }
}

