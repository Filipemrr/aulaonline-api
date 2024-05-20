import axios from 'axios';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.JWT_TOKEN;

interface Video {
  name: string;
  title: string;
  video_link: string;
}

const videoData: Video[] = [
  {
    name: 'Video 1',
    title: 'Ciencia todo dia eh viado',
    video_link:
      'https://www.youtube.com/watch?v=XdD_qEf0j8Y&list=RDrtzHEBM3phM&index=7',
  },
  {
    name: 'Video 2',
    title: 'Outro video interessante',
    video_link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    name: 'Video 3',
    title: 'Como fazer um bolo',
    video_link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  },
  {
    name: 'Video 4',
    title: 'Aula de Matemática',
    video_link: 'https://www.youtube.com/watch?v=1z2TzAroY4U',
  },
  {
    name: 'Video 5',
    title: 'Viagem pelo Brasil',
    video_link: 'https://www.youtube.com/watch?v=2Vv-BfVoq4g',
  },
  {
    name: 'Video 6',
    title: 'Introdução à Programação',
    video_link: 'https://www.youtube.com/watch?v=V1Pl8CzNzCw',
  },
  {
    name: 'Video 7',
    title: 'História do Brasil',
    video_link: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  },
  {
    name: 'Video 8',
    title: 'Aula de Física',
    video_link: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  },
  {
    name: 'Video 9',
    title: 'Culinária Japonesa',
    video_link: 'https://www.youtube.com/watch?v=RgKAFK5djSk',
  },
  {
    name: 'Video 10',
    title: 'Como fazer exercícios em casa',
    video_link: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  },
  {
    name: 'Video 11',
    title: 'Documentário sobre a Amazônia',
    video_link: 'https://www.youtube.com/watch?v=1V_xRb0x9aw',
  },
  {
    name: 'Video 12',
    title: 'Dicas de fotografia',
    video_link: 'https://www.youtube.com/watch?v=E9kzeSgDuas',
  },
];

async function createVideo(video: Video) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `http://localhost:3000/video/addVideo`,
      video,
      config,
    );
    console.log('Vídeo criado com sucesso:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao criar vídeo:', error.response?.data);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}

async function sendVideoData() {
  for (const video of videoData) {
    await createVideo(video);
  }
}

sendVideoData();
