import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

import { NewVideoDto } from './dtos/new-video-dto';
import { UserEntity } from '../../core/data/entities/userEntity/user.entity';
import { VideoEntity } from '../../core/data/entities/videoEntity/videoEntity';
import * as process from 'process';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();
@Injectable()
export class VideoService {
  constructor(
    @Inject('VIDEO_REPOSITORY')
    private videoRepository: Repository<VideoEntity>,

    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}
  async addVideo(userID: number, prospectVideo: NewVideoDto): Promise<object> {
    const user = await this.userRepository.findOneBy({ id: userID });
    if (!user) {
      throw new BadRequestException('Usuario Nao Existe No Sistema');
    }
    const video: VideoEntity = await this.videoRepository.findOne({
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
      const newVideo: VideoEntity = this.videoRepository.create();
      newVideo.title = title;
      newVideo.video_thumb_url = thumbnailUrl;
      newVideo.video_link = prospectVideo.video_link;
      newVideo.user = user;
      console.log(newVideo);
      await this.videoRepository.save(newVideo);
    } catch (error) {
      throw error;
    }
    return { mensagem: 'O video foi salvo no historico do usuario' };
  }

  async getYouTubeVideoInfo(
    videoLink: string,
    apiKey: string,
  ): Promise<{ title: string; thumbnailUrl: string }> {
    try {
      const videoId = this.extractVideoId(videoLink);
      if (!videoId)
        throw new BadRequestException('falha ao extrair video pelo ID');

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
