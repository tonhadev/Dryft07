import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CatalogCard from '@/components/catalog/CatalogCard';
import ProductQuickView from '@/components/catalog/ProductQuickView';
import { VISIBLE_CATEGORIES, CatalogProduct, categoryPath, getFeaturedProducts } from '@/data/catalog';
import heroImage from '@/assets/hero-image.webp';
import heroDetail from '@/assets/marcas/chronic/02.webp';
import dryftWordmark from '@/assets/dryft-wordmark.png';

export default function Index() {
  const [quickView, setQuickView] = useState<CatalogProduct | null>(null);
  const featured = getFeaturedProducts(4);

  return (
    <Layout>
      <Helmet>
        <title>Dryft07 — Loja de roupas street e oversize</title>
        <meta
          name="description"
          content="Camisas Street, Camisas Oversize, Shorts Basic e Moletom Oversize. Catálogos organizados por categoria e marca."
        />
      </Helmet>

      {/* Pôster de lançamento */}
      <section className="launch-poster" aria-labelledby="launch-title">
        <div className="launch-poster__top">
          <div className="launch-poster__microcopy">
            <span>Dryft07</span>
            <span>Brasil</span>
            <span>Desde 2026</span>
          </div>
          <div className="launch-poster__microcopy launch-poster__microcopy--right">
            <span>Streetwear</span>
            <span>Por pedido</span>
            <span>Não avulso</span>
          </div>
        </div>

        <h1 id="launch-title" className="launch-poster__wordmark">
          <img src={dryftWordmark} alt="Dryft07" className="launch-poster__wordmark-image" />
        </h1>

        <div className="launch-poster__copy">
          <p className="launch-poster__collection">Drop 01 / Coleção concreto</p>
          <h2 className="launch-poster__headline">Feita pra quem vive a rua.</h2>
          <p className="launch-poster__statement">Escolha as peças e monte seu pedido com a gente.</p>
        </div>

        <div className="launch-poster__visual" aria-label="Destaque da coleção Dryft07">
          <figure className="launch-poster__detail">
            <img src={heroDetail} alt="Detalhe de frente e verso de uma camisa da coleção" />
          </figure>
          <figure className="launch-poster__model">
            <img src={heroImage} alt="Modelo vestindo uma peça streetwear da coleção" />
          </figure>
        </div>

        <p className="launch-poster__aside">
          <span>Estilo</span>
          <span>com</span>
          <span>identidade</span>
        </p>

        <div className="launch-poster__footer">
          <p>Pedidos sob encomenda</p>
          <Link to={categoryPath('camisas-street')} className="launch-poster__cta">
            Ver catálogo
          </Link>
          <p className="launch-poster__footer-note">Atendimento pelo WhatsApp</p>
        </div>
      </section>

      {/* Destaques da loja */}
      <section className="border-b border-border bg-secondary">
        <div className="page-padding grid grid-cols-1 gap-px sm:grid-cols-3">
          {[
            { t: 'Estampas exclusivas', d: 'Tiragens limitadas, criadas para durar.' },
            { t: 'Pedidos sob encomenda', d: 'Monte seu pedido com atendimento direto.' },
            { t: 'Atendimento pelo WhatsApp', d: 'Tamanhos, disponibilidade e pedidos em um só lugar.' },
          ].map((item) => (
            <div key={item.t} className="bg-background px-6 py-7 text-center">
              <p className="text-[10px] uppercase tracking-[0.12em] mb-2">{item.t}</p>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="page-padding py-16 md:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Dryft07 / Catálogos</p>
            <h2 className="text-sm uppercase">Escolha sua categoria</h2>
          </div>
          <Link to={categoryPath('camisas-street')} className="hidden text-[10px] uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground sm:block">
            Ver catálogo
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {VISIBLE_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              to={categoryPath(category.slug)}
              className="group block"
            >
              <div className="aspect-[4/5] bg-secondary overflow-hidden">
                <img
                  src={category.cover}
                  alt={category.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
              </div>
              <p className="text-xs uppercase mt-3">{category.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Produtos em destaque */}
      <section className="page-padding border-t border-border py-16 md:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Seleção Dryft07</p>
            <h2 className="text-sm uppercase">Mais pedidos</h2>
          </div>
          <Link
            to={categoryPath('camisas-oversize')}
            className="text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Ver tudo
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
          {featured.map((product) => (
            <CatalogCard key={product.slug} product={product} onQuickView={setQuickView} />
          ))}
        </div>
      </section>

      {/* Sobre a marca */}
      <section className="page-padding border-t border-border bg-secondary py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Dryft07 / Sobre a loja</p>
          <h2 className="text-sm uppercase mb-4">Feito para quem vive a rua</h2>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Trabalhamos por pedidos e não realizamos compras avulsas de apenas uma peça.
            Trabalhamos com poucas peças por coleção, feitas em algodão de gramatura alta e
            acabamento reforçado. Cada categoria tem seu próprio catálogo, e as camisas são
            organizadas por marca para facilitar sua escolha.
          </p>
          <Link
            to={categoryPath('camisas-street')}
            className="inline-block border border-border text-xs uppercase tracking-wide px-6 py-3 hover:bg-secondary transition-colors"
          >
            Conhecer os catálogos
          </Link>
        </div>
      </section>

      <section className="page-padding bg-primary py-14 text-primary-foreground md:py-16">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Atendimento Dryft07</p>
            <h2 className="text-lg uppercase leading-tight">Pronto para montar seu pedido?</h2>
            <p className="mt-3 text-xs leading-relaxed text-primary-foreground/70">
              Confira as categorias e fale com a gente para consultar disponibilidade, tamanhos e condições do pedido.
            </p>
          </div>
          <Link to="/contact" className="border border-primary-foreground px-6 py-3 text-center text-[10px] uppercase tracking-[0.12em] transition-colors hover:bg-primary-foreground hover:text-primary">
            Chamar no WhatsApp
          </Link>
        </div>
      </section>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </Layout>
  );
}
