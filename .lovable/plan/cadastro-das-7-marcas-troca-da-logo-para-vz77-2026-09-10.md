# Cadastro das 7 marcas + troca da logo para VZ77™

## O que vai mudar

### 1. Marcas e produtos (fotos enviadas)
- Cadastrar as 7 marcas dos arquivos enviados: **BLUNT, HIGH, SUFGANG, RACIONAIS, BRASIL, ELEMENT, PALM ANGELS**.
- Todas as fotos enviadas são camisetas (frente e costas na mesma imagem) — não há fotos de shorts nem moletons. Por isso:
  - Cada marca entra nas duas categorias: **Camisas Street** e **Camisas Oversize**, usando as mesmas fotos nas duas.
  - **Camisas Street: R$ 39,99** · **Camisas Oversize: R$ 49,99**.
  - Shorts Basic e Moletom Oversize ficam sem produtos reais por enquanto (fotos de exemplo são removidas de lá; quando você mandar as fotos, cadastro a R$ 39,99).
- Quantidade de peças por marca (uma peça por foto):
  - BLUNT: 15 · HIGH: 12 · SUFGANG: 9 · RACIONAIS: 6 · BRASIL: 3 · ELEMENT: 1 · PALM ANGELS: 1
- Nomes das peças: "Estampa 1", "Estampa 2"... dentro de cada marca (as fotos não trazem nomes — posso trocar depois se você me passar os nomes). Marcas ficam exatamente como acima.
- Remover os produtos de demonstração (marcas Marca A/B/C e selo "Exemplo").
- Cada peça: tamanhos P/M/G/GG, estoque padrão 10, código de referência automático (ex.: ST-BLUNT-01).

### 2. Logo VZ77™
- Redesenhar a logo no mesmo estilo atual (escrita à mão, preta): **VZ77™**.
- Trocar em todo o site: topo, menu, rodapé, aba do navegador (título passa a "VZ77™") e página Sobre.

## Detalhes técnicos
- Imagens: converter as 47 fotos PNG para WebP otimizado em `src/assets/marcas/<marca>/` (mantém o site rápido no celular).
- Catálogo: atualizar `src/data/catalog.ts` (BRANDS e PRODUCTS) — geração automática via script para não errar os 94 cadastros (47 peças × 2 categorias).
- Logo: reescrever `src/components/Logo.tsx` (SVG com paths próprios de VZ77™) e atualizar textos em `index.html`, rodapé e páginas que citam "VOID™".
- Verificação: typecheck + teste no navegador (home, categoria com abas de marca, página de produto, carrinho).

## Fora do escopo (aguardando você)
- Fotos de Shorts Basic e Moletom Oversize.
- Nomes personalizados das estampas (hoje: Estampa 1, 2, 3...).
