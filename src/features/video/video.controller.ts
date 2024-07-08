import {
  Body,
  Controller, Delete,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UsePipes
} from '@nestjs/common';
import { Response } from 'express';
import { CustomResponse } from '../../core/domain/ResponseModel/CustomResponse';
import { VideoService } from './video.service';
import { NewVideoDto } from './dtos/new-video-dto';
import { CreateVideoDtoPipe } from './pipes/create-video-dto.pipe';
import { Video } from '../../core/data/entities/videoEntitie';
import { ApiTags } from '@nestjs/swagger';
import { DeleteVideoDto } from './dtos/delete-video-dto';

@ApiTags('Videos')
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
  @Get('/allVideosOfUser')
  async getAllVideos(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const allVideos: Video[] = await this.videoService.getAllVideos(
      req['userId'],
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', allVideos));
  }

  @Delete('/deleteVideo')
  async deleteVideoFromUser(
    @Res() res: Response,
    @Req() req: Request,
    @Body() deleteVideoDTO: DeleteVideoDto,
  ): Promise<Response> {
    console.log(req['userId']);
    const deletedVideo = await this.videoService.deleteVideo(
      req['userId'],
      deleteVideoDTO,
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', deletedVideo));
  }
}
