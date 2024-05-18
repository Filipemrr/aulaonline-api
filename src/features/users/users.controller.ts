import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put, Query,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse'
import { UsersService } from './users.service';
import { LoginDto } from "./dtos/outputDto's/login.dto";
import { LoginDtoPipe } from './pipes/login-dto.pipe';
import { LoggedUserDto } from "./dtos/outputDto's/logged-user.dto";
import { CreateUserDtoPipe } from './pipes/create-user-dto.pipe';
import { CreateUserDto } from "./dtos/inputDto's/createUser.dto";
import { CurrentUserDto } from "./dtos/outputDto's/currentUser.dto";
import { GetUserAttributeDto } from "./dtos/inputDto's/getUserAttribute.dto";
import { GetUserAttributeDtoPipe } from './pipes/getUserAttribute-dto.pipe';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post('/createUser')
  @UsePipes(CreateUserDtoPipe)
  async addUser(
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDto,
  ): Promise<Response> {
    const registerUserCredentials =
      await this.usersService.createUser(createUserDTO);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', registerUserCredentials));
  }
  @Get('/getUser')
  async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userInfo: CurrentUserDto = await this.usersService.getUser(
      req['userId'],
    );
    return res.status(200).json(new CustomResponse(200, 'Success', userInfo));
  }
  @Get('/getUserAttribute')
  @UsePipes(GetUserAttributeDtoPipe)
  async getUserAttribute(
    @Res() res: Response,
    @Query() requiredAttribute: GetUserAttributeDto,
    @Req() req: Request,
  ): Promise<Response> {
    const userInfo: GetUserAttributeDto =
      await this.usersService.getUserAttribute(
        req['userId'],
        requiredAttribute,
      );
    return res.status(200).json(new CustomResponse(200, 'Success', userInfo));
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
