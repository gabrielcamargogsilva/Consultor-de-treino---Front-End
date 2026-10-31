// Mesmo back-end e mesmos endpoints da versão Vanilla.
// Para testar localmente, crie .env.local com VITE_API_URL=http://127.0.0.1:5000
const API_URL =
  import.meta.env.VITE_API_URL ?? 'https://consultor-de-treino-back-end.vercel.app';

/**
 * POST /gerar_treino
 * Resposta esperada: { plano_markdown, avisos_importantes?: string[], sugestoes_adicionais?: string }
 */
export async function gerarTreino(payload, signal) {
  const res = await fetch(`${API_URL}/gerar_treino`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.plano_markdown) {
    throw new Error('Não foi possível gerar o treino');
  }
  return data;
}

/** POST /baixar_treino: devolve o PDF como Blob. */
export async function baixarPdf(plan, signal) {
  const res = await fetch(`${API_URL}/baixar_treino`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(plan),
    signal,
  });
  if (!res.ok) throw new Error('Erro ao baixar PDF');
  return res.blob();
}

/** Dispara o download de um Blob no navegador. */
export function salvarBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
