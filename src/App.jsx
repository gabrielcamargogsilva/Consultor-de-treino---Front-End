import { useWorkoutGenerator } from './hooks/useWorkoutGenerator';
import WorkoutForm from './components/WorkoutForm';
import { Button } from './components/ui/Button';

const steps = [
  {
    title: '1. Defina seu perfil',
    description: 'Escolha objetivo, nível e equipamentos disponíveis.',
  },
  {
    title: '2. Adicione contexto',
    description: 'Descreva restrições e preferências para deixar o treino mais fiel ao seu dia a dia.',
  },
  {
    title: '3. Receba a ficha',
    description: 'A IA monta a rotina com exercícios, séries, descanso e proposta de evolução.',
  },
];

const samplePlan = [
  { label: 'Aquecimento', detail: '5 min' },
  { label: 'Supino', detail: '4x8' },
  { label: 'Levantamento terra', detail: '4x6' },
  { label: 'Puxada', detail: '3x10' },
  { label: 'Alongamento', detail: '8 min' },
];

// Página principal. A ficha gerada entra na Parte 6; aqui o sucesso
// só confirma que o plano chegou do back-end.
export default function App() {
  const { status, values, generate } = useWorkoutGenerator();

  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <span className="display text-2xl">TreinAI</span>
      </header>

      <main className="mx-auto max-w-6xl px-5 pb-20 pt-10 lg:px-8 lg:pt-14">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h1 className="display text-[clamp(2.5rem,6vw,3.75rem)]">
              Monte sua ficha de treino
            </h1>
            <p className="mt-4 max-w-[34ch] text-lg text-muted">
              Escolha objetivo, nível e equipamentos. A IA monta o plano completo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-muted">
              <span className="rounded-full border border-line bg-surface px-3 py-1.5">
                Planejamento individualizado
              </span>
              <span className="rounded-full border border-line bg-surface px-3 py-1.5">
                Treino adaptado ao seu contexto
              </span>
            </div>
          </div>

          <aside className="rounded-sheet border border-line bg-surface p-5 shadow-sheet">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Exemplo de treino
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-control border border-line bg-canvas p-3">
                <p className="text-sm text-muted">Objetivo</p>
                <p className="mt-1 font-semibold">Força e hipertrofia</p>
              </div>

              <div className="space-y-2">
                {samplePlan.map(({ label, detail }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between rounded-control border border-line bg-canvas px-3 py-2"
                  >
                    <span className="font-medium">{label}</span>
                    <span className="text-sm text-muted">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <WorkoutForm
              onSubmit={generate}
              busy={status === 'loading'}
            />
          </div>

          <section className="rounded-sheet border border-line bg-surface p-5 shadow-sheet lg:sticky lg:top-6 lg:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Como funciona
            </p>
            <div className="mt-5 space-y-4">
              {steps.map(({ title, description }) => (
                <div key={title} className="rounded-control border border-line bg-canvas p-3.5">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted">{description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <p role="status" className="mt-6 text-sm text-muted empty:hidden">
          {status === 'success' && 'Ficha gerada. A exibição chega na próxima etapa.'}
        </p>

        {status === 'error' && (
          <div role="alert" className="mt-6 rounded-xl bg-danger-bg p-5 text-danger">
            <p className="font-semibold">Não foi possível gerar sua ficha.</p>
            <p className="mt-1 text-sm">
              O servidor pode estar ocupado ou sua conexão caiu. Tente de novo.
            </p>
            <Button
              variant="secondary"
              className="mt-4"
              onClick={() => generate(values)}
            >
              Tentar de novo
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
