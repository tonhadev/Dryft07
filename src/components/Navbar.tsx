import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

import { useCartStore } from '@/stores/cartStore';
import { CATEGORIES, categoryPath } from '@/data/catalog';
import OffCanvasMenu from './OffCanvasMenu';
import SearchPanel from './SearchPanel';
import CartDrawer from './CartDrawer';
import Logo from './Logo';

export default function Navbar() {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const totalItems = useCartStore(state => state.getTotalItems());
  const setCartOpen = useCartStore(state => state.setOpen);
  const cartOpen = useCartStore(state => state.isOpen);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path.split('?')[0];

  return (
    <>
      <header className="nav-depth fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border text-foreground">
        <nav className="nav-height flex items-center justify-between gap-4 page-padding">
          {/* Esquerda */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity lg:hidden"
              aria-label="Abrir menu"
            >
              Menu
            </button>
            <Link to="/" className="shrink-0">
              <Logo />
            </Link>
          </div>

          {/* Centro - links de categorias (desktop) */}
          <ul className="hidden lg:flex items-center gap-6">
            <li>
              <Link
                to="/"
                className={`nav-depth-link text-xs uppercase tracking-wide ${
                  isActive('/') ? 'is-active' : ''
                }`}
              >
                Início
              </Link>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category.slug}>
                <Link
                  to={categoryPath(category.slug)}
                  className={`nav-depth-link text-xs uppercase tracking-wide ${
                    isActive(`/categoria/${category.slug}`) ? 'is-active' : ''
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Direita */}
          <div className="flex items-center gap-4">
            {!isMobile && (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
                aria-label="Buscar"
              >
                Buscar
              </button>
            )}

            <button
              onClick={() => setCartOpen(true)}
              className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
              aria-label="Carrinho"
            >
              Carrinho{totalItems > 0 && ` (${totalItems})`}
            </button>
          </div>
        </nav>
      </header>

      <OffCanvasMenu open={menuOpen} onClose={() => setMenuOpen(false)} onOpenSearch={() => setSearchOpen(true)} />
      <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
