import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dtos/login.dto';
import { LoggedUserDto } from './dtos/logged-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { CurrentUserDto } from './dtos/currentUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(prospectUser: CreateUserDto): Promise<UserEntity> {
    const previousUser: UserEntity = await this.userRepository.findOneBy({
      email: prospectUser.email,
    });
    if (previousUser) {
      throw new ConflictException('Este email já foi associado a um usuário');
    }

    const createdUser: UserEntity = this.userRepository.create();

    createdUser.name = prospectUser.name;
    createdUser.email = prospectUser.email;
    createdUser.password = prospectUser.password;

    return await this.userRepository.save(createdUser);
  }
  async login(loginDto: LoginDto): Promise<LoggedUserDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      email: loginDto.email,
      password: loginDto.password,
    });

    if (user === null) {
      throw new UnauthorizedException('Login ou senha incorretos');
    }

    const token: string = await this.createJwt(user.id);
    const refreshToken: string = this.generateRefreshToken();

    await this.userRepository.update(user.id, { refreshToken: refreshToken });

    delete user.password;
    delete user.refreshToken;

    return { user: user, refreshToken: refreshToken, token: token };
  }
  async getUser(userId: number): Promise<CurrentUserDto> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return { name: user.name, email: user.email };
  }

  async refresh(token: string, userId: number): Promise<LoggedUserDto> {
    const user: UserEntity = await this.userRepository.findOneBy({
      id: userId,
      refreshToken: token,
    });

    if (!user) {
      throw new NotFoundException(
        'Usuário não encontrado ou token invalido, refaça login para continuar',
      );
    }
    return await this.login({ email: user.email, password: user.password });
  }

  async createJwt(userId: number): Promise<string> {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60, // One hour auth
    });
  }

  generateRefreshToken(): string {
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < 90; i++) {
      const index: number = Math.floor(Math.random() * caracteres.length);
      result += caracteres.charAt(index);
    }

    return result;
  }
}
