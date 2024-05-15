import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse'
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { LoginDtoPipe } from './pipes/login-dto.pipe';
import { LoggedUserDto } from './dtos/logged-user.dto';
import { CreateUserDtoPipe } from './pipes/create-user-dto.pipe';
import { CreateUserDto } from './dtos/create-user.dto';
import { CurrentUserDto } from './dtos/currentUser.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('getUser')
  async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userInfo: CurrentUserDto = await this.usersService.getUser(
      req['userId'],
    );
    return res.status(200).json(new CustomResponse(200, 'Success', userInfo));
  }
  @Post('/create')
  @UsePipes(CreateUserDtoPipe)
  async addUser(
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDto,
  ): Promise<Response> {
    const userTokens = await this.usersService.createUser(createUserDTO);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', userTokens));
  }

  @Post('/login')
  @UsePipes(LoginDtoPipe)
  async login(
    @Res() res: Response,
    @Body() loginDto: LoginDto,
  ): Promise<Response> {
    const userTokens: LoggedUserDto = await this.usersService.login(loginDto);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', userTokens));
  }

  @Put('/refresh')
  async refresh(
    @Res() res: Response,
    @Req() req: Request,
    @Body('token') token: string,
  ): Promise<Response> {
    const loggedUserDto: LoggedUserDto = await this.usersService.refresh(
      token,
      req['userId'],
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', loggedUserDto));
  }
}
