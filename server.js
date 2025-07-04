/* * Quiz App - Backend
 * Este é o backend do Quiz App, que fornece uma API para gerenciar perguntas, resultados e ranking.
 * Utiliza Node.js, Express e MySQL.
 */ 
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;


/* Configuração do banco de dados MySQL
 * O banco de dados e as tabelas devem estar criados conforme o esquema fornecido.
 * As credenciais devem ser ajustadas conforme o ambiente.
 */
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

/* Conexão com o banco de dados MySQL
 * Verifica se a conexão foi bem-sucedida e exibe uma mensagem no console.
 */
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

/* Configuração do Express
 * Configura o middleware para permitir CORS, processar JSON e servir arquivos estáticos.
 */ 
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* Rota principal
 * Serve o arquivo HTML de login quando a raiz do servidor é acessada.
 * O arquivo deve estar localizado na pasta 'public'.
 */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

/* Rota para buscar perguntas
 * Retorna todas as perguntas do banco de dados, ordenadas por ID.
 * A resposta é enviada no formato JSON.
 */ 
app.get('/api/questions', (req, res) => {
    const sql = `SELECT * FROM questions ORDER BY id ASC`;
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar perguntas:', err);
            res.status(500).json({ error: 'Erro ao buscar perguntas' });
        } else {
            res.json(results);
        }
    });
});

/* Rota para salvar resultados
 * Recebe os dados do usuário, pontuação, total de perguntas, respostas corretas e incorretas.
 * Insere esses dados na tabela 'results' do banco de dados.
 * Retorna uma mensagem de sucesso ou erro.
 */
app.post('/api/results', (req, res) => {
    const { user_name, score, total_questions, correct_answers, wrong_answers } = req.body;

    if (!user_name || score == null) {
        return res.status(400).json({ error: 'Dados inválidos' });
    }
/* SQL para inserir o resultado do quiz
 * Insere os dados recebidos na tabela 'results'.
 * Utiliza placeholders (?) para evitar SQL Injection.
 * A data é automaticamente definida pelo MySQL.
 */
    const sql = `
        INSERT INTO results (user_name, score, total_questions, correct_answers, wrong_answers)
        VALUES (?, ?, ?, ?, ?)
    `;
/* Executa a query de inserção
 * Passa os dados do usuário, pontuação, total de perguntas, respostas corretas e incorretas.
 * Se ocorrer um erro, retorna um status 500 com uma mensagem de erro.
 * Se a inserção for bem-sucedida, retorna um status 201 com uma mensagem de sucesso e o ID do resultado inserido.
 */ 
    connection.query(sql, [user_name, score, total_questions, correct_answers, wrong_answers],
        (err, result) => {
            if (err) {
                console.error('Erro ao salvar resultado:', err);
                res.status(500).json({ error: 'Erro ao salvar resultado' });
            } else {
                res.status(201).json({ message: 'Resultado salvo', id: result.insertId });
            }
        });
});

/* Rota para buscar ranking
 * Retorna os 10 melhores resultados do quiz, ordenados pela pontuação (score)
 * Se houver empate, os resultados são ordenados pela data de inserção.
 * A resposta é enviada no formato JSON.
 */
app.get('/api/ranking', (req, res) => {
    const sql = `
        SELECT user_name, score, date
        FROM results
        ORDER BY score DESC, date ASC
        LIMIT 10
    `;

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar ranking:', err);
            res.status(500).json({ error: 'Erro ao buscar ranking' });
        } else {
            res.json(results);
        }
    });
});

/* Inicia o servidor Express
 * O servidor escuta na porta definida (3000 por padrão).
 * Exibe uma mensagem no console quando o servidor está rodando.
 */ 
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
