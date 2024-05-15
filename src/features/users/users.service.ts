import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { Repository } from 'typeorm';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dtos/outputDto\'s/login.dto';
import { LoggedUserDto } from './dtos/outputDto\'s/logged-user.dto';
import { CreateUserDto } from './dtos/inputDto\'s/createUser.dto';
import { CurrentUserDto } from './dtos/outputDto\'s/currentUser.dto';
import { UserMessage } from "./dtos/messageDTO";
import { GetUserAttributeDto } from "./dtos/inputDto's/getUserAttribute.dto";

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(prospectUser: CreateUserDto): Promise<UserMessage> {
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
    await this.userRepository.save(createdUser);
    return { message: createdUser.name + ' foi registrado' };
  }
  async login(loginDto: LoginDto): Promise<LoggedUserDto> {
    console.log("hi");
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

  async getUserAttribute(
    userId: number,
    Attribute: GetUserAttributeDto,
  ): Promise<GetUserAttributeDto> {
    const user: UserEntity = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new NotFoundException('Usuario Nao Cadastrado no sistema');

    if (Attribute.requiredAttribute.toLowerCase() === 'email')
      return { requiredAttribute: user.email };

    if (Attribute.requiredAttribute.toLowerCase() === 'username')
      return { requiredAttribute: user.name };

    throw new BadRequestException('Atributo nao encontrado.');
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
