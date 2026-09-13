import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CatalogProduct, formatBRL, productColors, productImages, productPath } from "@/data/catalog";
import { addCatalogProductToCart } from "@/lib/catalogCart";
import { useCartStore } from "@/stores/cartStore";

interface Props {
  product: CatalogProduct | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: Props) {
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const setCartOpen = useCartStore((s) => s.setOpen);

  useEffect(() => {
    setSize(product?.sizes?.length ? null : "Único");
    setColor(null);
    setImageIndex(0);
  }, [product]);

  if (!product) return null;
  const images = productImages(product);
  const colors = productColors(product);
  const pricePending = product.pricePending;

  const handleAdd = () => {
    if (pricePending) {
      toast.info("Preço em breve");
      return;
    }
    if (!size) {
      toast.error("Selecione um tamanho");
      return;
    }
    if (colors.length && !color) {
      toast.error("Selecione uma cor");
      return;
    }
    addCatalogProductToCart(product, size, color ?? undefined);
    toast.success("Adicionado à sacola", {
      description: [product.name, size, color].filter(Boolean).join(" — "),
    });
    onClose();
    setCartOpen(true);
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-y-auto max-h-[90vh]">
        <div className="grid md:grid-cols-2">
          <div className="bg-secondary">
            <img
              src={images[imageIndex]}
              alt={product.name}
              className="w-full h-full object-cover aspect-[4/5]"
            />
            {images.length > 1 && (
              <div className="flex gap-2 p-2">
                {images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() => setImageIndex(i)}
                    className={`w-12 h-14 overflow-hidden border ${
                      i === imageIndex ? "border-foreground" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-6 space-y-4">
            <DialogTitle className="text-base uppercase">{product.name}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {product.description}
            </DialogDescription>

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
                      className={`min-w-11 px-3 py-2 text-xs border transition-colors ${
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
                      className={`px-3 py-2 text-xs border transition-colors ${
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

            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Ref. {product.sku} ·{" "}
              {product.stock > 0 ? `${product.stock} em estoque` : "Esgotado"}
            </p>

            <button
              onClick={handleAdd}
              disabled={product.stock <= 0 || pricePending}
              className="w-full bg-primary text-primary-foreground text-xs uppercase tracking-wide py-3 hover:opacity-80 transition-opacity disabled:opacity-40"
            >
              {product.stock <= 0 ? "Esgotado" : pricePending ? "Preço em breve" : "Adicionar à sacola"}
            </button>

            <Link
              to={productPath(product)}
              onClick={onClose}
              className="block text-center text-[10px] uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver página completa
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
