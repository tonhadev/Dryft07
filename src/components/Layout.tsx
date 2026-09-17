import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { CATEGORIES, categoryPath } from "@/data/catalog";

interface LayoutProps {
  children: ReactNode;
  showHero?: boolean;
}

export default function Layout({ children, showHero = false }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className={showHero ? "" : "pt-[84px]"}>{children}</main>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="page-padding grid gap-10 py-12 text-xs md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <p className="text-base font-semibold uppercase tracking-[0.12em]">Dryft07</p>
            <p className="mt-4 leading-relaxed text-primary-foreground/70">
              Streetwear para quem transforma estilo em identidade. Atendimento direto para montar seu pedido.
            </p>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Catálogos</p>
            <ul className="space-y-2">
              {CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link className="transition-opacity hover:opacity-60" to={categoryPath(category.slug)}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.16em] text-primary-foreground/60">Atendimento</p>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Pedidos sob encomenda</li>
              <li>Não vendemos peça avulsa</li>
              <li><Link className="transition-opacity hover:opacity-60" to="/contact">Falar pelo WhatsApp</Link></li>
              <li><Link className="transition-opacity hover:opacity-60" to="/about">Sobre a loja</Link></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-primary-foreground/20 px-4 py-4 text-[9px] uppercase tracking-[0.14em] text-primary-foreground/60 md:px-8">
          <span>Dryft07 © 2026</span>
          <span>Desenvolvido por joaodev</span>
        </div>
      </footer>
    </div>
  );
}
