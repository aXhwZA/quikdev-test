# Meu Projeto

Este projeto utiliza os seguintes frameworks e ferramentas:

- [Nest](https://nestjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [React](https://pt-br.reactjs.org/)
- [Tailwind](https://tailwindcss.com/)

## Documentação dos Frameworks

Para mais informações sobre como usar, consulte suas respectivas documentações:

- [Documentação do Nest](https://docs.nestjs.com/)
- [Documentação do Mongoose](https://mongoosejs.com/docs/guide.html)
- [Documentação do React](https://pt-br.reactjs.org/docs/getting-started.html)
- [Documentação do Tailwind](https://tailwindcss.com/docs)

## Disclaimer

Este projeto ainda não está pronto, mas já está em um estado funcional.
Terei que viajar no final de semana, e não terei tempo de terminar o projeto...

## Como Executar o projeto

Primeiramente, será necessário gerar o arquivo .env no ```server```, com as seguintes variáveis:

```
DATABASE_URL="mongodb+srv://danielmedeiros:xm4QJ5z0HAMbrm1L@cluster0.itnlx.mongodb.net/quickDev-test?ssl=true&authSource=admin"
SECRET_KEY="too-secret-for-github"
```

Nao se preocupe com a segurança no momento, pois é apenas um teste.

Após isso, basta executar os seguintes comandos no seu VSCODE

```bash
CTRL + SHIFT + P
```

```bash
>Tasks: Run Task
```

```bash
RUN ALL
```

O comando será responsavel por instalar todas as dependencias do projeto, tanto do ```server``` quanto do ```app```, e executar os dois projetos em paralelo.

## Postman

O arquivo postman está na raiz do projeto, na pasta ```postman collection```, basta importar no seu postman e testar as rotas.

Aviso que será necessário gerar a variável ```token``` para testar as rotas de ```/users```, pois elas são protegidas por autenticação.

## To Do List

- [x] Criar o Readme.md
- [x] Criar o banco de dados
- [x] Criar o modelo de usuário
- - [x] Editar um usuário
- [x] Criar o modelo de post
- [x] Criar o modelo de comentário
- [x] Criar um sistema de autenticação
- - [x] Validar Email
- [x] Postagem tenha a possibilidade de adicionar uma imagem;
- [x] Usuário da postagem também pode remover o comentário;
- [x] Crie uma rota que gere um relatório;
- - [x] Título do post;
- - [x] Quantidade de comentários;
