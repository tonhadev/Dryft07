import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { useCartStore } from '@/stores/cartStore';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';

export default function CartPage() {
  const { items, isLoading, updateQuantity, removeItem, checkout, getTotalPrice } = useCartStore();
  const { formatPrice } = useFormattedPrice();

  const totalPrice = getTotalPrice();

  return (
    <Layout>
      <Helmet>
        <title>Sacola — Dryft07</title>
        <meta name="description" content="Sua sacola de compras" />
      </Helmet>

      <div className="page-padding py-12">
        <h1 className="text-sm uppercase mb-8">Sacola</h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-xs text-muted-foreground mb-4">Sua sacola está vazia</p>
            <Link
              to="/"
              className="text-xs uppercase underline underline-offset-4 hover:opacity-60 transition-opacity"
            >
              Continuar comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="border-t border-border">
                {items.map((item) => (
                  <div key={item.variantId} className="py-6 border-b border-border flex gap-6">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-secondary flex-shrink-0">
                      {item.product.node.images?.edges?.[0]?.node && (
                        <img
                          src={item.product.node.images.edges[0].node.url}
                          alt={item.product.node.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <Link 
                          to={`/produto/${item.product.node.handle}`}
                          className="text-xs uppercase hover:opacity-60 transition-opacity"
                        >
                          {item.product.node.title}
                        </Link>
                        {item.selectedOptions.length > 0 && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.selectedOptions.map((option) => `${option.name}: ${option.value}`).join(' · ')}
                          </p>
                        )}
                        <p className="text-xs mt-2">
                          {formatPrice(item.price.amount, item.price.currencyCode)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-xs"
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="w-10 text-center text-xs">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors text-xs"
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.variantId)}
                          className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resumo do pedido */}
            <div className="lg:col-span-1">
              <div className="border border-border p-6">
                <h2 className="text-xs uppercase mb-6">Resumo do pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(totalPrice.toString(), items[0]?.price.currencyCode)}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Frete</span>
                    <span>Combinado pelo WhatsApp</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase">Total</span>
                    <span>{formatPrice(totalPrice.toString(), items[0]?.price.currencyCode)}</span>
                  </div>
                </div>

                <button
                  onClick={checkout}
                  className="w-full h-12 bg-foreground text-background text-xs uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  Finalizar pedido no WhatsApp
                </button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Você será levado ao WhatsApp da loja com o resumo do pedido pronto
                </p>
              </div>

              <Link
                to="/"
                className="block text-xs uppercase text-center mt-6 underline underline-offset-4 hover:opacity-60 transition-opacity"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
