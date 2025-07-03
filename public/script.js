/*Quiz Application Script
Este script gerencia a lógica do quiz, incluindo o carregamento das perguntas, a exibição das mesmas, a verificação das respostas e o envio dos resultados.
Ele também gerencia as sessões dos usuários e exibe os resultados do quiz ao final.
*/
//Aguarda o carregamento do DOM antes de executar o script
document.addEventListener('DOMContentLoaded', function () {
    
    // Seleciona os elementos do DOM
    const quizContainer = document.getElementById('quiz-container');
    const nextButton = document.getElementById('next-button');

    // Variáveis para gerenciar o estado do quiz
    let currentQuestion = 0;
    let questions = [];

    let score = 0;
    let correctAnswers = 0;
    let wrongAnswers = 0;

    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    
    // Se não estiver logado, redireciona para a página de login
    if (!userName) {

      // Exibe um alerta e redireciona para a página de login
        alert('Nome de usuário não encontrado. Retornando para a tela de login.');
        window.location.href = 'login.html';
        return;
    }

    // Lógica para carregar as perguntas
    async function loadQuestions() {
        try {

            // Faz uma requisição para obter as perguntas do backend
            const res = await fetch('http://localhost:3000/api/questions');
            questions = await res.json();

            // Verifica se as perguntas foram carregadas corretamente
            if (!questions.length) {
                quizContainer.innerHTML = "<p> Nenhuma pergunta encontrada no banco de dados.</p>";
                return;
            }
// Exibe a primeira pergunta
            currentQuestion = 0;
            score = 0;
            correctAnswers = 0;
            wrongAnswers = 0;
            
            showQuestion();

           // Exibe uma mensagem se não houver perguntas
        } catch (error) {
            quizContainer.innerHTML = "<p>❌ Erro ao carregar as perguntas.</p>";
            console.error('Erro ao carregar perguntas:', error);
        }
    }
// Inicia o carregamento das perguntas
    loadQuestions();

    // Exibe a pergunta atual
function showQuestion() {
    const q = questions[currentQuestion];

    // Verifica se a pergunta existe
    if (!q) {
        console.error("❌ Pergunta não encontrada no índice:", currentQuestion);
        return;
    }
// Renderiza a pergunta e as opções no DOM
    quizContainer.innerHTML = `
        <h2>${q.question_text}</h2>
        <div class="options">
            <button class="option-button" data-option="A">${q.option_a}</button>
            <button class="option-button" data-option="B">${q.option_b}</button>
            <button class="option-button" data-option="C">${q.option_c}</button>
            <button class="option-button" data-option="D">${q.option_d}</button>
        </div>
        <div id="explanation" class="explanation"></div>
    `;

    // Esconde o botão "Próxima" inicialmente
    nextButton.style.display = 'none';

   /* Seleciona todos os botões de opção e adiciona o evento de clique
    para verificar a resposta selecionada*/
    const optionButtons = document.querySelectorAll('.option-button');

    /* Adiciona o evento de clique a cada botão de opção */
    optionButtons.forEach(button => {
        button.addEventListener('click', () => checkAnswer(button.dataset.option, optionButtons, q));
    });
        console.log(`Exibindo pergunta ${currentQuestion + 1}`);
    }

   /* Verifica a resposta selecionada e
 desabilita os botões de opção e exibe a explicação*/
function checkAnswer(selected, buttons, q) {
    buttons.forEach(btn => btn.disabled = true);

    /* Verifica se a resposta selecionada está correta
    e exibe a explicação correspondente*/
    const explanationDiv = document.getElementById('explanation');
    if (selected === q.correct_option) {
        explanationDiv.innerHTML = `<p class="correct">✅ Resposta correta!</p><p>${q.explanation}</p>`;
        score++;
        correctAnswers++;

    } else {
        explanationDiv.innerHTML = `<p class="incorrect">❌ Resposta incorreta.</p><p>${q.explanation}</p>`;
        wrongAnswers++;
    }
// Exibe o botão "Próxima" após a resposta ser verificada
    nextButton.style.display = 'block';
}

    // Evento para o botão "Próxima"
    nextButton.addEventListener('click', () => {
        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    });

    /* Função para finalizar o quiz e exibir o resultado
    Exibe o nome do usuário, a pontuação e links para ver detalhes do resultado e ranking */
    function finishQuiz() {
        quizContainer.innerHTML = `
            <h2>🎉 Quiz finalizado!</h2>
            <p><strong>Nome:</strong> ${userName}</p>
            <p><strong>Pontuação:</strong> ${score} de ${questions.length}</p>
            <a href="result.html">Ver detalhes do resultado</a><br>
            <a href="ranking.html">Ver Ranking</a>
        `;

        nextButton.style.display = 'none';

        sendResult();
    }

    /* Função para enviar o resultado do quiz para o backend
    Envia os dados do usuário, pontuação, total de perguntas, respostas corretas e incorretas */
    async function sendResult() {
        try {
            const response = await fetch('http://localhost:3000/api/results', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_name: userName,
                    score: score,
                    total_questions: questions.length,
                    correct_answers: correctAnswers,
                    wrong_answers: wrongAnswers
                })
            });

            // Verifica se a resposta foi bem-sucedida e processa o JSON

            const data = await response.json();
            /* Se a resposta for bem-sucedida, exibe o resultado salvo ou exibe um erro */
            if (response.ok) {
                console.log('✅ Resultado salvo:', data);
            } else {
                alert('❌ Erro ao salvar resultado: ' + data.error);
            }
        } catch (error) {
            alert('❌ Erro na comunicação com o servidor.');
            console.error(error);
        }
    }
});
