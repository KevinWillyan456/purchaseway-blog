# Purchaseway Blog

Este é um aplicativo web para uma rede social, criado com o objetivo de fornecer uma plataforma onde os usuários possam se conectar e compartilhar seus interesses e experiências. Foi desenvolvido utilizando React com TypeScript para o frontend, Node.js com TypeScript para o backend, e MongoDB como banco de dados. O aplicativo permite que os usuários se cadastrem, façam login, postem conteúdo e muito mais. Ele foi desenvolvido utilizando as seguintes tecnologias:

- **Frontend:**
  - React com TypeScript
  - React Router DOM
  - React Bootstrap
  - Axios
  - Bootstrap
  - Date-fns
  - Js-cookie
  - React-oauth/google

- **Backend:**
  - Node.js com TypeScript
  - Express
  - MongoDB
  - Mongoose
  - Bcryptjs
  - Cors
  - Jsonwebtoken
  - Uuid

## Como fazer a instalação local

Antes de começar, certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.

1. Faça o clone e instalação do backend localmente seguindo todos os passos da documentação, ele está disponível neste repositório:
 [purchaseway-blog-backend](https://github.com/KevinWillyan456/purchaseway-blog-backend)

2. Clone o repositório:

   ```bash
   git clone https://github.com/KevinWillyan456/purchaseway-blog.git
   ```

3. Acesse o diretório do projeto:

   ```bash
   cd purchaseway-blog
   ```

4. Instale as dependências:

   ```bash
   npm install
   ```

5. Atenção: Crie um arquivo `.env.local`. O arquivo deve ser nomeado exatamente desta forma.

   ```bash
   touch .env.local
   ```

6. Defina as variáveis de ambiente dentro do arquivo `.env.local`, defina suas variáveis de ambiente no formato `NOME_DA_VARIAVEL=VALOR`.

   ```plaintext
   # API configuration
   VITE_API_URL=sua_url_backend
   VITE_API_KEY=sua_chave_backend

   # Google Auth
   VITE_GOOGLE_CLIENT_ID=seu_client_id
   ```

7. Inicie o servidor:

   ```bash
   npm run dev
   ```

8. Acesse o aplicativo em seu navegador em [http://localhost:5173](http://localhost:5173)

## Capturas de Tela

![tela-inicial](https://github.com/KevinWillyan456/purchaseway-blog/assets/115520107/ee3db6b8-8c92-4262-9231-b00ad2b0455d)
_Tela inicial_

![tela-singin](https://github.com/KevinWillyan456/purchaseway-blog/assets/115520107/b390a3b3-159d-48fe-a562-f0c27874cd0f)
_Tela de Cadastro_

![tela-login](https://github.com/KevinWillyan456/purchaseway-blog/assets/115520107/a3f7adca-e5ae-493b-8422-4aa219592709)
_Tela de login_

![tela-dashboard](https://github.com/KevinWillyan456/purchaseway-blog/assets/115520107/544e6b68-155c-46d1-b9d6-e1553ac45ed1)
_Tela do dashboard_
