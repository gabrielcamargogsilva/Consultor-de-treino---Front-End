// Ícones de traço (24×24) herdando a cor do texto via currentColor.
// Os nomes em português seguem as opções do formulário (src/data/options.js).
const PATHS = {
  // objetivos
  halter: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
  chama:
    'M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.2 2-4 .3 1.4 1 2 1.8 2.2C10.5 8.5 11 5.5 12 3Z',
  pulso: 'M3 12h4l2.5-6 4 12 2.5-6H21',
  alvo: 'M12 3v3M12 18v3M3 12h3M18 12h3M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z',
  barra: 'M4 7v10M7.5 5v14M16.5 5v14M20 7v10M7.5 12h9',
  // equipamentos
  academia: 'M3 8v8M6 6v12M18 6v12M21 8v8M6 12h12',
  aparelho: 'M7 3v18M17 3v18M7 5h10M12 5v8M9.5 13h5l-1 4h-3l-1-4Z',
  halteres: 'M8 8v8M16 8v8M5 10v4M19 10v4M8 12h8',
  corpo: 'M12 5.2a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM12 7v7M8 10h8M12 14l-3 6M12 14l3 6',
  // interface
  check: 'm5 12.5 4.5 4.5L19 7.5',
  alerta: 'M12 4 2.5 20h19L12 4Zm0 6v4.5m0 2.5v.01',
};

export function Icon({ name, className = 'size-5', strokeWidth = 2 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

export function Spinner({ className = 'size-4' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className={`${className} animate-spin motion-reduce:animate-none`}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Três barras crescentes; `level` (1 a 3) define quantas ficam cheias. */
export function LevelBars({ level, className = 'size-7' }) {
  const fill = (n) => (level >= n ? 1 : 0.2);
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="currentColor">
      <rect x="3" y="14" width="5" height="7" rx="1.5" fillOpacity={fill(1)} />
      <rect x="9.5" y="9" width="5" height="12" rx="1.5" fillOpacity={fill(2)} />
      <rect x="16" y="3" width="5" height="18" rx="1.5" fillOpacity={fill(3)} />
    </svg>
  );
}
