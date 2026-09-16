import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CatalogCard from '@/components/catalog/CatalogCard';
import ProductQuickView from '@/components/catalog/ProductQuickView';
import { CATEGORIES, CatalogProduct, categoryPath, getFeaturedProducts } from '@/data/catalog';
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
            <span>Street</span>
            <span>Rua</span>
            <span>Atitude</span>
          </div>
          <div className="launch-poster__microcopy launch-poster__microcopy--right">
            <span>Caimento</span>
            <span>Algodão</span>
            <span>Estampa</span>
          </div>
        </div>

        <h1 id="launch-title" className="launch-poster__wordmark">
          <img src={dryftWordmark} alt="Dryft07" className="launch-poster__wordmark-image" />
        </h1>

        <div className="launch-poster__copy">
          <p className="launch-poster__collection">Coleção concreto</p>
          <p className="launch-poster__statement">
            <span>Feita</span>
            <span>pra quem</span>
            <span>vive</span>
            <span>a rua</span>
          </p>
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
          <span>Mais</span>
          <span>que uma</span>
          <span>marca</span>
        </p>

        <div className="launch-poster__footer">
          <p>Dryft07 / Brasil / 2026</p>
          <Link to={categoryPath('camisas-street')} className="launch-poster__cta">
            Ver catálogos
          </Link>
          <p className="launch-poster__footer-note">Streetwear em movimento</p>
        </div>
      </section>

      {/* Destaques da loja */}
      <section className="page-padding py-10 border-b border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { t: 'Estampas exclusivas', d: 'Tiragens limitadas, criadas para durar.' },
            { t: 'Envio para todo o Brasil', d: 'Postagem em até 3 dias úteis.' },
            { t: 'Compra pelo WhatsApp', d: 'Atendimento direto para finalizar seu pedido.' },
          ].map((item) => (
            <div key={item.t}>
              <p className="text-xs uppercase mb-1">{item.t}</p>
              <p className="text-xs text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section className="page-padding py-16">
        <h2 className="text-sm uppercase mb-8">Categorias</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
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
      <section className="page-padding pb-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-sm uppercase">Em destaque</h2>
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
      <section className="page-padding py-16 border-t border-border">
        <div className="max-w-2xl">
          <h2 className="text-sm uppercase mb-4">Sobre a loja</h2>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Trabalhamos por pedidos e não realizamos compras avulsas de apenas uma peça.
            Trabalhamos com poucas peças por coleção, feitas em algodão de gramatura alta e
            acabamento reforçado. Cada categoria tem seu próprio catálogo, e as camisas são
            organizadas por marca para facilitar sua escolha.
          </p>
          <Link
            to={categoryPath('moletom-oversize')}
            className="inline-block border border-border text-xs uppercase tracking-wide px-6 py-3 hover:bg-secondary transition-colors"
          >
            Conhecer os catálogos
          </Link>
        </div>
      </section>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </Layout>
  );
}
