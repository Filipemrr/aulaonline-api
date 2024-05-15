import axios from 'axios';
import * as process from 'process';
import * as dotenv from 'dotenv';
dotenv.config();

const token = process.env.JWT_TOKEN;
interface Course {
  name: string;
}


const courseData: Course[] = [
  { name: 'Curso De Design' },
  { name: 'Curso De Programação' },
  { name: 'Curso De Marketing Digital' },
  { name: 'Curso De Gestão de Projetos' },
  { name: 'Curso De Fotografia' },
];


async function createCourse(course: Course) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `http://localhost:3000/course/createNewCourse`,
      course,
      config,
    );
    console.log('Curso criado com sucesso:', response.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Erro ao criar curso:', error.response?.data);
    } else {
      console.error('Erro desconhecido:', error);
    }
  }
}


async function sendCourseData() {
  for (const course of courseData) {
    await createCourse(course);
  }
}


sendCourseData();

