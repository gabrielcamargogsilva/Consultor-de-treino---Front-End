import { cn } from '../../lib/cn';
import { Icon, LevelBars } from './Icon';

/**
 * Grupo de opções exclusivas, feito com <input type="radio"> nativo.
 * O input fica oculto só visualmente (sr-only): continua focável e navegável
 * por setas. O estado selecionado vem de `has-[:checked]` no <label>.
 *
 * Cada opção: { value, label, description?, icon?, level? }
 *
 * variant:
 *  - cards: duas colunas, ícone em bloco + rótulo (objetivo)
 *  - list:  uma coluna, barras de nível + título e descrição (nível)
 *  - tiles: grade 2×N, ícone no topo + rótulo (equipamentos)
 */
const layout = {
  cards: 'flex flex-wrap gap-2',
  list: 'grid gap-2',
  tiles: 'grid grid-cols-2 gap-2',
};

const optionStyle = {
  cards: 'min-h-16 min-w-[10.5rem] flex-1 basis-[calc(50%-0.25rem)] items-center gap-3 px-3.5 py-2.5 text-sm font-medium',
  list: 'items-center gap-3.5 px-4 py-3',
  tiles: 'min-h-[6.5rem] flex-col items-start justify-between gap-3 px-4 py-3.5 text-sm font-medium',
};

export function ChoiceGroup({ legend, name, options, value, onChange, variant = 'cards', required }) {
  return (
    <fieldset className="min-w-0">
      <legend className="mb-3 text-[0.95rem] font-semibold">{legend}</legend>

      <div className={layout[variant]}>
        {options.map((opt) => (
          <label
            key={opt.value}
            className={cn(
              'group flex cursor-pointer select-none rounded-control border border-line bg-surface',
              'transition-[background-color,border-color,transform] duration-150',
              'hover:border-ink/40 active:scale-[.98]',
              'has-[:checked]:border-accent has-[:checked]:bg-accent-soft',
              'has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent',
              optionStyle[variant],
            )}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              required={required}
              className="sr-only"
            />

            {variant === 'cards' && (
              <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-canvas text-ink transition-colors group-has-[:checked]:bg-accent group-has-[:checked]:text-on-accent">
                <Icon name={opt.icon} className="size-5" />
              </span>
            )}

            {variant === 'list' && (
              <LevelBars
                level={opt.level}
                className="size-7 shrink-0 text-muted transition-colors group-has-[:checked]:text-accent"
              />
            )}

            {variant === 'tiles' && (
              <Icon
                name={opt.icon}
                className="size-7 text-muted transition-colors group-has-[:checked]:text-accent"
              />
            )}

            <span className="min-w-0">
              <span className={cn('block', variant === 'list' && 'font-semibold')}>{opt.label}</span>
              {opt.description && <span className="block text-sm text-muted">{opt.description}</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
