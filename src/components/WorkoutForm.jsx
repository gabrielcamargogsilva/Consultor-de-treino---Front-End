import { useState } from 'react';
import { EQUIPAMENTOS, NIVEIS, OBJETIVOS } from '../data/options';
import { Button } from './ui/Button';
import { ChoiceGroup } from './ui/ChoiceGroup';
import { TextField } from './ui/TextField';

const EMPTY = {
  objetivo: '',
  nivel: '',
  acesso_equipamentos: '',
  restricoes: '',
  especificacao_treino: '',
};

/**
 * Formulário de geração. Os três campos obrigatórios liberam o botão;
 * os textos opcionais seguem como string e o hook converte vazio em null.
 */
export default function WorkoutForm({ onSubmit, busy }) {
  const [values, setValues] = useState(EMPTY);
  const set = (key) => (val) => setValues((v) => ({ ...v, [key]: val }));
  const ready = Boolean(values.objetivo && values.nivel && values.acesso_equipamentos);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ready && !busy) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      <ChoiceGroup
        legend="Objetivo"
        name="objetivo"
        variant="cards"
        options={OBJETIVOS}
        value={values.objetivo}
        onChange={set('objetivo')}
        required
      />

      <ChoiceGroup
        legend="Nível"
        name="nivel"
        variant="list"
        options={NIVEIS}
        value={values.nivel}
        onChange={set('nivel')}
        required
      />

      <ChoiceGroup
        legend="Equipamentos disponíveis"
        name="acesso_equipamentos"
        variant="tiles"
        options={EQUIPAMENTOS}
        value={values.acesso_equipamentos}
        onChange={set('acesso_equipamentos')}
        required
      />

      <TextField
        label="Restrições físicas"
        hint="Lesões, dores ou movimentos que você precisa evitar."
        placeholder="Ex.: dor no joelho direito"
        value={values.restricoes}
        onChange={set('restricoes')}
      />

      <TextField
        label="Preferências do treino"
        hint="Dias por semana, duração, grupos musculares em foco."
        placeholder="Ex.: 4 dias por semana, foco em pernas"
        value={values.especificacao_treino}
        onChange={set('especificacao_treino')}
      />

      <div className="space-y-3">
        <Button
          type="submit"
          loading={busy}
          disabled={!ready}
          className="w-full sm:w-auto"
        >
          {busy ? 'Gerando treino…' : 'Gerar treino'}
        </Button>
        {!ready && !busy && (
          <p className="text-sm text-muted">
            Escolha objetivo, nível e equipamentos para continuar.
          </p>
        )}
      </div>
    </form>
  );
}
