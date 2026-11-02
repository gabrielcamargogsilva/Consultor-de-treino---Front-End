# CONTEXTO DO PROJETO: TreinAI (front-end em React)

Este arquivo é a fonte de verdade para qualquer agente de IA que trabalhar neste repositório. Leia-o inteiro antes de alterar código. Ele descreve o que o projeto é, como foi migrado, o que já foi entregue, o que falta e as convenções que devem ser seguidas.

---

## 1. O que é o projeto

**TreinAI** é a interface cliente de um consultor de treinos. O usuário escolhe objetivo, nível de experiência e equipamentos disponíveis, opcionalmente informa restrições físicas e preferências, e recebe uma ficha de treino gerada por IA. A ficha pode ser salva em PDF.

- Projeto acadêmico (Senai Itapeva, Curso Técnico de Desenvolvimento de Sistemas), em produção na Vercel.
- Autor: Gabriel Camargo Gonçalves Silva.
- Em produção hoje: versão Vanilla JS/HTML/CSS (branch `main`).
- Em migração: versão React com redesign completo (branch `develop` e `feature/*`).

### Repositórios

| Repositório | Papel |
|---|---|
| `gabrielcamargogsilva/Consultor-de-treino---Front-End` | Este repositório (front-end) |
| `gabrielcamargogsilva/Consultor-de-treino---Back-End` | API que gera o plano e o PDF |

### Back-end (contrato da API, não alterar aqui)

Base: `https://consultor-de-treino-back-end.vercel.app` (sobrescrevível por `VITE_API_URL`).

**`POST /gerar_treino`**

Corpo (JSON):
```json
{
  "objetivo": "Ganhar massa muscular",
  "nivel": "Intermediário",
  "acesso_equipamentos": "Academia completa",
  "restricoes": null,
  "especificacao_treino": null
}
```

Resposta de sucesso:
```json
{
  "plano_markdown": "# Treino A ...",
  "avisos_importantes": ["..."],
  "sugestoes_adicionais": "texto ou null"
}
```

**`POST /baixar_treino`**: recebe o mesmo objeto retornado por `/gerar_treino` e responde com o PDF binário.

**Atenção aos valores.** O back-end recebe exatamente os textos abaixo. Nunca envie o `label` curto no lugar do `value`:

| Campo | value enviado (exato) | label na tela |
|---|---|---|
| objetivo | `Força` | Aumento de Força |
| acesso_equipamentos | `Academia Intermediária (Tem equipamentos mas não é completo)` | Academia Intermediária |
| acesso_equipamentos | `Tenho acesso a halteres mas sem outros equipamentos` | Apenas Halteres |
| acesso_equipamentos | `Irei treinar somente com o peso do corpo` | Apenas Peso do corpo |

Os demais `value` são iguais ao `label`. A fonte da verdade é `src/data/options.js`.

---

## 2. Stack e ferramentas

- **Vite 8** (`npm run dev`, `npm run build`, `npm run preview`)
- **React 19** (funcional, com hooks)
- **Tailwind CSS v4** via plugin `@tailwindcss/vite` (sem arquivo `tailwind.config.js`; tokens ficam em `src/index.css` com `@theme inline`)
- **Fontes**: Bricolage Grotesque (títulos, condensada via `font-stretch: 85%`) e Hanken Grotesk (texto), carregadas pelo Google Fonts no `index.html`
- **Markdown do plano**: ainda **não instalado**. Será necessário `react-markdown` e `remark-gfm` na Parte 6 (eram dependências do protótipo, mas não estão no `package.json` atual)
- **Node** com npm. Sem framework de testes configurado.

Variáveis de ambiente: copie `.env.example` para `.env.local` e ajuste `VITE_API_URL` se for usar back-end local (ex.: `http://127.0.0.1:5000`). `.env` e `.env.local` estão no `.gitignore`.

---

## 3. Git, branches e commits (obrigatório seguir)

### Gitflow

- `main`: produção. Só recebe merge de `release/*` ou `hotfix/*`. Está na Vercel.
- `develop`: integração. Base de todo trabalho novo.
- `feature/<nome>`: uma branch por parte do roadmap, sempre a partir de `develop`.
- `release/<versão>`: estabilização antes de ir para `main` (ex.: `release/2.0.0`), com tag `v2.0.0`.
- `hotfix/<nome>`: correções urgentes a partir de `main`.

Abra cada `feature/*` com `git switch -c feature/<nome> develop` depois de sincronizar a `develop` com `origin`. Entregas viram Pull Request para `develop`. Não faça push direto em `main` ou `develop`.

### Padrão de commit (Conventional Commits, mensagem em português)

Formato: `tipo(escopo): descrição no infinitivo, em minúscula`

- **Tipo** em inglês e minúsculo: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `build`, `ci`, `test`.
- **Escopo** opcional, curto, em português ou inglês técnico: `(ui)`, `(api)`, `(hooks)`, `(dados)`, `(design)`, `(lib)`, `(formulario)`, `(app)`.
- **Descrição** em português, no infinitivo, minúscula, sem ponto final. Ex.: `feat(ui): adicionar componente Button`.
- **Corpo** (opcional) em português, explicando o porquê, com linhas de até ~72 caracteres.
- Commits **atômicos**: um assunto por commit, com o build passando em cada um quando possível.

**Autoria**: todos os commits saem **somente** no nome do autor. Configuração local já feita:
- `user.name`: `Gabriel Camargo Gonçalves Silva`
- `user.email`: `gabrielcamargogsilva@gmail.com`

**Não adicione** linhas `Co-Authored-By`, `Claude-Session` ou qualquer menção a IA/Claude em commits ou PRs. Esta é uma instrução explícita do autor.

### Pull Requests

- Título no padrão de commit em português (ex.: `feat: formulário de geração de treino ligado ao gerador`).
- Descrição com: **O que muda**, **Como foi verificado**, **Observações**.
- Não incluir atribuição de IA na descrição.

---

## 4. Roadmap e status

| # | Branch | Entrega | Status |
|---|---|---|---|
| 1 | `feature/setup-vite-react` | Vite, React 19, Tailwind v4, tokens de design, `index.html` novo, `App` base, remoção do `script.js` legado | ✅ Concluída, PR #1 mesclado em `develop` |
| 2 | `feature/api-layer` | `src/lib/api.js`, `src/data/options.js`, hooks `useWorkoutGenerator` e `usePdfDownload`, `.env.example` | ✅ Concluída, PR #4 mesclado |
| 3 | `feature/ui-primitives` | `Button`, `ChoiceGroup`, `TextField`, `Icon` (com `Spinner` e `LevelBars`), `cn`, token `--accent-soft`, ícones nas opções | ✅ Concluída, PR #5 mesclado |
| 4 | `feature/workout-form` | `WorkoutForm`, `App` ligado ao gerador, alerta de erro com "Tentar de novo", objetivo em coluna única no celular | ✅ Concluída no código local; status do PR #6 precisa ser confirmado no repositório remoto |
| 5 | `feature/landing-sections` | Cabeçalho, hero com cartão de exemplo e seção "Como funciona" | ✅ Em andamento no código local e já implementada na interface principal |
| 6 | `feature/workout-result` | Ficha gerada (`WorkoutResult`), Markdown estilizado (`PlanMarkdown`), avisos e sugestões (`Notices`), botão de PDF com feedback | ⬜ Pendente |
| 7 | `feature/sheet-states` | Estado vazio, esqueleto de carregamento e erro dentro da ficha (`SheetStates`), substituindo o alerta provisório da Parte 4 | ⬜ Pendente |
| 8 | `feature/diet-cta-footer` | Bloco "Ainda não tem uma dieta" (link externo) e rodapé com créditos e aviso de IA | ⬜ Pendente |
| 9 | `feature/a11y-polish` | Revisão de foco, contraste, `prefers-reduced-motion`, responsivo em 390 px e 1280 px, tema escuro | ⬜ Pendente |
| 10 | `release/2.0.0` | README atualizado, merge em `main`, tag `v2.0.0` | ⬜ Pendente |

**Próximo passo**: depois do merge do PR #6 em `develop`, criar `feature/landing-sections` (Parte 5).

---

## 5. Estado atual do código

### Árvore relevante

```
index.html                       documento Vite; fontes do Google; favicon /academia.png
vite.config.js                   plugins react e tailwindcss
package.json                     react, react-dom; vite, @vitejs/plugin-react, tailwindcss, @tailwindcss/vite
.env.example                     VITE_API_URL
public/academia.png              favicon
src/
  main.jsx                       createRoot + StrictMode
  App.jsx                        página: cabeçalho, título, WorkoutForm, aviso de sucesso e alerta de erro
  index.css                      tokens (@theme inline), tema claro/escuro, utilitário .display, animações
  lib/
    api.js                       gerarTreino, baixarPdf, salvarBlob
    cn.js                        junta classes condicionais
  data/
    options.js                   OBJETIVOS, NIVEIS, EQUIPAMENTOS (value e label separados)
  hooks/
    useWorkoutGenerator.js       status idle|loading|success|error, plano, values, generate, reset
    usePdfDownload.js            status idle|saving|saved|error, save
  components/
    WorkoutForm.jsx              formulário completo; libera o botão com os três obrigatórios
    ui/
      Button.jsx                 variantes primary|secondary|inverse; tamanhos md|lg; href renderiza <a>; loading
      ChoiceGroup.jsx            radios nativos estilizados; variantes cards|list|tiles
      TextField.jsx              textarea com label, hint e aria-describedby
      Icon.jsx                   Icon (por nome), Spinner, LevelBars
```

### Contratos dos módulos

- `useWorkoutGenerator()` → `{ status, plan, values, generate(values), reset() }`. Converte `restricoes` e `especificacao_treino` com `trim()` e envia `null` quando vazios. Cancela a requisição anterior com `AbortController`.
- `usePdfDownload(plan)` → `{ status, save() }`. Volta para `idle` quando `plan` muda.
- `gerarTreino(payload, signal)` lança `Error('Não foi possível gerar o treino')` em resposta inválida.
- `baixarPdf(plan, signal)` lança `Error` se a resposta não for ok.
- `salvarBlob(blob, filename)` dispara o download no navegador.
- `<ChoiceGroup legend name options value onChange variant required />`. Cada opção: `{ value, label, description?, icon?, level? }`. Variantes: `cards` (objetivo, ícone em bloco; uma coluna no celular, duas a partir de 640 px), `list` (nível, barras de `level` e descrição visível), `tiles` (equipamentos, ícone no topo, grade 2×N).
- `<Button variant size loading disabled href ...>`. `type="button"` por padrão.
- `<TextField label hint value onChange placeholder rows />`. Sempre marcado como "(opcional)".
- Ícones válidos em `Icon`: `halter`, `chama`, `pulso`, `alvo`, `barra`, `academia`, `aparelho`, `halteres`, `corpo`, `check`, `alerta`.

### Tokens de design (`src/index.css`)

Variáveis semânticas em `:root` com tema escuro em `prefers-color-scheme: dark`:

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `--canvas` | `#F1F2EE` | `#0E1117` | fundo da página |
| `--surface` | `#FBFBF9` | `#161A23` | papel da ficha e controles |
| `--ink` | `#161A22` | `#ECEEF4` | texto principal |
| `--muted` | `#5E6676` | `#9BA3B5` | texto secundário |
| `--line` | `#DADCD4` | `#2A3040` | bordas |
| `--accent` | `#2536F5` | `#8A94FF` | ação e seleção (cobalto) |
| `--accent-strong` | `#1B28C9` | `#A5ADFF` | hover de ação |
| `--accent-soft` | 7% de acento sobre o papel | idem | fundo de opção marcada |
| `--on-accent` | `#FFFFFF` | `#0E1117` | texto sobre acento |
| `--warn-bg` / `--warn-ink` | `#FBF0D6` / `#6B4A0B` | `#2B2312` / `#F0D9A0` | avisos |
| `--danger` / `--danger-bg` | `#B42323` / `#FBE4E2` | `#FF8A84` / `#2E1717` | erros |

Raios: `rounded-control` (12px) para controles, `rounded-sheet` (24px) para a ficha, `rounded-full` para chips. Sombra `shadow-sheet` só na ficha. Utilitário `display` para títulos. Classe `sheet-in` (animação de entrada da ficha) e `skeleton` (carregamento); ambas desligadas com `prefers-reduced-motion`.

---

## 6. Direção de design (decisões já tomadas)

- **Conceito**: "ficha de treino" impressa, com identidade de academia. Nada de degradê, neon ou cartões genéricos.
- Um único ponto de destaque: a ficha gerada. O resto fica quieto.
- Títulos em Bricolage condensada; texto em Hanken; números e séries com `tabular-nums`.
- Rótulos em caixa de sentença (nunca em caixa-alta). Sem rótulos "eyebrow" acima dos títulos.
- Links e botões com verbo no infinitivo ou imperativo curto: "Gerar treino", "Montar nova ficha", "Salvar em PDF", "Tentar de novo".
- Texto corrido com no máximo ~68 caracteres por linha.
- Alvos de toque com pelo menos 44 px.
- Foco visível com `outline` em `--accent` (já aplicado globalmente em `:focus-visible`).
- Movimento: uma coreografia só (a ficha desdobra ao aparecer). O resto responde a ações do usuário.
- Mockup de referência (privado, do canvas): https://claude.ai/artifact/MCZiTgH6f3td9hmMqTh1io (desktop em 1280 px e mobile em 390 px). Use como referência visual; o código real deve seguir os tokens acima.

---

## 7. Regras de implementação (obrigatórias)

1. **Nunca use `innerHTML`** nem `dangerouslySetInnerHTML`. O plano vem do back-end e deve ser renderizado com componentes React (ex.: `react-markdown`, sem `rehype-raw`).
2. **Nunca use `alert()`**. Erros e confirmações aparecem na própria interface, com `role="alert"` ou `role="status"`.
3. Use `cn()` para classes condicionais. Não crie um `classNames` próprio.
4. Reutilize `Button`, `ChoiceGroup`, `TextField` e `Icon` antes de criar componentes parecidos.
5. Textos da interface em português, com acentos corretos.
6. Os `value` enviados ao back-end nunca mudam sem alinhamento com o contrato da API.
7. Não faça commit em `main` nem em `develop`. Toda mudança começa numa branch `feature/*`.
8. Não adicione dependências sem necessidade. Antes de instalar, confirme que o recurso não existe nos componentes atuais.
9. Antes de abrir PR: `npm run build` precisa passar, e a mudança precisa ter sido verificada no navegador quando tiver impacto visual ou de interação.
10. Não coloque segredos, chaves ou URLs privadas no repositório. O `.env.local` é local.

---

## 8. Como verificar (padrão adotado)

- Build: `npm run build`.
- Navegador: o time usou Playwright (Chromium) com scripts ad hoc, fora do repositório. Checagens típicas: foco e teclado nas opções, `value` enviado no corpo da requisição, estados de loading e erro, ausência de rolagem horizontal em 390 px, alvos de toque com 44 px ou mais, e `prefers-reduced-motion`.
- Para testar a API sem depender do back-end, intercepte `POST /gerar_treino` com `page.route` e devolva um JSON de exemplo.
- Ainda não há suíte de testes automatizados no repositório. Se for criar uma (ex.: Vitest + Testing Library), abra uma parte própria do roadmap.

---

## 9. Pendências e problemas conhecidos

- **README desatualizado**: o `READme.md` ainda descreve a versão em HTML/JS, com um link da Vercel diferente do atual (`consultor-de-treinos.vercel.app`). Atualizar na Parte 10. O link atual de produção é `consultor-de-treino-front-end.vercel.app`.
- **Markdown**: `react-markdown` e `remark-gfm` precisam ser instalados na Parte 6.
- **Google Fonts**: em alguns ambientes (ex.: sandbox sem acesso ao domínio) as fontes não carregam; o layout precisa continuar legível com a fonte do sistema.
- **Validação do back-end**: a chamada real ao back-end ainda não foi testada de ponta a ponta com esta versão. Testar com `npm run dev` antes do release.
- **Ícones parecidos**: `halter` (ganhar massa), `barra` (força), `academia` e `halteres` são visualmente próximos em 24 px. Ajustar se confundir o usuário.
- **Histórico**: `main` ainda contém a versão antiga em Vanilla JS; ela só sai de produção no release `2.0.0`.

---

## 10. Comandos úteis

```bash
npm install                 # instalar dependências
npm run dev                 # servidor de desenvolvimento (porta 5173)
npm run build               # build de produção (dist/)
npm run preview             # servir o build

git switch develop && git pull --ff-only origin develop
git switch -c feature/<nome> develop
git push -u origin feature/<nome>
gh pr create --base develop --head feature/<nome> --title "feat: ..." --body-file <arquivo.md>
```
