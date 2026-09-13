import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS, formatBRL, getBrand, getCategory, productPath } from '@/data/catalog';

interface SearchPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchPanel({ open, onClose }: SearchPanelProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return PRODUCTS.filter((p) => {
      const brand = getBrand(p.brand)?.name ?? '';
      const category = getCategory(p.category)?.name ?? '';
      return `${p.name} ${brand} ${category} ${p.sku}`.toLowerCase().includes(q);
    }).slice(0, 12);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-background animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
        aria-label="Fechar busca"
      >
        Fechar
      </button>

      <div
        className="h-full flex flex-col items-center justify-center px-6"
        role="dialog"
        aria-modal="true"
        aria-label="Busca"
      >
        <div className="w-full max-w-xl">
          <div className="flex items-center border-b border-border pb-4">
            <span className="text-sm text-muted-foreground mr-4 flex-shrink-0 uppercase tracking-wide">
              Buscar
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome da peça, marca ou categoria"
              className="flex-1 bg-transparent outline-none text-lg"
            />
          </div>

          {query.trim().length > 1 && (
            <div className="mt-8 max-h-[50vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {results.map((product) => (
                    <Link
                      key={product.slug}
                      to={productPath(product)}
                      onClick={onClose}
                      className="hover:opacity-80 transition-opacity"
                    >
                      <div className="aspect-square bg-secondary mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs mb-1 line-clamp-1 uppercase">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{formatBRL(product.price)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Nenhuma peça encontrada</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
