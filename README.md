<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Funcionalidades Implementadas

1. CRUD completo para as entidades: Empresas (Company), Produtos (Product), Responsáveis (Responsible)

2. Documentação da API no Swagger, detalhando: Todos os endpoints (create, read, update, delete), possíveis respostas e erros de cada rota, contratos de entrada e saída (DTOs), validação de dados robusta com class-validator e uso de DTOs para garantir segurança e integridade dos dados recebidos, DTOs de resposta (Response DTOs) para padronizar e proteger o contrato exposto ao consumidor da API.

3. Paginação nos endpoints de listagem (GET /products, GET /companies, GET /responsibles) para garantir performance e usabilidade mesmo com grandes volumes de dados.

4. Conversão de tipos do Prisma (Decimal → number) nas respostas da API para manter o contrato limpo e alinhado com o padrão OpenAPI.

5. Padronização dos arquivos em kebab-case para melhor organização e legibilidade.

6. Centralização da integração com o banco de dados através do DatabaseModule, garantindo uma única conexão do Prisma com o banco (evita múltiplas instâncias e facilita manutenção).

7. Verificação de existência de entidades relacionadas antes de criar ou atualizar registros (ex: só permite criar produto se a empresa existir), prevenindo erros de integridade e melhorando a experiência do usuário.

## Instalação

```bash
$ npm install
```

## Executando o APP

**Rodar local**

```bash
# Comentar a variável de ambiente na .env que se refere a rodar com Docker Compose.

DATABASE_URL=mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}

# Cria as tabelas no banco.
$ npx prisma db push

# Executar os seeds.
$ npm run seed

# Comando para rodar em desenvolvimento (já executa o build).
$ npm run start:dev

# Comando para rodar em produção (já executa o build).
$ npm run start:prod
```

**Rodar via Docker Compose em DEV**

```bash
# Comentar a variável de ambiente na .env que se refere a rodar local.

DATABASE_URL=mysql://<user>:<password>@<host>:<db_port>/<db_name>

# Subir os containers.
$ docker-compose -f docker-compose.dev.yml up -d

# Acessar o container.
$ docker exec -it backend_application bash

# Cria as tabelas no banco.
$ npx prisma db push

# Executar os seeds.
$ npm run seed

# Comando para rodar em desenvolvimento (já executa o build).
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
