# Documentação dos Endpoints
Este arquivo contém um guia dos endpoints disponíveis na API, Antes de tudo se atente a ler a userStories e analisar o Schema do Banco de Dados, anexados em PDF.

# Padrao De Resposta
Nesta API todas as requisições vem com uma Resposta Padrão, todas as requisições devolvem um json com o seguinte formato 

    {
	      "statusCode": o status da requisição  ,
	      "message": uma mensagem sobre a requisicao ,
	      "data": quando for um get, retorna um ou mais objetos, quando for um post retorna null. 
    }

# /users

---

### - Registra um Usuário (POST /create)
> Este endpoint é usado para registrar um novo usuário no sistema.
> #### Parâmetros - (Body)
> - `email`: O email do novo usuário.
> - `name`: O nome do novo usuário.
> - `password`: A senha do novo usuário.

### - Checa Login e Senha do Usuário (POST /login)
> Este endpoint é usado para verificar as credenciais de um usuário, para fazer o login do mesmo. Ele confere no banco de dados se o usuário e senha são compatíveis.
> #### Parâmetros - (Body)
> - `email`: O email do usuário a ser verificado.
> - `password`: A senha do usuário a ser verificado.

### - Recupera Todos os Usuários (GET /getUser)
> Este endpoint  devolve as informações do usuario logado.
> #### Parâmetros - (Bearer Token)
> - `Bearer Token`: O Token que eh gerado quando usuario faz o login.

# /trilha

---

### - Cria uma Nova Triha na Plataforma (POST /createNewTrilha)
> Adiciona uma nova trilha na Plataforma
> #### Parâmetros - (body)
> - `name`: O nome da Trilha.

### - Recupera todas as trilhas do Sistema (GET /allTrilhas)
> Busca todas as trilha do Sistema.

### - Recupera todos os cursos que contém uma trilha (GET /getAulasOfTrilhas)
> Busca todos os cursos de uma Trilha.

### - Recupera todas os cursos que contém uma trilha (GET /getAulasOfTrilhas)
> Busca todas os cursos de uma trilha.
> > #### Parâmetros - (body)
> - `trilhaID`: O ID da Trilha.


# /course

---

### - Cria um Novo Curso na Plataforma (POST /createNewCourse)
> Adiciona um novo curso na Plataforma
> #### Parâmetros - (body)
> - `name`: O nome do Curso.

### - Recupera todos os cursos do Sistema (GET /allCourses)
> Busca todos os cursos no Sistema.
> #### Resposta
> - **Status 200**: `Busca Feita Com Sucesso`. Retorna uma lista dos cursos do sistema e o ID dos cursos.


# /aula

---

### - Adiciona uma Nova Aula (POST /newAula)
> Permite a criação de uma nova aula sempre associada a um curso específico, obrigatoriamente.
> #### Parâmetros - (body)
> - `name`: O nome da Nova Aula
> - `link`: O link da aula
> - `courseID`: O ID do curso (Inteiro)

### - Recupera Todas as Aulas de Um Curso (GET /allAulasOfCourse)
> Retorna todas as aulas de uma curso pelo ID do mesmo.
> #### Parâmetros - (body)
> - `courseID`: O ID do curso (Inteiro)

# /rating

---

### - Posta uma avaliação de 0 a 5 sobre uma Aula (POST /newRating)
> #### Parâmetros - (Body)
> - `stars`: Quantas estrelas o usuario deu para o curso, de 0 a 5 (numeros inteiros)
> - `aulaID`: O ID da Aula avaliada.

### - Resgata uma lista com todas as Avaliações sobre uma aula específica (GET /getAllRatingsByClass)
> #### Parâmetros - (Body)
> - `aulaID`: O ID da Aula.


# /comment

---

### - Posta um comentário sobre uma Aula (POST /newComment)
> #### Parâmetros - (Body)
> - `comment`: Comentário
> - `aulaID`: O ID da Aula comentada.

### - Resgata uma lista com todos os comentarios sobre uma aula específica (GET /getCommentsByAula)
> #### Parâmetros - (Body)
> - `aulaID`: O ID da Aula.



