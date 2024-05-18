import { UserEntity } from '../../../../core/data/entities/userEntity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserDto {
  @ApiProperty()
  public token: string;
  @ApiProperty()
  public refreshToken: string;
  @ApiProperty()
  public user: UserEntity;

  constructor(token: string, refreshToken: string, user: UserEntity) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
