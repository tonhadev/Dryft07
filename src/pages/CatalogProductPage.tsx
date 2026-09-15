import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import CatalogCard from "@/components/catalog/CatalogCard";
import ProductQuickView from "@/components/catalog/ProductQuickView";
import {
  CatalogProduct,
  categoryPath,
  formatBRL,
  getBrand,
  getCategory,
  getProductBySlug,
  getProducts,
  productColors,
  productImages,
} from "@/data/catalog";
import { addCatalogProductToCart } from "@/lib/catalogCart";
import { useCartStore } from "@/stores/cartStore";

function ShirtCompleteDescription({ product, brandName }: { product: CatalogProduct; brandName?: string }) {
  const isOversize = product.category === "camisas-oversize";
  const fit = isOversize ? "modelagem oversize e caimento amplo" : "modelagem reta e caimento confortável";
  const measures = isOversize
    ? [["P", "56 x 72 x 22 cm"], ["M", "58 x 74 x 23 cm"], ["G", "60 x 76 x 24 cm"], ["GG", "62 x 78 x 25 cm"]]
    : [["P", "53 x 72 x 24 cm"], ["M", "55 x 74 x 24,5 cm"], ["G", "57 x 76 x 24,5 cm"], ["GG", "59 x 78 x 25 cm"]];

  return (
    <section className="border-t border-border pt-6 text-sm leading-relaxed">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]">Descrição completa</h2>
      <div className="mt-6 space-y-5">
        <div>
          <p><strong>Código identificador (SKU):</strong> {product.sku}</p>
          <p>{brandName ?? "Dryft07"}</p>
        </div>
        <p>
          Camiseta {brandName ?? "Dryft07"} com {fit}, gola redonda e estampa exclusiva.
          Confeccionada em algodão para oferecer conforto no uso diário.
        </p>
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-wide">Informações do produto</h3>
          <p className="mt-3">Modelo: Masculino</p>
          <p>Indicado para: dia a dia</p>
          <p className="mt-4">Fabricado no Brasil</p>
          <p>Composição: 100% algodão</p>
        </div>
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-wide">Tabela de tamanho</h3>
          <p className="mt-1 text-xs text-muted-foreground">Largura x Comprimento x Manga</p>
          <div className="mt-3 space-y-0.5">
            {measures.map(([size, measurement]) => <p key={size}>{size}: {measurement}</p>)}
          </div>
        </div>
        <div>
          <h3 className="text-[11px] font-medium uppercase tracking-wide">Marca</h3>
          <p className="mt-3">{brandName ?? "Dryft07"}</p>
        </div>
      </div>
    </section>
  );
}

export default function CatalogProductPage() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const [quickView, setQuickView] = useState<CatalogProduct | null>(null);
  const setCartOpen = useCartStore((s) => s.setOpen);

  if (!product) return <NotFound />;

  const category = getCategory(product.category)!;
  const brand = getBrand(product.brand);
  const images = productImages(product);
  const colors = productColors(product);
  const pricePending = product.pricePending;
  const related = getProducts(product.category, product.brand ?? null)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const handleAdd = () => {
    if (pricePending) {
      toast.info("Preço em breve");
      return;
    }
    const chosen = product.sizes?.length ? size : "Único";
    if (!chosen) {
      toast.error("Selecione um tamanho");
      return;
    }
    if (colors.length && !color) {
      toast.error("Selecione uma cor");
      return;
    }
    addCatalogProductToCart(product, chosen, color ?? undefined);
    toast.success("Adicionado à sacola", {
      description: [product.name, chosen, color].filter(Boolean).join(" — "),
    });
    setCartOpen(true);
  };

  return (
    <Layout>
      <Helmet>
        <title>{`${product.name} — ${category.name}`}</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <section className="page-padding py-12">
        <nav className="text-[10px] uppercase tracking-wide text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Início
          </Link>
          <span className="mx-2">/</span>
          <Link
            to={categoryPath(category.slug)}
            className="hover:text-foreground transition-colors"
          >
            {category.name}
          </Link>
          {brand && (
            <>
              <span className="mx-2">/</span>
              <Link
                to={categoryPath(category.slug, brand.slug)}
                className="hover:text-foreground transition-colors"
              >
                {brand.name}
              </Link>
            </>
          )}
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <div className="aspect-[4/5] bg-secondary overflow-hidden">
              <img
                src={images[imageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setImageIndex(i)}
                    className={`w-16 h-20 overflow-hidden border ${
                      i === imageIndex ? "border-foreground" : "border-border"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6 md:pt-4">
            {brand && (
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                {brand.name}
              </p>
            )}
            <h1 className="text-lg uppercase">{product.name}</h1>
            <p className="text-sm">
              {pricePending ? "Preço em breve" : formatBRL(product.price)}
              {product.compareAtPrice && (
                <span className="ml-2 text-muted-foreground line-through">
                  {formatBRL(product.compareAtPrice)}
                </span>
              )}
            </p>

            {product.sizes?.length ? (
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Tamanho
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-12 px-4 py-2 text-xs border transition-colors ${
                        size === s
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {colors.length > 0 && (
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Cor</p>
                <div className="flex flex-wrap gap-2">
                  {colors.map((availableColor) => (
                    <button
                      key={availableColor}
                      onClick={() => setColor(availableColor)}
                      aria-pressed={color === availableColor}
                      className={`px-4 py-2 text-xs border transition-colors ${
                        color === availableColor
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-border hover:bg-secondary"
                      }`}
                    >
                      {availableColor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={handleAdd}
              disabled={product.stock <= 0 || pricePending}
              className="w-full bg-primary text-primary-foreground text-xs uppercase tracking-wide py-4 hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {product.stock <= 0 ? "Esgotado" : pricePending ? "Preço em breve" : "Adicionar à sacola"}
            </button>

            {product.category === "camisas-street" || product.category === "camisas-oversize" ? (
              <ShirtCompleteDescription product={product} brandName={brand?.name} />
            ) : (
              <div className="space-y-2 border-t border-border pt-6">
                <p className="text-xs text-muted-foreground leading-relaxed">{product.description}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Referência: {product.sku}
                </p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  Disponibilidade: {product.stock > 0 ? `${product.stock} unidade(s)` : "Esgotado"}
                </p>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-sm uppercase mb-6">Você também pode gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {related.map((p) => (
                <CatalogCard key={p.slug} product={p} onQuickView={setQuickView} />
              ))}
            </div>
          </div>
        )}
      </section>

      <ProductQuickView product={quickView} onClose={() => setQuickView(null)} />
    </Layout>
  );
}
