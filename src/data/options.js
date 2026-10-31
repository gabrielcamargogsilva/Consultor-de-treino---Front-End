// Opções do formulário.
// `value` é o texto exato que o back-end recebe (idêntico ao <option value>
// da versão em Vanilla JS). `label` é o texto curto mostrado na tela.

export const OBJETIVOS = [
  { value: 'Ganhar massa muscular', label: 'Ganhar massa muscular' },
  { value: 'Emagrecer', label: 'Emagrecer' },
  { value: 'Condicionamento físico', label: 'Condicionamento físico' },
  { value: 'Definição muscular', label: 'Definição muscular' },
  { value: 'Força', label: 'Aumento de Força' },
];

// `level` (1 a 3) alimenta o indicador de barras do seletor de nível.
export const NIVEIS = [
  { value: 'Iniciante', label: 'Iniciante', description: 'Até 6 meses de treino', level: 1 },
  { value: 'Intermediário', label: 'Intermediário', description: '6 meses a 2 anos', level: 2 },
  { value: 'Avançado', label: 'Avançado', description: 'Mais de 2 anos', level: 3 },
];

export const EQUIPAMENTOS = [
  { value: 'Academia completa', label: 'Academia completa' },
  {
    value: 'Academia Intermediária (Tem equipamentos mas não é completo)',
    label: 'Academia Intermediária',
  },
  {
    value: 'Tenho acesso a halteres mas sem outros equipamentos',
    label: 'Apenas Halteres',
  },
  {
    value: 'Irei treinar somente com o peso do corpo',
    label: 'Apenas Peso do corpo',
  },
];
