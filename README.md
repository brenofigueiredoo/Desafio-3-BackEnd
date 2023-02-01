# Sobre o projeto

A aplicação consiste em realizar o cadastro de clientes, sendo que um cliente poderá conter muitos contatos associados à ele.

# Como instalar e rodar a aplicação

1- Clone o repositório para a sua máquina

2- Instale todas as dependências:
```
yarn install ou npm install
```

3- Crie um arquivo .env - siga o exemplo .env.example

4- Rode as migrations:
```
yarn typeorm migration:run -d src/data-source.ts
```

5- Pra rodar a aplicação:
```
yarn dev
```

# Rotas
O workspace com todas as requisições se encontra na pasta raiz da aplicação para que se possa ser importada no insominia

BASE_URL: http://localhost:3001

## Rotas de Clients
1- Criar Client
  - POST /clients
  - Não precisa de autorização
  - Exemplo do body: 
  ```
  {
    "name": "breno",
    "email": "breno@email.com",
    "password": "1234",
    "phone": "38921020621"
  }
  ```

2- Listar Client
  - GET /clients/me
  - Precisa de autorização
 
3- Atualizar Client
  - PATCH /clients/me
  - Precisa de autorização
  - Exemplo do body:
  ```
  {
    "name": "new name",
    "email": "newemail@email.com",
    "password": "new password",
    "phone": "38924620390"
  }
  ```

4- Deletar Client
  - DELETE /clients/me
  - Precisa de autorização

## Rota de login
1- Fazer login
  - POST /login
  - Exemplo do body:
  ```
  {
    "email": "newexample@email.com",
    "password": "1234"
  }
  ```

## Rotas de Contacts
1- Criar Contact
  - POST /contacts
  - Precisa de autorização
  - Exemplo do body:
  ```
  {
    "name": "contact",
    "email": "contact@email.com",
    "phone": "38921020333"
  }
  ```
 
2- List Contacts
  - GET /contacts
  - Precisa de autorização
 
3- Atualizar Contact
  - PATCH /contacts/:id
  - Precisa de autorização
  - Exemplo do body:
  ```
  {
    "name": "contact changed",
    "email": "contact _changed@email.com",
    "phone": "38921020902"
  }
  ```

4- Deletar Contact
  - DELETE /contacts/:id
  - Precisa de autorização
