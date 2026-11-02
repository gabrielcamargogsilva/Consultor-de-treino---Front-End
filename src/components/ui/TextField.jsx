import { useId } from 'react';

/** Campo de texto de várias linhas, sempre opcional neste formulário. */
export function TextField({ label, hint, value, onChange, placeholder, rows = 3 }) {
  const id = useId();
  const hintId = `${id}-dica`;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[0.95rem] font-semibold">
        {label}
        <span className="ml-2 font-normal text-muted">(opcional)</span>
      </label>
      {hint && (
        <p id={hintId} className="mb-2 text-sm text-muted">
          {hint}
        </p>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-describedby={hint ? hintId : undefined}
        className="w-full resize-y rounded-control border border-line bg-surface px-4 py-3 transition-colors placeholder:text-muted/70 hover:border-ink/40 focus:border-accent"
      />
    </div>
  );
}
