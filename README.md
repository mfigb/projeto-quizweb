#  ![image](https://github.com/user-attachments/assets/a6d74faf-3c5b-4f47-946c-2e376bb2b4b2)  Projeto QuizWeb
Este projeto consiste em uma aplicação web interativa que permite ao usuário testar seus conhecimentos sobre Programação para Web. O sistema foi desenvolvido utilizando HTML, CSS, JavaScript (frontend) e Node.js com MySQL (backend).


## 🎯 Objetivo
Desenvolver uma aplicação de quiz com feedback explicativo e ranking de pontuação, com o objetivo de promover o aprendizado por meio da prática interativa.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript  
- **Backend**: Node.js, Express.js, MySQL (via mysql2)  
- **Ferramentas**: Visual Studio Code, MySQL Workbench, NPM  

 
    ## ⚙️ Etapas do Desenvolvimento

### 1. Instalação das ferramentas

- [x] MySQL Workbench
- [x] Node.js
- [x] Visual Studio Code

### 2. Instalação dos módulos via NPM 

npm install express mysql2 cors

### 3. Criação do banco de dados

O banco de dados quizweb foi criado com duas tabelas principais:

**questions**: destinada ao armazenamento das perguntas, respostas e explicações do quiz.

```sql
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_text VARCHAR(800) NOT NULL,
    option_a VARCHAR(500) NOT NULL,
    option_b VARCHAR(500) NOT NULL,
    option_c VARCHAR(500) NOT NULL,
    option_d VARCHAR(500) NOT NULL,
    correct_option CHAR(1) NOT NULL,
    explanation LONGTEXT NOT NULL
);
``` 

**results**: utilizada para registrar os nomes dos participantes e suas pontuações ao final do quiz.
```sql
CREATE TABLE results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    correct_answers INT NOT NULL,
    wrong_answers INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

As perguntas, respostas e explicações foram inseridas por meio de um script SQL, elaborado no Notepad e salvo com a extensão sql. Esse script foi executado no MySQL Workbench, o que facilitou a inserção automatizada dos dados iniciais no banco.

```sql
INSERT INTO questions (question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
'Diversos componentes são incorporados nas aplicações que obedecem às especificações JEE. Com relação à função do serviço JAAS, assinale a alternativa CORRETA:',
'Definir as configurações da camada de negócio, simplificando as alterações no layout.',
'Aplicar o protocolo HTTPS para encriptar as requisições dos usuários.',
'Fornecer mecanismos de autenticação e autorização aos usuários.',
'Habilitar a criação de aplicações dinâmicas por meio do uso de AJAX.',
'C',
'O JAAS (Java Authentication and Authorization Service) é uma API padrão do Java que faz parte da plataforma JEE (Java Enterprise Edition). Sua principal função é exatamente prover um framework robusto para autenticação e autorização dentro de aplicações Java. Permite integração com bancos de dados, LDAP, entre outros.'
),
```


### 4. Estrutura de diretórios

```sql
├── /public
│ ├── index.html  ==> Tela inicial
│ ├── quiz.html ==> Tela do quiz
│ ├── result.html ==> Tela de resultados
│ ├── ranking.html ==> Tela de ranking
│ ├── style.css ==> Estilos visuais
│ ├── script.js ==> Lógica do quiz (carregar perguntas, registrar respostas e calcular pontuação)
│ └── ranking.js ==> Lógica do ranking
├── server.js  ==> Backend Node.js + API + MySQL
├── package.json ==> Dependências do projeto
└── /node_modules ==> Módulos instalados via NPM
```

## ⚙️ Funcionamento da Aplicação

A aplicação é composta por um servidor Node.js com Express e um banco de dados MySQL local. O funcionamento básico é descrito a seguir:

### 🔌 Servidor Backend

- Servidor HTTP criado com **Express**, escutando na **porta 3000**.
- Conexão com o **MySQL local** utilizando credenciais definidas no código (`usuário`, `senha`, `banco`).

### 🔧 Middlewares Configurados

- `cors()` – permite requisições de diferentes origens.
- `express.json()` – interpreta corpos de requisições no formato JSON.
- `express.static('public')` – serve arquivos estáticos da pasta `public`.

### 📥 Carregamento de Perguntas

- As perguntas são obtidas via requisição HTTP GET para o backend (servidor Node.js), que consulta o banco de dados MySQL, recupera os dados da tabela questions e retorna uma resposta em formato JSON contendo as perguntas ao frontend.


### 🧠 Execução do Quiz

- Usuário responde às perguntas interativamente.
- Sistema calcula automaticamente:
- Pontuação final
- Número de acertos
- Número de erros

### 💾 Armazenamento dos Resultados

 Resultados enviados para o backend:
- `user_name`
- `score`
- `total_questions`
- `correct_answers`
- `wrong_answers`
- A **data da tentativa** é gerenciada automaticamente com `CURRENT_TIMESTAMP`.

### 🏆 Exibição do Ranking

  - Top 10 resultados recuperados pela rota:
  - Resultados ordenados por pontuação e data (decrescente).


## 📡 Principais Rotas da API

| Método | Rota             | Descrição |
|--------|------------------|-----------|
| GET    | `/`              | Retorna a página de login (`login.html`). |
| GET    | `/api/questions` | Retorna todas as perguntas cadastradas no banco. |
| POST   | `/api/results`   | Armazena o resultado de um participante. |
| GET    | `/api/ranking`   | Retorna os 10 melhores resultados. |

## 🚀 Como Executar o Projeto Localmente

### 1.Clone o repositório:

git clone https://github.com/mfigb/projeto-quizweb.git

### 2.Instale as dependências:

npm install

### 3.Configure o banco de dados:

- Crie o banco quizweb no MySQL.
- Execute os comandos SQL acima para criar as tabelas.

### 4.Inicie o servidor:

node server.js

### 5.Acesse no navegador:

http://localhost:3000

## 📝 Licença
Projeto acadêmico desenvolvido para fins de aprendizado.
Criado por Mônica Figueirôa, 2025.








