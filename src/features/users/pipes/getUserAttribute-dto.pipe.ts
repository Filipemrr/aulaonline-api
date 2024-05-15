import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class GetUserAttributeDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (
      value.requiredAttribute.toLowerCase() != 'email' &&
      value.requiredAttribute.toLowerCase() != 'username'
    ) {
      throw new BadRequestException('O atributo solicitado eh Invalido');
    }

    if (typeof value.requiredAttribute !== 'string') {
      throw new BadRequestException(
        'o atibuto requerido nao pode ser numerico',
      );
    }

    return value;
  }
}
