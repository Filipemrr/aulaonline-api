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
import { CommentService } from './comment.service';
import { getCommentsDto, NewCommentDto } from './dtos/new-comment-dto';
import { NewCommentDtoPipe } from './pipes/new-comment-dto.pipe';
import { CurrentUserDto } from '../users/dtos/currentUser.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post('/newComment')
  @UsePipes(NewCommentDtoPipe)
  async postNewComment(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createCommentDTO: NewCommentDto,
  ): Promise<Response> {
    const CreatedComment = await this.commentService.postNewComment(
      createCommentDTO,
      req['userId'],
    );
    return res
      .status(HttpStatus.OK)
      .json(new CustomResponse(200, 'success', CreatedComment));
  }
  @Get('getCommentsByAula')
  async getUserInfo(
    @Res() res: Response,
    @Req() req: Request,
    @Body() getComments: getCommentsDto
  ): Promise<Response> {
    const allComments: object = await this.commentService.getAllCommentsOfAula(getComments);
    return res.status(200).json(new CustomResponse(200, 'Success', allComments));
  }
}
