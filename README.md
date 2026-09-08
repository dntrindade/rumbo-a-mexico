# Rumbo a México — GYM Deserto (código-fonte reorganizado)

Este é o código-fonte real do app (React + Vite + TypeScript + Tailwind),
reorganizado em módulos a partir do `App_FULL_ORIGINAL.tsx`.

**Nada do visual, das cores, textos ou lógica foi alterado** — apenas separado
em arquivos menores para facilitar manutenção.

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Como gerar build de produção

```bash
npm run build
```

Gera a pasta `dist/` pronta para publicar em qualquer hospedagem estática
(Vercel, Netlify, GitHub Pages, ou upload direto via FTP).

## Estrutura de pastas

```
src/
├── App.tsx                    # Orquestra estado global e monta as abas
├── main.tsx                   # Entry point do React
├── index.css                  # Import do Tailwind
├── theme.ts                   # Cores e tokens visuais centralizados
│
├── data/
│   └── index.ts                # PILLARS, WEEKS, TOOLS, PLAYLIST, PHRASES,
│                                # VOCAB, AFFILIATES, STORE_KEY
│
├── hooks/
│   └── useProgress.ts          # Toda a lógica de progresso, streak,
│                                # minutos, localStorage (extraída do App
│                                # original sem nenhuma alteração de lógica)
│
├── components/
│   ├── Header.tsx               # Topo + 3 anéis estilo Apple Watch
│   ├── TabsNav.tsx               # Navegação HOJE / TRILHA 28 / BIBLIOTECA
│   ├── TabHoje.tsx               # Aba Hoje: trilha do dia + 5 pilares
│   ├── TabTrilha.tsx             # Aba Trilha 28: caminho sinuoso + heatmap
│   ├── TabBiblioteca.tsx         # Aba Biblioteca: sub-abas de conteúdo
│   ├── PremiumModal.tsx          # Modal de upsell Premium
│   ├── CertModal.tsx             # Modal de certificado (ao completar 100%)
│   └── Footer.tsx                # Rodapé
│
└── assets/
    ├── logo_final_mexico_flag.png
    └── logo_mexico_flag_full.png
```

## O que mudar e onde

| Quero mudar...                          | Arquivo                          |
|------------------------------------------|-----------------------------------|
| Textos das semanas/tarefas                | `src/data/index.ts` (`WEEKS`)     |
| Ferramentas recomendadas                  | `src/data/index.ts` (`TOOLS`)     |
| Playlist                                  | `src/data/index.ts` (`PLAYLIST`)  |
| Frases de reunião                         | `src/data/index.ts` (`PHRASES`)   |
| Vocabulário técnico                       | `src/data/index.ts` (`VOCAB`)     |
| Afiliados / comissões                     | `src/data/index.ts` (`AFFILIATES`)|
| Cores do app                              | `src/theme.ts`                    |
| Layout do header / anéis                  | `src/components/Header.tsx`       |
| Layout da aba Hoje                        | `src/components/TabHoje.tsx`      |
| Layout da Trilha 28 / mapa de calor        | `src/components/TabTrilha.tsx`    |
| Layout da Biblioteca                      | `src/components/TabBiblioteca.tsx`|
| Regras de streak, minutos, % progresso     | `src/hooks/useProgress.ts`        |

## Observação sobre o arquivo original

O arquivo `App_FULL_ORIGINAL.tsx` (768 linhas, tudo em um único componente)
foi preservado como referência histórica — mas **não deve mais ser editado**.
Toda a manutenção deve ser feita nos arquivos de `src/` acima.
