import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <Layout>
      <Helmet>
        <title>Página não encontrada — Dryft07</title>
      </Helmet>

      <section className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center page-padding">
        <div className="text-center">
          <h1 className="text-sm mb-4">404</h1>
          <p className="text-xs text-muted-foreground mb-8">
            A página que você procura não existe.
          </p>
          <Link 
            to="/" 
            className="text-xs underline underline-offset-4 hover:text-muted-foreground transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </section>
    </Layout>
  );
}
