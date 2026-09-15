import { CartItem } from "@/stores/cartStore";
import { WHATSAPP_NUMBER, STORE_NAME } from "@/config/store";
import { getProductBySlug, getBrand, getCategory, formatBRL, productImages } from "@/data/catalog";

function publicImageUrl(imageUrl: string | undefined): string | undefined {
  if (!imageUrl) return undefined;
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  return `${window.location.origin}${imageUrl}`;
}

/** Monta o texto do pedido que será enviado no WhatsApp. */
export function buildOrderMessage(items: CartItem[]): string {
  const lines: string[] = [];
  lines.push(`Olá! Quero finalizar meu pedido na ${STORE_NAME}:`);
  lines.push("");

  let total = 0;

  items.forEach((item, index) => {
    const handle = item.product.node.handle;
    const product = getProductBySlug(handle);
    const brand = product?.brand ? getBrand(product.brand)?.name : undefined;
    const category = product ? getCategory(product.category)?.name : undefined;
    const imageUrl = publicImageUrl(product ? productImages(product)[0] : item.product.node.images.edges[0]?.node.url);

    const unit = parseFloat(item.price.amount);
    const subtotal = unit * item.quantity;
    total += subtotal;

    lines.push(`${index + 1}) ${item.product.node.title}`);
    if (brand) lines.push(`   Marca: ${brand}`);
    if (category) lines.push(`   Modelo: ${category}`);
    if (product?.sku) lines.push(`   Ref: ${product.sku}`);
    if (imageUrl) lines.push(`   Foto da peça: ${imageUrl}`);
    item.selectedOptions.forEach((option) => {
      lines.push(`   ${option.name}: ${option.value}`);
    });
    lines.push(`   Quantidade: ${item.quantity}`);
    lines.push(`   Preço unitário: ${formatBRL(unit)}`);
    lines.push(`   Subtotal: ${formatBRL(subtotal)}`);
    lines.push("");
  });

  lines.push(`TOTAL: ${formatBRL(total)}`);

  return lines.join("\n");
}

/** Link do WhatsApp com a mensagem do pedido já preenchida. */
export function buildWhatsAppUrl(items: CartItem[]): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildOrderMessage(items))}`;
}
