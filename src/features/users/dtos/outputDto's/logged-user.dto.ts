import { UserEntity } from '../../../../core/data/entities/userEntity/user.entity';

export class LoggedUserDto {
  public token: string;
  public refreshToken: string;
  public user: UserEntity;

  constructor(token: string, refreshToken: string, user: UserEntity) {
    this.user = user;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}
