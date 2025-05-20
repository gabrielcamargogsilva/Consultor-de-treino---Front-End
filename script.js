document.getElementById('workoutForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = document.getElementById('submitButton');
    const loading = document.getElementById('loading');
    const errorDisplay = document.getElementById('errorDisplay');
    const workoutResultContainer = document.getElementById('workoutResultContainer');
    const workoutResultDiv = document.getElementById('workoutResult');
    const avisosContainer = document.getElementById('avisosContainer');
    const sugestoesContainer = document.getElementById('sugestoesContainer');
    // dietAd não precisa mais ser selecionado aqui, pois sua visibilidade é fixa no HTML.

    errorDisplay.classList.add('hidden');
    workoutResultContainer.classList.add('hidden');
    // A linha abaixo foi removida, pois o anúncio agora deve ser sempre visível por padrão.
    // dietAd.classList.add('hidden');
    loading.classList.remove('hidden');

    const formData = {
        objetivo: document.getElementById('objetivo').value,
        nivel: document.getElementById('nivel').value,
        acesso_equipamentos: document.getElementById('acesso_equipamentos').value,
        restricoes: document.getElementById('restricoes').value || null,
        especificacao_treino: document.getElementById('especificacao_treino').value || null // Adicionado o campo de especificação do treino
    };

    try {
        const responseData = await fetch('https://consultor-de-treino-back-end.vercel.app/gerar_treino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await responseData.json();
        console.log('Resposta da API:', data);

        // Verificar se o plano_markdown foi retornado
        if (data && data.plano_markdown) {
            // Exibir o plano de treino
            const htmlContent = marked.parse(data.plano_markdown);
            workoutResultDiv.innerHTML = htmlContent;

            // Exibir avisos importantes, se houver
            if (data.avisos_importantes && data.avisos_importantes.length > 0) {
                avisosContainer.innerHTML = `<h3 class="text-lg font-semibold">Avisos Importantes:</h3>`;
                data.avisos_importantes.forEach(aviso => {
                    avisosContainer.innerHTML += `<p>- ${aviso}</p>`;
                });
            } else {
                avisosContainer.innerHTML = ''; // Limpa se não houver avisos
            }

            // Exibir sugestões adicionais, se houver
            if (data.sugestoes_adicionais) {
                sugestoesContainer.innerHTML = `<h3 class="text-lg font-semibold">Sugestões Adicionais:</h3><p>${data.sugestoes_adicionais}</p>`;
            } else {
                sugestoesContainer.innerHTML = ''; // Limpa se não houver sugestões
            }

            // Mostrar o resultado
            workoutResultContainer.classList.remove('hidden');
            // A linha abaixo foi removida, pois o anúncio agora é sempre visível e não é controlado por este evento.
            // dietAd.classList.remove('hidden');
        } else {
            throw new Error('Não foi possível gerar o treino');
        }
    } catch (error) {
        console.error('Erro ao gerar treino:', error);
        errorDisplay.classList.remove('hidden');
        errorDisplay.textContent = 'Erro ao gerar treino. Tente novamente mais tarde.';
    } finally {
        loading.classList.add('hidden');
    }
});
