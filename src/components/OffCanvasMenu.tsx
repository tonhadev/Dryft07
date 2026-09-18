import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';
import { VISIBLE_CATEGORIES, categoryPath } from '@/data/catalog';

interface OffCanvasMenuProps {
  open: boolean;
  onClose: () => void;
  onOpenSearch?: () => void;
}

const legalLinks = [
  { label: 'Termos e Condições', href: '/terms' },
  { label: 'Política de Privacidade', href: '/privacy' },
  { label: 'Política de Cookies', href: '/cookies' },
  { label: 'Envios e Trocas', href: '/shipping' },
  { label: 'Sobre', href: '/about' },
  { label: 'Contato', href: '/contact' },
];

export default function OffCanvasMenu({ open, onClose, onOpenSearch }: OffCanvasMenuProps) {
  const isMobile = useIsMobile();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setIsClosing(false);
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else if (isVisible) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        document.body.style.overflow = '';
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className={`absolute inset-0 bg-foreground/20 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={`absolute top-0 left-0 h-full w-[300px] max-w-[85vw] bg-background ${isClosing ? 'animate-slide-out-left' : 'animate-slide-in-left'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div className="flex flex-col h-full">
          <div className="nav-height flex items-center justify-end page-padding border-b border-border">
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="text-xs uppercase tracking-wide hover:opacity-60 transition-opacity"
              aria-label="Fechar menu"
            >
              Fechar
            </button>
          </div>

          <nav className="flex-1 py-8 page-padding overflow-y-auto">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  onClick={onClose}
                  className="text-sm uppercase hover:opacity-60 transition-opacity"
                >
                  Início
                </Link>
              </li>
              {VISIBLE_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={categoryPath(category.slug)}
                    onClick={onClose}
                    className="text-sm uppercase hover:opacity-60 transition-opacity"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="text-sm uppercase hover:opacity-60 transition-opacity"
                >
                  Carrinho
                </Link>
              </li>
              {isMobile && (
                <li>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenSearch?.();
                    }}
                    className="text-sm uppercase hover:opacity-60 transition-opacity"
                  >
                    Buscar
                  </button>
                </li>
              )}
            </ul>
          </nav>

          <div className="page-padding py-4 border-t border-border">
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    onClick={onClose}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="page-padding py-4">
            <p className="text-xs text-muted-foreground">© 2026 Dryft07 · joaodev</p>
          </div>
        </div>
      </div>
    </div>
  );
}
