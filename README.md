# KImóveis, imobiliária com TypeORM 

<div>
    <img align="center" alt="Krishna-Node" height="30" width="40" src="https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg">
    <img align="center" alt="Krishna-PSQL" height="30" width="40" src="https://www.vectorlogo.zone/logos/postgresql/postgresql-icon.svg">
     <img align="center" alt="Krishna-Ts" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-plain.svg">
</div>

# Introdução

KImóveis é um software de gerenciamento de imóveis que permite o cadastro de imóveis e de usuários interessados na aquisição de propriedades. Através da aplicação, é possível realizar o agendamento e consultar horários de visitas às propriedades disponíveis no banco de dados. 

Utilizei de várias tecnologias diferentes. O código foi desenvolvido em TypeScript, uma linguagem de programação que adiciona recursos ao JavaScript, como tipagem estática e interfaces. A serialização dos dados foi feita através da biblioteca zod, que é uma biblioteca de validação de esquemas para objetos JavaScript. Para a elaboração da API foi utilizado um banco de dados postgres e TypeORM.

Uma das principais vantagens do KImóveis é que ele utiliza o relacionamento entre 5 tabelas diferentes: users, addresses, categories, real_estate e schedules. Cada tabela contém informações específicas sobre os imóveis e os usuários interessados na aquisição de propriedades. Ao dividir as informações em várias tabelas e criar relações entre elas, você pode gerenciar as informações de forma mais eficiente e evitar a duplicação de dados.

# Inicialização do projeto
-  Você precisa ter o banco de dados postegresSQL e node.js  em sua máquina.
<a href='https://nodejs.org/en/download'>Node.js</a> | 
<a href='https://www.enterprisedb.com/downloads/postgres-postgresql-downloads'>PSQL</a>

-  Clone o repositório

```
git clone <URL-GITHUB>
```

-  Criar banco de dados postegres

`Conectado no terminal interativo do PostgreSQL (psql)`
```
psql -U postgres
```

`Postgres user default password`
```
1234
```


`Create Database`
```
CREATE DATABASE <name-your-database> ; 
```

`desconectar terminal interativo do PostgreSQL` 
```
ctrl + c
```

-  Criar arquivo .env 
```json
DATABASE_URL="postgres://<USER>:<PASS>@<HOST>:<PORT>/<DATABASE>"
SECRET_KEY="#%$*&**&&-09875$hddsa%TT"
```

```json
DATABASE_URL="postgresql://postgres:1234@localhost:5432/db_kimoveis"
```

-  Executar Migraçoens
```
npm run typeorm migration:run -- -d ./src/data-source
```

-  Instale a node modules

```
npm install
```

-  Rodar servidor
```
npm run dev
```

# Testes automatizados
-   Para executar os testes,  os arquivos  e configuração  do passo anterior devem ter sido finalizados.
-   Voce pode executar os testes com o comando `npm run test` ou `yarn test` a depender do gerenciador de pacotes usado. (`npm`)
-   Execute apenas a rota específica, com o comando `npm run test <pastaDentroDoIntegration>/<nomeDoArquivo>` como, por exemplo, rodando apenas a rota de criação de usuários: `npm run test users/createUser.route.spec.ts`



#  Base URL:

```
 localhost:3000
```

# Endpoints 
| Método | Endpoint                   | Responsabilidade                                  | Autenticação                           |
| ------ | -------------------------- | ------------------------------------------------- | -------------------------------------- |
| POST   | /users                     | Criação de usuário                                | Qualquer usuário, não necessita token  |
| GET    | /users                     | Lista todos os usuários                           | Apenas Admnistradores                  |
| PATCH  | /users/:id                 | Atualiza um usuário                               | Apenas Admnistradores ou dono da conta |
| DELETE | /users/:id                 | Realiza um soft delete no usuário                 | Apenas Admnistradores                  |
| POST   | /login                     | Gera o token de autenticação                      | Qualquer usuário, não necessita token  |
| POST   | /categories                | Criação de categoria                              | Apenas Admnistradores                  |
| GET    | /categories                | Lista todas as categorias                         | Qualquer usuário, não necessita token  |
| GET    | /categories/:id/realEstate | Lista todos imóveis que pertencem a uma categoria | Qualquer usuário, não necessita token  |
| POST   | /realEstate                | Criação de um imóvel                              | Apenas Admnistradores                  |
| GET    | /realEstate                | Lista todos os imóveis                            | Qualquer usuário, não necessita token  |
| POST   | /schedules                 | Agenda uma visita a um imóvel                     | Qualquer usuário, obrigatório token    |
| GET    | /schedules/realEstate/:id  | lista todos os agendamentos de um imóvel          | Apenas Admnistradores                  |

### Endpoints, Casos de sucesso

`POST /users - FORMATO DA REQUISIÇÃO`
Autenticação: Qualquer usuário, não necessita token
Responsabilidade:  Criação de usuário

```json
{
	"name": "superuser",
	"email": "superuser@mail.com",
	"password": "1234",
	"admin": true
}
```

###### Resposta:  Status code: 201 CREATED
```json
{
	"id": 2,
	"name": "superuser",
	"email": "superuser@mail.com",
	"admin": true,
	"createdAt": "2023-05-16",
	"updatedAt": "2023-05-16",
	"deletedAt": null
}
```

`GET /users - FORMATO DA REQUISIÇÃO`
Autenticação: Apenas Administradores
Responsabilidade: Lista todos os usuários
Não é necessario corpo de requisição

###### Resposta:  Status code: 200 
```json
[
	{
		"id": 1,
		"name": "Teste01111",
		"email": "teste123@teste.com",
		"admin": true,
		"createdAt": "2023-05-15",
		"updatedAt": "2023-05-15",
		"deletedAt": null
	},
	{
		"id": 2,
		"name": "superuser",
		"email": "superuser@mail.com",
		"admin": true,
		"createdAt": "2023-05-16",
		"updatedAt": "2023-05-16",
		"deletedAt": null
	}
]
```

`PATCH /users/:id - FORMATO DA REQUISIÇÃO`
Autenticação: Apenas Administradores ou dono da conta.
Responsabilidade: Atualiza um usuário
Deve ser capaz de atualizar tanto um quanto todos os dados de um usuário.

```json
{
    "name": "Super User",
}
```

###### Resposta:  Status code: 200 
```json
{
	"id": 2,
	"name": "Super User",
	"email": "superuser@mail.com",
	"admin": true,
	"createdAt": "2023-05-16",
	"updatedAt": "2023-05-16",
	"deletedAt": null
}
```


`DELETE /users/:id - FORMATO DA REQUISIÇÃO`
Autenticação: Apenas Administradores.
Responsabilidade: Faz o soft delete em um usuário.
Modifica a propriedade deletedAt da tabela de users para a data de desativação do usuario.

######  Resposta do servidor: Status code: 204



`POST /login - FORMATO DA REQUISIÇÃO`
Autenticação: Qualquer usuário, não necessita token
Responsabilidade: Gera o token de autenticação
```json
{
	"email": "superuser@mail.com",
	"password": "1234"
}
```

###### Resposta:  Status code: 200 
```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjg0MjUwNTM5LCJleHAiOjE2ODQzMzY5MzksInN1YiI6IjIifQ.0sOUZ_S575fEuRx9UggA6feh-8_-6FpgqNVYfv1xu1M"
}
```


`POST /categories - FORMATO DA REQUISIÇÃO`
Autenticação: Apenas Administradores
Responsabilidade: Criação de categoria

```json
{
	"name": "casa"
}
```

###### Resposta:  Status code: 201 CREATED 
```json
{
	"id": 1,
	"name": "casa"
}
```

`GET /categories - FORMATO DA REQUISIÇÃO`

Autenticação: Qualquer usuário, não necessita token
Responsabilidade: Listar categorias
Não é necessario corpo de requisição

###### Resposta:  Status code: 200
```json
[
	{
		"id": 1,
		"name": "casa"
	},
	{
		"id": 2,
		"name": "Apartamento"
	}
]
```

`GET /categories/:id/realEstate - FORMATO DA REQUISIÇÃO`
Autenticação: Qualquer usuário, não necessita token
Responsabilidade: Lista todos imóveis que pertencem a uma categoria
Não é necessario corpo de requisição

###### Resposta:  Status code: 200
```json

```


`POST /realEstate - FORMATO DA REQUISIÇÃO`
Autenticação: Apenas Administradores
Responsabilidade: Criação de um imóvel


```json
{
	"value": 100,
	"size": 1,
	"address": {
		"street": "Rua 01",
		"zipCode": "12354",
		"number": "167",
		"city": "São Paulo",
		"state": "SP"
	},
	"categoryId": 1
}
```

###### Resposta:  Status code: 201 CREATED 

```json
{
	"id": 1,
	"value": 100,
	"size": 1,
	"address": {
		"id": 1,
		"street": "Rua 01",
		"zipCode": "12354",
		"number": "167",
		"city": "São Paulo",
		"state": "SP"
	},
	"category": {
		"id": 1,
		"name": "casa"
	},
	"sold": false,
	"createdAt": "2023-05-16",
	"updatedAt": "2023-05-16"
}

```



`GET /realEstate - FORMATO DA REQUISIÇÃO`
Autenticação: Qualquer usuário, não necessita token
Responsabilidade: Lista todos os imóveis

```json
[
	{
		"id": 1,
		"value": 100,
		"size": 1,
		"address": {
			"id": 1,
			"street": "Rua 01",
			"zipCode": "12354",
			"number": "167",
			"city": "São Paulo",
			"state": "SP"
		},
		"sold": false,
		"createdAt": "2023-05-16",
		"updatedAt": "2023-05-16"
	},
	{
		"id": 2,
		"value": 100,
		"size": 1,
		"address": {
			"id": 2,
			"street": "Rua 02",
			"zipCode": "12354",
			"number": "972",
			"city": "Santa Catarina",
			"state": "SC"
		},
		"sold": false,
		"createdAt": "2023-05-16",
		"updatedAt": "2023-05-16"
	}
]

```


`POST /schedules - FORMATO DA REQUISIÇÃO`

Autenticação: Qualquer usuário, obrigatório token
Responsabilidade: Agenda uma visita a um imóvel


```json
{
	"date": "2023-10-04",
	"hour": "11:30",
	"realEstateId": 1
}
```

###### Resposta:  Status code: 201 CREATED 
```json
{
	"message": "Schedule created"
}
```


`GET /schedules/realEstate/:id - FORMATO DA REQUISIÇÃO`

Autenticação: Apenas Administradores
Responsabilidade: lista todos os agendamentos de um imóvel
Não é necessario corpo de requisição


```json
{
	"schedules": []
}
```


### Endpoints, Casos de erro