import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class LoginDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (value.email === undefined || value.password === undefined) {
      throw new BadRequestException('Email e Senha obrigatórios');
    }

    if (typeof value.email !== 'string' || typeof value.password !== 'string') {
      throw new BadRequestException(
        'Dados de login inválidos, preencha com Email e Senha',
      );
    }

    return value;
  }
}
