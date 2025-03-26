<p align="center">
  <img src="https://github.com/user-attachments/assets/9d1babb3-8010-4616-81c1-06585e787cb5" alt="Dwella API"/>
</p>

#

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Dwella: Encontre o imóvel ideal para você enquanto estuda.**  

Esta é uma API backend, escrita em **TypeScript** com **Express.js**, projetada para conectar locadores e estudantes em busca de acomodações como quartos, kitnets, apartamentos e mais.

## 🤔 Sobre o Projeto

Iniciado a partir de um projeto acadêmico, Dwella evoluiu para oferecer uma experiência prática com **TypeScript** e **Express.js**, focando em autenticação segura, gestão de usuários e gerenciamento completo de acomodações.

## ✨ Funcionalidades Principais

Embora ainda em evolução, a Dwella API almeja oferecer:

*   🔑 **Autenticação Segura:** Usando JWT e Argon2 para que senhas e sessões estejam mais seguras.
*   👤 **Gestão de Usuários:** Perfis distintos para Locadores e Locatários.
*   🏠 **Gerenciamento de Acomodações:** CRUD completo para que locadores possam exibir suas propriedades.
*   🔍 **Busca e Filtragem (Em breve!):** Para ajudar estudantes a encontrar o lugar perfeito.
*   🔗 **Suporte a Subdomínios:** Usando `express-subdomain` para futuras expansões.

## 🚀 Tecnologias Utilizadas

Construída com as seguintes tecnologias:

*   **Node.js(`@23.10`):** O motor que faz tudo rodar.
*   **TypeScript:(`@5.5`)** Porque tipagem estática é vida.
*   **Express.js (`@5`)**: Nosso framework web minimalista e flexível.
*   **MySQL2 (`@3.14`)**: Para guardar nossos dados em um banco relacional confiável.
*   **Zod (`@3.24.2`)**: Validação de schemas é essencial.
*   **node-rs/argon2 (`@2.0.2`)**: Para hash de senhas.
*   **jsonwebtoken (`@9.0.2`)**: Gerenciando a identidade dos nossos usuários com JWT.
*   **express-subdomain (`@1.0.6`)**: Para brincar de gente grande com subdomínios.

## ⚙️ Como Rodar a Aplicação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/gabuito/dwella.git
    cd dwella
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    # Ou, se preferir, utilize Yarn:
    # yarn install
    ```

3.  **Configure as Variáveis de Ambiente:**
    *   Crie manualmente seu arquivo `.env`, definindo as variáveis necessárias (dados de conexão com o MySQL, segredo para o JWT etc.).  
        Exemplo:
        ```bash
        # Crie seu .env e configure:
        DB_HOST=localhost
        DB_USER=seu_usuario
        DB_PASSWORD=sua_senha
        DB_NAME=nome_do_banco
        JWT_SECRET=sua_chave
        # ...outras variáveis...
        ```
    *   **Atenção:** Não compartilhe seu arquivo `.env`.

4.  **Configure o Banco de Dados:**
    *   Garanta que um servidor MySQL esteja em execução e as credenciais estejam corretas conforme definidas no seu `.env`.
    *   Crie o banco de dados especificado.

5.  **Execute a Aplicação:**
    *   Para ambiente de desenvolvimento (com hot-reload):
        ```bash
        npm run dev
        ```
    *   Para produção:
        ```bash
        npm run build # Compila o TypeScript para JavaScript
        npm start     # Executa a versão compilada
        ```

6.  **Acesse a API:** A API estará disponível em `http://api.localhost:PORTA` (verifique a porta configurada).

## 📖 Endpoints da API

A documentação completa dos endpoints está em desenvolvimento. Enquanto isso, os mais aventureiros podem dar uma olhada diretamente no código, principalmente na pasta `src/global.routes`.

*Swagger/OpenAPI em breve*

## 🤝 Quer Contribuir?

Dwella nasceu do aprendizado e adoraria continuar crescendo com a ajuda da comunidade! Se você tem ideias, encontrou um bug, quer refatorar algo, ou melhorar a documentação:

1.  Faça um **Fork** deste repositório.
2.  Crie uma **Branch** para sua feature/correção (`git checkout -b feature/MinhaFeatureIncrivel` ou `fix/CorrigeBugChato`).
3.  Faça seus **Commits** (seguindo os [Conventional Commits](https://www.conventionalcommits.org/)).
4.  Faça o **Push** da sua Branch (`git push origin feature/MinhaFeatureIncrivel`).
5.  Abra um **Pull Request** detalhando suas mudanças.

Toda contribuição é bem-vinda! Desde corrigir um erro de digitação até adicionar uma funcionalidade complexa. Só pedimos: **tente não quebrar a build!**

## 📜 Licença

Este projeto é licenciado sob a **Licença MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

**Obrigado por dar uma olhada na Dwella! Esperamos que seja útil para você!**
