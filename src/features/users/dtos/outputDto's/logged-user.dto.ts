import { User } from '../../../../core/data/entities/userEntitie';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty()
  public token: string;
  @ApiProperty()
  public refreshToken: string;
  @ApiProperty()
  public user: User;

  constructor(token: string, refreshToken: string, user: User) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
