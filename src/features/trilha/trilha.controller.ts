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
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse';
import { TrilhaService } from './trilha.service';
import { NewTrilhaDto } from './dtos/new-trilha-dto';
import { CreateTrilhaDtoPipe } from './pipes/create-trilha-dto.pipe';
import { AddCourseToTrilhaDtoPipe } from './pipes/add-course-to-trilha-dto.pipe';
import { AddCourseToTrilhaDto } from './dtos/add-course-to-trilha-dto';
import { GetCoursesOfTrilhaDto } from './dtos/get-Courses-of-Trilha.dto';
import { GetCourseInTrilhasDtoPipe } from './pipes/get-course-in-trilhas.dto.pipe';

@Controller('trilha')
export class TrilhaController {
  constructor(private trilhaService: TrilhaService) {}

  @Post('/createNewTrilha')
  @UsePipes(CreateTrilhaDtoPipe)
  async createTrilhas(
    @Res() res: Response,
    @Body() newTrilha: NewTrilhaDto,
    @Req() req: Request,
  ): Promise<Response> {
    const CreatedCourseMessage = await this.trilhaService.createNewTrilha(
      newTrilha,
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedCourseMessage));
  }
  @Get('/allTrilhas')
  async getTrilhas(
    @Res() res: Response,
  ): Promise<Response> {
    const Trilhas: object = await this.trilhaService.getaAllTrilhas();
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', Trilhas));
  }
  @Post('/getAulasOfTrilhas')
  @UsePipes(GetCourseInTrilhasDtoPipe)
  async getAllCoursesOfTrilha(
    @Res() res: Response,
    @Body() getAllCourseOfTrilha: GetCoursesOfTrilhaDto
  ): Promise<Response> {
    const Trilhas: object = await this.trilhaService.getAllCoursesOfTrilha(getAllCourseOfTrilha);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', Trilhas));
  }

  @Post('/addCourseToTrilha')
  @UsePipes(AddCourseToTrilhaDtoPipe)
  async addCourseToTrilha(
    @Res() res: Response,
    @Body() AddCourseToTrilha: AddCourseToTrilhaDto
  ): Promise<Response> {
    const AddedCourse: object = await this.trilhaService.addCourseToTrilha(AddCourseToTrilha);
    return res
      .status(HttpStatus.OK).json(new CustomResponse(200, 'success', AddedCourse ))
  }
}
