import axios from 'axios';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.JWT_TOKEN
interface Aula {
  name: string;
  link: string;
  courseID: number;
}
const aulaData: Aula[] = [
  {
    name: 'Introdução ao Design',
    link: 'http://exemplo.com/design101',
    courseID: 1,
  },
  {
    name: 'Avançado em Design',
    link: 'http://exemplo.com/design201',
    courseID: 1,
  },
  {
    name: 'Programação para Iniciantes',
    link: 'http://exemplo.com/programming101',
    courseID: 2,
  },
  {
    name: 'Programação Intermediária',
    link: 'http://exemplo.com/programming201',
    courseID: 2,
  },
  {
    name: 'Programação Avançada',
    link: 'http://exemplo.com/programming301',
    courseID: 2,
  },
  {
    name: 'Fundamentos do Marketing Digital',
    link: 'http://exemplo.com/marketing101',
    courseID: 3,
  },
  {
    name: 'Marketing de Conteúdo',
    link: 'http://exemplo.com/marketing201',
    courseID: 3,
  },
  {
    name: 'Introdução à Gestão de Projetos',
    link: 'http://exemplo.com/project101',
    courseID: 4,
  },
  {
    name: 'Gestão de Projetos Avançada',
    link: 'http://exemplo.com/project201',
    courseID: 4,
  },
  {
    name: 'Fotografia para Iniciantes',
    link: 'http://exemplo.com/photo101',
    courseID: 5,
  },
  {
    name: 'Técnicas Profissionais de Fotografia',
    link: 'http://exemplo.com/photo201',
    courseID: 5,
  },
];

async function createAula(aula: Aula) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `http://localhost:3000/aula/newAula`,
      aula,
      config,
    );
    console.log('Aula criada com sucesso:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao criar video:', error.response?.data);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}
async function sendAulaData() {
  for (const aula of aulaData) {
    await createAula(aula);
  }
}

sendAulaData();