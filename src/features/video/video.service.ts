import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { NewVideoDto } from './dtos/new-video-dto';
import { Video } from '../../core/data/entities/videoEntitie';
import * as process from 'process';
import * as dotenv from 'dotenv';
import axios from 'axios';
import { DeleteVideoDto } from './dtos/delete-video-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../core/data/entities/userEntitie';

dotenv.config();
@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video)
    private videoRepository: Repository<Video>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async addVideo(userID: number, prospectVideo: NewVideoDto): Promise<object> {
    const user = await this.userRepository.findOneBy({ id: userID });
    if (!user) {
      throw new BadRequestException('Usuario Nao Existe No Sistema');
    }
    const video = await this.videoRepository.findOne({
      where: {
        video_link: prospectVideo.video_link,
        user: user,
      },
    });
    if (video)
      throw new NotFoundException('Voce Ja Cadastrou esse video antes.');
    try {
      const { title, thumbnailUrl } = await this.getYouTubeVideoInfo(
        prospectVideo.video_link,
        process.env.GOOGLE_API_KEY,
      );
      const newVideo: Video = this.videoRepository.create();
      newVideo.title = title;
      newVideo.video_thumb_url = thumbnailUrl;
      newVideo.video_link = prospectVideo.video_link;
      newVideo.user = user;
      await this.videoRepository.save(newVideo);
    } catch (error) {
      throw error;
    }
    delete user.password;
    delete user.refreshToken;
    return { mensagem: 'O video foi salvo no historico do usuario' };
  }

  async getAllVideos(userID: number): Promise<Video[]> {
    const user = await this.userRepository.findOneBy({ id: userID });
    if (!user) {
      throw new BadRequestException('Usuario Nao Existe No Sistema');
    }
    const videos: Video[] = await this.videoRepository.find({
      where: { user: user },
    });

    if (!videos || videos.length === 0) {
      throw new NotFoundException('Usuario nao possui videos em seu historico');
    }
    return videos;
  }

  async deleteVideo(userId: number, deleteVideoDto: DeleteVideoDto) {
    if (userId === undefined)
      throw new BadRequestException(
        'Nao foi possivel deletar o video pois o Usuario nao autenticado eh autenticado',
      );

    const video = await this.videoRepository.findOne({
      where: {
        video_id: deleteVideoDto.videoID,
        user: { id: userId },
      },
    });
    if (!video) throw new NotFoundException(`Video Nao encontrado`);

    await this.videoRepository.delete(deleteVideoDto.videoID);
    return { message: 'Video deletado com sucesso' };
  }
  async getYouTubeVideoInfo(
    videoLink: string,
    apiKey: string,
  ): Promise<{ title: string; thumbnailUrl: string }> {
    try {
      const videoId = this.extractVideoId(videoLink);
      if (!videoId)
        throw new BadRequestException(
          'falha ao extrair video pelo ID, possivelmente o video eh invalido ou nao existe',
        );
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`,
      );
      const videoInfo = response.data.items[0];
      const title = videoInfo.snippet.title;
      const thumbnailUrl = videoInfo.snippet.thumbnails.default.url;
      return { title, thumbnailUrl };
    } catch (error) {
      throw error;
    }
  }

  extractVideoId(videoLink: string): string {
    const match = videoLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? match[1] : '';
  }
}
