import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class GetCourseInTrilhasDtoPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value.trilhaID) {
      throw new BadRequestException('Campos Obrigatorios Nao Preenchidos');
    }
    if (typeof value.trilhaID !== 'number') {
      throw new BadRequestException('ID da Trilha Deve Ser Numerica');
    }
    return value;
  }
}