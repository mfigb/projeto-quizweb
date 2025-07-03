/* * quiz-app/public/ranking.js
 * Script para carregar e exibir a classificação das pontuações do questionário.
 * Ele busca dados do servidor e atualiza a tabela HTML.
 */
// Este script destina-se a ser usado em conjunto com um arquivo HTML que possui uma tabela com
// o ID 'ranking-table' e um tbody com o ID 'ranking-body'.
async function loadRanking() {
    try {
        // Faz uma requisição para a API que retorna o ranking
        const res = await fetch('http://localhost:3000/api/ranking');
        const ranking = await res.json();

        // Verifica se a resposta é válida
        const rankingBody = document.getElementById('ranking-body');
        rankingBody.innerHTML = '';
// Se não houver dados, exibe uma mensagem
        ranking.forEach((item, index) => {
            const row = document.createElement('tr');

            // Preenche a linha com os dados do ranking
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.user_name}</td>
                <td>${item.score}</td>
                <td>${new Date(item.date).toLocaleString()}</td>
            `;

            rankingBody.appendChild(row);
        });
        // Se não houver dados, exibe uma mensagem
    } catch (error) {
        console.error('Erro ao carregar ranking:', error);
        const rankingBody = document.getElementById('ranking-body');
        rankingBody.innerHTML = '<tr><td colspan="4">Erro ao carregar ranking.</td></tr>';
    }
}

loadRanking();
