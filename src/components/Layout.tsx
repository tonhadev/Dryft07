import { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
  showHero?: boolean;
}

export default function Layout({ children, showHero = false }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className={showHero ? '' : 'pt-14'}>{children}</main>
      <footer className="border-t border-border px-4 py-5 text-center text-[10px] uppercase tracking-wide text-muted-foreground md:px-8">
        Dryft07 © 2026 · Desenvolvido por joaodev
      </footer>
    </div>
  );
}
