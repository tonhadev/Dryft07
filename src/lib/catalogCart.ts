import { CatalogProduct, productImages } from "@/data/catalog";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore, CartItem } from "@/stores/cartStore";

/** Converte um produto do catálogo local no formato usado pelo carrinho. */
export function toCartProduct(product: CatalogProduct): ShopifyProduct {
  const price = { amount: String(product.price), currencyCode: "BRL" };
  const sizes = product.sizes?.length ? product.sizes : ["Único"];

  return {
    node: {
      id: product.slug,
      title: product.name,
      description: product.description,
      handle: product.slug,
      tags: [],
      priceRange: { minVariantPrice: price },
      images: {
        edges: productImages(product).map((url) => ({
          node: { url, altText: product.name },
        })),
      },
      variants: {
        edges: sizes.map((size) => ({
          node: {
            id: `${product.slug}-${size}`,
            title: size,
            price,
            availableForSale: product.stock > 0,
            selectedOptions: [{ name: "Tamanho", value: size }],
          },
        })),
      },
      options: [{ name: "Tamanho", values: sizes }],
      availableForSale: product.stock > 0,
    },
  };
}

export function buildCartItem(
  product: CatalogProduct,
  size: string,
  color?: string,
  quantity = 1,
): CartItem {
  const optionKey = color ? `${size}-${color}` : size;
  const selectedOptions = [
    { name: "Tamanho", value: size },
    ...(color ? [{ name: "Cor", value: color }] : []),
  ];

  return {
    product: toCartProduct(product),
    variantId: `${product.slug}-${optionKey}`,
    variantTitle: optionKey,
    price: { amount: String(product.price), currencyCode: "BRL" },
    quantity,
    selectedOptions,
  };
}

export function addCatalogProductToCart(
  product: CatalogProduct,
  size: string,
  color?: string,
  quantity = 1,
) {
  useCartStore.getState().addItem(buildCartItem(product, size, color, quantity));
}
