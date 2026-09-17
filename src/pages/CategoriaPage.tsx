import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import CatalogCard from "@/components/catalog/CatalogCard";
import ProductQuickView from "@/components/catalog/ProductQuickView";
import NotFound from "@/pages/NotFound";
import {
  CatalogProduct,
  getBrandsForCategory,
  getCategory,
  getProducts,
} from "@/data/catalog";

export default function CategoriaPage() {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickView, setQuickView] = useState<CatalogProduct | null>(null);

  const category = getCategory(slug);
  const brandParam = searchParams.get("marca");

  const brands = useMemo(
    () => (category?.hasBrands ? getBrandsForCategory(category.slug) : []),
    [category]
  );

  const products = useMemo(
    () => (category ? getProducts(category.slug, category.hasBrands ? brandParam : null) : []),
    [category, brandParam]
  );

  if (!category) return <NotFound />;

  const selectBrand = (brand: string | null) => {
    if (brand) setSearchParams({ marca: brand }, { replace: true });
    else setSearchParams({}, { replace: true });
  };

  return (
    <Layout>
      <Helmet>
        <title>{`${category.name} — Catálogo`}</title>
        <meta name="description" content={category.description} />
      </Helmet>

      <section className="page-padding min-h-screen py-10 md:py-14">
        <nav className="text-[10px] uppercase tracking-wide text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{category.name}</span>
        </nav>

        <header className="mb-10 border-b border-border pb-8">
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Dryft07 / Catálogo</p>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-xl uppercase mb-2">{category.name}</h1>
              <p className="text-xs text-muted-foreground max-w-xl">{category.description}</p>
            </div>
            <p className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground">Pedidos sob encomenda</p>
          </div>
        </header>

        {(category.hasBrands || category.slug === "shorts-basic") && (
          <div className="-mx-4 md:mx-0 mb-10 border-b border-border">
            <div className="flex gap-2 overflow-x-auto px-4 md:px-0 pb-3 scrollbar-none">
              <button
                onClick={() => selectBrand(null)}
                className={`shrink-0 px-4 py-2 text-[11px] uppercase tracking-wide border transition-colors ${
                  !brandParam
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border hover:bg-secondary"
                }`}
              >
                Todas as marcas
              </button>
              {brands.map((brand) => (
                <button
                  key={brand.slug}
                  onClick={() => selectBrand(brand.slug)}
                  className={`shrink-0 px-4 py-2 text-[11px] uppercase tracking-wide border transition-colors ${
                    brandParam === brand.slug
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {brand.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-muted-foreground">
            {products.length} {products.length === 1 ? "peça" : "peças"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Nenhuma peça cadastrada por aqui ainda.
            </p>
            <p className="text-xs text-muted-foreground">
              Novas estampas aparecem aqui assim que forem cadastradas.
            </p>
          </div>
        ) : (
          <div
            key={brandParam ?? "todas"}
            className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-10 xl:grid-cols-4 xl:gap-x-8 animate-fade-in"
          >
            {products.map((product) => (
              <CatalogCard key={product.slug} product={product} onQuickView={setQuickView} />
            ))}
          </div>
        )}
      </section>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </Layout>
  );
}
