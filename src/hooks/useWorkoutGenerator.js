import { useCallback, useRef, useState } from 'react';
import { gerarTreino } from '../lib/api';

const IDLE = { status: 'idle', plan: null, values: null };

const toPayload = (v) => ({
  objetivo: v.objetivo,
  nivel: v.nivel,
  acesso_equipamentos: v.acesso_equipamentos,
  restricoes: v.restricoes.trim() || null,
  especificacao_treino: v.especificacao_treino.trim() || null,
});

/** status: 'idle' | 'loading' | 'success' | 'error' */
export function useWorkoutGenerator() {
  const [state, setState] = useState(IDLE);
  const controller = useRef(null);

  const generate = useCallback(async (values) => {
    controller.current?.abort(); // cancela a requisição anterior, se houver
    const ctrl = new AbortController();
    controller.current = ctrl;

    setState({ status: 'loading', plan: null, values });
    try {
      const plan = await gerarTreino(toPayload(values), ctrl.signal);
      setState({ status: 'success', plan, values });
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Erro ao gerar treino:', err);
      setState({ status: 'error', plan: null, values });
    }
  }, []);

  const reset = useCallback(() => {
    controller.current?.abort();
    setState(IDLE);
  }, []);

  return { ...state, generate, reset };
}
