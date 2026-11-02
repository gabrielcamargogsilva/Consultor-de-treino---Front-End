import { useWorkoutGenerator } from './hooks/useWorkoutGenerator';
import WorkoutForm from './components/WorkoutForm';
import { Button } from './components/ui/Button';

// Página principal. A ficha gerada entra na Parte 6; aqui o sucesso
// só confirma que o plano chegou do back-end.
export default function App() {
  const { status, values, generate } = useWorkoutGenerator();

  return (
    <div className="min-h-dvh">
      <header className="mx-auto max-w-6xl px-5 pt-6 lg:px-8">
        <span className="display text-2xl">TreinAI</span>
      </header>

      <main className="mx-auto max-w-2xl px-5 pb-20 pt-12 lg:px-8 lg:pt-16">
        <h1 className="display text-[clamp(2.5rem,6vw,3.75rem)]">
          Monte sua ficha de treino
        </h1>
        <p className="mt-4 max-w-[34ch] text-lg text-muted">
          Escolha objetivo, nível e equipamentos. A IA monta o plano completo.
        </p>

        <div className="mt-12">
          <WorkoutForm
            onSubmit={generate}
            busy={status === 'loading'}
          />
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
