// 1. Variável global para armazenar o treino e ser usada pelo botão de PDF
let ultimoTreinoGerado = null;

document.getElementById('workoutForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = document.getElementById('submitButton');
    const loading = document.getElementById('loading');
    const errorDisplay = document.getElementById('errorDisplay');
    const workoutResultContainer = document.getElementById('workoutResultContainer');
    const workoutResultDiv = document.getElementById('workoutResult');
    const avisosContainer = document.getElementById('avisosContainer');
    const sugestoesContainer = document.getElementById('sugestoesContainer');

    errorDisplay.classList.add('hidden');
    workoutResultContainer.classList.add('hidden');
    loading.classList.remove('hidden');

    const formData = {
        objetivo: document.getElementById('objetivo').value,
        nivel: document.getElementById('nivel').value,
        acesso_equipamentos: document.getElementById('acesso_equipamentos').value,
        restricoes: document.getElementById('restricoes').value || null,
        especificacao_treino: document.getElementById('especificacao_treino').value || null
    };

    try {
        // Ajuste a URL aqui se estiver testando localmente (http://127.0.0.1:5000)
        // ou mantenha a do Vercel se o Back-end já estiver atualizado lá
        const responseData = await fetch('https://consultor-de-treino-back-end.vercel.app/gerar_treino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await responseData.json();
        console.log('Resposta da API:', data);

        if (data && data.plano_markdown) {
            // !!! IMPORTANTE: Guardamos os dados recebidos para o PDF !!!
            ultimoTreinoGerado = data;

            const htmlContent = marked.parse(data.plano_markdown);
            workoutResultDiv.innerHTML = htmlContent;

            if (data.avisos_importantes && data.avisos_importantes.length > 0) {
                avisosContainer.innerHTML = `<h3 class="text-lg font-semibold">Avisos Importantes:</h3>`;
                data.avisos_importantes.forEach(aviso => {
                    avisosContainer.innerHTML += `<p>- ${aviso}</p>`;
                });
            } else {
                avisosContainer.innerHTML = '';
            }

            if (data.sugestoes_adicionais) {
                sugestoesContainer.innerHTML = `<h3 class="text-lg font-semibold">Sugestões Adicionais:</h3><p>${data.sugestoes_adicionais}</p>`;
            } else {
                sugestoesContainer.innerHTML = '';
            }

            workoutResultContainer.classList.remove('hidden');
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

// --- LÓGICA DO BOTÃO SALVAR PDF ---
document.getElementById('savePdfBtn').addEventListener('click', async () => {
    if (!ultimoTreinoGerado) {
        alert("Por favor, gere um treino primeiro!");
        return;
    }

    const btnSalvar = document.getElementById('savePdfBtn');
    const textoOriginal = btnSalvar.innerHTML;

    try {
        btnSalvar.disabled = true;
        btnSalvar.innerHTML = "Gerando PDF...";

        // Chamada para a nova rota de PDF no seu Back-end
        const response = await fetch('https://consultor-de-treino-back-end.vercel.app/baixar_treino', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ultimoTreinoGerado)
        });

        if (!response.ok) throw new Error('Erro ao baixar PDF');

        // Processo de download do arquivo binário (Blob)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Meu_Treino_TreinAI.pdf';
        document.body.appendChild(a);
        a.click();
        
        // Limpeza técnica
        window.URL.revokeObjectURL(url);
        a.remove();

    } catch (error) {
        console.error('Erro no PDF:', error);
        alert("Erro ao gerar o arquivo PDF. Verifique se o servidor está ativo.");
    } finally {
        btnSalvar.disabled = false;
        btnSalvar.innerHTML = textoOriginal;
    }
});

// Botão para limpar tudo
document.getElementById('clearFormBtn').addEventListener('click', () => {
    document.getElementById('workoutForm').reset();
    document.getElementById('workoutResultContainer').classList.add('hidden');
    ultimoTreinoGerado = null; // Limpa o cache do treino
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Volta ao topo suavemente
});