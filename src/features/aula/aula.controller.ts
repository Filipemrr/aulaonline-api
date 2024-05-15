import {
  Body,
  Controller, Get,
  HttpStatus,
  Post, Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse'
import { AulaService } from './aula.service';
import { NewAulaDto } from './dtos/new-aula-dto';
import { CreateAulaDtoPipe } from './pipes/create-aula-dto.pipe';
import { AulaEntity } from '../../core/data/entities/aulaEntity/aula.entity';
import { SearchAulaDto } from './dtos/searchAula-dto';

@Controller('aula')
export class AulaController {
  constructor(private aulaService: AulaService) {}

  @Post('/newAula')
  @UsePipes(CreateAulaDtoPipe)
  async newClass(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createAulaDTO: NewAulaDto,
  ): Promise<Response> {
    const CreatedAula = await this.aulaService.newAula(createAulaDTO);
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedAula));
  }
  @Get('/allAulasOfCourse')
  async getClassesOfThisCourse(
    @Res() res: Response,
    @Body() courseInfo: SearchAulaDto,
  ): Promise<Response> {
    const allClasses: AulaEntity[] = await this.aulaService.allAulasOfCourse(
      courseInfo.courseID,
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', allClasses));
  }
}
