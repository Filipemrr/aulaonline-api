import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AulaEntity } from '../../core/data/entities/aulaEntity/aula.entity';
import { getRatingDto, NewRatingDto } from './dtos/new-rating-dto';
import { RatingEntity } from '../../core/data/entities/ratingEntity/rating.entity';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';
import { CommentEntity } from '../../core/data/entities/commentsEntity/comment.entity';

@Injectable()
export class RatingService {
  constructor(
    @Inject('RATING_REPOSITORY')
    private ratingRepository: Repository<RatingEntity>,

    @Inject('AULA_REPOSITORY')
    private aulaRepository: Repository<AulaEntity>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async postNewRating(newRating: NewRatingDto, UserID: number): Promise<object> {
    const aula = await this.aulaRepository.findOneBy({ id: newRating.aulaID });
    if (!aula) {
      throw new NotFoundException(`Essa Aula Nao Existe`);
    }

    const user = await this.userRepository.findOneBy({ id: UserID });
    if(!user) {
      throw new BadRequestException("Usuario Nao Existe No Sistema")
    }
    const rating: RatingEntity = this.ratingRepository.create();
    rating.stars = newRating.stars;
    rating.aula = aula;
    rating.user = user;
    await this.ratingRepository.save(rating);
    return { mensagem: "Sua Avaliacao Foi Cadastrada Com Sucesso"}
  }

  async getAllRatingsOfAula(aulaToGetRatings: getRatingDto): Promise<object> {
    const aula = await this.aulaRepository.findOneBy({ id: aulaToGetRatings.aulaID });
    if (!aula) {
      throw new NotFoundException(`Essa Aula Nao Existe`);
    }
    const ratings: RatingEntity[] = await this.ratingRepository.find({
      where: { aula: aula },
      relations: ["user"]
    });
    if(ratings.length === 0)
      return {message: "Este Video Ainda Nao Tem comentarios"}

    return ratings.map(rating => ({
      username: rating.user.name,
      rating: rating.stars
    }))
  }
}
