import { useState } from "react";
import { Link } from "react-router-dom";
import { CatalogProduct, formatBRL, productImages, productPath } from "@/data/catalog";

interface Props {
  product: CatalogProduct;
  onQuickView: (product: CatalogProduct) => void;
}

export default function CatalogCard({ product, onQuickView }: Props) {
  const images = productImages(product);
  const [hover, setHover] = useState(false);
  const soldOut = product.stock <= 0;
  const image = hover && images[1] ? images[1] : images[0];

  return (
    <article
      className="group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link
        to={productPath(product)}
        className="block relative aspect-[4/5] bg-secondary overflow-hidden"
      >
        <img
          src={image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        {product.demo && (
          <span className="absolute top-2 left-2 bg-background/90 text-[10px] uppercase tracking-wide px-1.5 py-0.5 border border-border">
            Exemplo
          </span>
        )}
        {soldOut && (
          <span className="absolute bottom-0 left-0 right-0 bg-background/90 py-2 text-center text-xs text-muted-foreground uppercase">
            Esgotado
          </span>
        )}
      </Link>

      <div className="pt-3 space-y-1">
        <h3 className="text-xs uppercase line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground">
          {formatBRL(product.price)}
          {product.compareAtPrice && (
            <span className="ml-2 line-through opacity-60">
              {formatBRL(product.compareAtPrice)}
            </span>
          )}
        </p>
        <div className="flex gap-2 pt-2">
          <Link
            to={productPath(product)}
            className="flex-1 text-center text-[10px] uppercase tracking-wide border border-border py-2 hover:bg-secondary transition-colors"
          >
            Detalhes
          </Link>
          <button
            onClick={() => onQuickView(product)}
            disabled={soldOut}
            className="flex-1 text-[10px] uppercase tracking-wide bg-primary text-primary-foreground py-2 hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {soldOut ? "Esgotado" : "Adicionar"}
          </button>
        </div>
      </div>
    </article>
  );
}
