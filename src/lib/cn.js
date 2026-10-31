/** Junta classes ignorando valores falsos: cn('a', cond && 'b') */
export const cn = (...parts) => parts.filter(Boolean).join(' ');
