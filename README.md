# Dryft07

Loja virtual de streetwear com catálogo próprio, sacola de compras e finalização de pedidos pelo WhatsApp.

Projeto desenvolvido por **joaodev**.

## Tecnologias

- React + TypeScript + Vite
- Tailwind CSS
- Zustand para a sacola de compras

## Executar localmente

```sh
npm install
npm run dev
```

O site abre em `http://localhost:8080`.

## Comandos

```sh
npm run dev
npm run build
npm run lint
```

## Catálogo e pedidos

- Produtos, marcas, preços e estoque: `src/data/catalog.ts`
- Imagens das marcas: `src/assets/marcas/`
- Número que recebe os pedidos: `src/config/store.ts`

Os pedidos são montados na sacola e enviados ao WhatsApp da loja com os itens, tamanhos, cores e total.
