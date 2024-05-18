import { ApiProperty } from '@nestjs/swagger';

export class GetUserAttributeDto {
  @ApiProperty()
  requiredAttribute: string;
}
