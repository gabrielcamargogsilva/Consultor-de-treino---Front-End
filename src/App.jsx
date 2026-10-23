// Base da nova interface. As seções entram nas próximas partes do roadmap.
export default function App() {
  return (
    <main className="mx-auto max-w-6xl px-5 py-10 lg:px-8">
      <span className="display text-2xl">TreinAI</span>
      <h1 className="display mt-16 text-[clamp(2.5rem,6vw,4.25rem)]">Monte sua ficha de treino</h1>
      <p className="mt-4 max-w-[34ch] text-lg text-muted">
        Escolha objetivo, nível e equipamentos. A IA monta o plano completo.
      </p>
    </main>
  );
}
