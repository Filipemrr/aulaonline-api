import { ApiProperty } from '@nestjs/swagger';

export class CurrentUserDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  name: string;
}
