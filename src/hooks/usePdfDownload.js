import { useCallback, useEffect, useState } from 'react';
import { baixarPdf, salvarBlob } from '../lib/api';

/** status: 'idle' | 'saving' | 'saved' | 'error' */
export function usePdfDownload(plan) {
  const [status, setStatus] = useState('idle');

  // Um plano novo começa sem feedback do PDF anterior.
  useEffect(() => setStatus('idle'), [plan]);

  const save = useCallback(async () => {
    if (!plan) return;
    setStatus('saving');
    try {
      const blob = await baixarPdf(plan);
      salvarBlob(blob, 'Meu_Treino_TreinAI.pdf');
      setStatus('saved');
    } catch (err) {
      console.error('Erro no PDF:', err);
      setStatus('error');
    }
  }, [plan]);

  return { status, save };
}
