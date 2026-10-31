import { cn } from '../../lib/cn';
import { Spinner } from './Icon';

const variants = {
  primary: 'bg-accent text-on-accent hover:bg-accent-strong',
  secondary: 'border border-line bg-surface text-ink hover:border-ink/40',
  // Para fundos escuros ou em cobalto (hero e bloco da dieta).
  inverse: 'bg-canvas text-ink hover:scale-[1.02] focus-visible:outline-canvas',
};

const sizes = {
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-[3.25rem] px-7 text-base',
};

/**
 * Botão ou link com aparência de botão: com `href` renderiza <a>.
 * `loading` mostra o spinner, desabilita o clique e marca aria-busy.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  href,
  className,
  children,
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-control font-semibold',
    'transition-[background-color,border-color,transform,opacity] duration-150 active:scale-[.98]',
    sizes[size],
    variants[variant],
    loading ? 'cursor-progress' : 'disabled:cursor-not-allowed disabled:opacity-45',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={classes}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}
