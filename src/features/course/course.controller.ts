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
import { CourseService } from './course.service';
import { NewCourseDto } from './dtos/new-course-dto';
import { CreateCourseDtoPipe } from './pipes/create-course-dto.pipe';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/createNewCourse')
  @UsePipes(CreateCourseDtoPipe)
  async createCourse(
    @Res() res: Response,
    @Body() newCourse: NewCourseDto,
    @Req() req: Request,
  ): Promise<Response> {
    const CreatedCourseMessage = await this.courseService.createCourse(
      newCourse,
      req['userId'],
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedCourseMessage));
  }
  @Get('/allCourses')
  async getCourses(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const Courses: object = await this.courseService.getaAllCourses();
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', Courses));
  }
}
