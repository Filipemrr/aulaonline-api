import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse';
import { VideoService } from './video.service';
import { NewVideoDto } from './dtos/new-video-dto';
import { CreateVideoDtoPipe } from './pipes/create-video-dto.pipe';

@Controller('video')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Post('/addVideo')
  @UsePipes(CreateVideoDtoPipe)
  async newVideo(
    @Res() res: Response,
    @Req() req: Request,
    @Body() addVideoDTO: NewVideoDto,
  ): Promise<Response> {
    const CreatedVideo = await this.videoService.addVideo(
      req['userId'],
      addVideoDTO,
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedVideo));
  }
}
