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
import { RatingService } from './rating.service';
import { getRatingDto, NewRatingDto } from './dtos/new-rating-dto';
import { CreateRatingDtoPipe } from './pipes/create-rating-dto.pipe';
import { GetRatingDtoPipe } from './pipes/getRating.dto.pipe';

@Controller('rating')
export class RatingController {
  constructor(private courseService: RatingService) {}

  @Post('/newRating')
  @UsePipes(CreateRatingDtoPipe)
  async createCourse(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createRatingDTO: NewRatingDto,
  ): Promise<Response> {
    const CreatedRating =
      await this.courseService.postNewRating(createRatingDTO,req['userId'], );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedRating));
  }

  @Get('/getAllRatingsByClass')
  @UsePipes(GetRatingDtoPipe)
  async getCourses(
    @Res() res: Response,
    @Body() getRatings: getRatingDto,
  ): Promise<Response> {
    const Courses: object = await this.courseService.getAllRatingsOfAula(getRatings );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', Courses));
  }

}
