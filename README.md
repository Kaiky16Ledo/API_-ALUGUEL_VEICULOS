# 🚗 API de Gestão e Aluguel de Veículos

Bem-vindo ao sistema de controle da nossa Locadora de Veículos! 
Esta é uma **API RESTful** construída com as melhores práticas de mercado (Clean Architecture, Service Layer e Repository Pattern) para gerenciar carros, clientes, aluguéis e pagamentos de forma totalmente segura.

---

### 🛠️ 1. O que você precisa ter no computador?
Antes de começar, você precisa de duas ferramentas básicas instaladas:
* **Node.js**
* **Docker Desktop**
### 📥 2. Baixando o projeto
1. Abra o seu terminal.
2. Baixe este código para o seu computador digitando:
   ```bash
    https://github.com/Kaiky16Ledo?tab=repositories
   ```
   
3. Dependências

   O nosso projeto precisa baixar algumas peças extras da internet para funcionar. No terminal, dentro da pasta do projeto, digite:
   ```bash
    npm install
   ```
5. Senha 

   O nosso sistema precisa de uma senha secreta para se conectar ao banco de dados.

    1. Procure na pasta do projeto um arquivo chamado .env.

    2. Pronto! As configurações secretas já estão ajustadas para rodar no seu computador local.

6. Ligando Banco de Dados

    Certifique-se de que o Docker Desktop está aberto no seu computador. Agora, vamos mandar ele criar o banco de dados e as tabelas sozinhos. No terminal, digite:
   ```bash
    docker-compose up -d
   ```
7. Popular Banco de Dados
 
    Para ficar mais fácil de testar, eu criei um comando que já cadastra alguns carros, clientes e um administrador para você. Digite:
   ```bash
    npm run seed
   ```
8. Iniciar API
   
    Tudo pronto! Para finalmente ligar a API, digite:
   ```bash
    npm run dev
   ```
    Servidor estará rodando em: http://localhost:3000.

### 🎮 Como testar API:

1. Abra o seu navegador (Chrome, Edge, Safari, etc) e acesse: http://localhost:3000/api-docs
2. Você verá a tela verde do Swagger.
3. Vá na caixinha verde POST /api/v1/auth/login. Clique no botão Try it out (Tentar) e depois no botão azul grande Execute (Executar).
4. O sistema vai te devolver um texto gigante chamado Token. Copie apenas o texto do token.
5. Role a página lá para o topo, clique no botão Authorize (Autorizar), cole o seu token lá dentro e confirme.
6. Pronto! O cadeado vai se fechar e agora você tem acesso VIP para testar todos os botões do sistema: cadastrar carros novos, fazer um aluguel ou registrar pagamentos!

### 🏗️ Arquitetura e Tecnologias

. Node.js + Express.js
. PostgreSQL (com Docker)
. Zod (Para validação rigorosa de dados de entrada)
. Bcrypt & JWT (Para segurança e autenticação)
. Clean Architecture Simplificada (Controllers, Services, Repositories e Models separados).

### 📂 Documentação dos requisitos
   ```bash
    https://drive.google.com/drive/folders/1H1IUf494LgeiOvzVCjnhlMNjp4EF-cKi?usp=sharing
   ```
