import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AulaEntity } from '../../core/data/entities/aulaEntity/aula.entity';
import { getCommentsDto, NewCommentDto } from './dtos/new-comment-dto';
import { CommentEntity } from '../../core/data/entities/commentsEntity/comment.entity';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: Repository<CommentEntity>,

    @Inject('AULA_REPOSITORY')
    private aulaRepository: Repository<AulaEntity>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}
  async postNewComment(
    newComment: NewCommentDto,
    UserID: number,
  ): Promise<object> {
    const aula = await this.aulaRepository.findOneBy({ id: newComment.aulaID });
    if (!aula) {
      throw new NotFoundException(`Essa Aula Nao Existe`);
    }

    const user = await this.userRepository.findOneBy({ id: UserID });
    if (!user) {
      throw new BadRequestException(
        'Usuario Nao Existe no sistema, tente novamente.',
      );
    }

    const comment: CommentEntity = this.commentRepository.create();
    comment.comment = newComment.comment;
    comment.aula = aula;
    comment.user = user;
    await this.commentRepository.save(comment);

    return { mensagem: 'Comentario cadastrado com sucesso.' };
  }

  async getAllCommentsOfAula(
    newComment: getCommentsDto,
  ): Promise<object> {
    const aula = await this.aulaRepository.findOneBy({ id: newComment.aulaID });
    if (!aula) {
      throw new NotFoundException(`Essa Aula Nao Existe`);
    }
    const comments: CommentEntity[] = await this.commentRepository.find({
      where: { aula: aula },
      relations: ["user"]
    });
    if(comments.length === 0)
      return {message: "Este Video Ainda Nao Tem comentarios"}

    return comments.map(comment => ({
      userName: comment.user.name,
      comment: comment.comment
    })) ;
  }
}
