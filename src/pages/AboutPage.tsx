import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-image.webp";

export default function AboutPage() {
  return (
    <Layout>
      <Helmet>
        <title>Sobre — Dryft07</title>
        <meta name="description" content="Dryft07 — streetwear feito para quem vive a rua." />
      </Helmet>

      <section className="min-h-[calc(100vh-3.5rem)]">
        <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto">
            <img
              src={heroImage}
              alt="Peça da coleção Dryft07"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex items-center page-padding py-16 md:py-0">
            <div className="max-w-sm">
              <h1 className="mb-8 text-sm uppercase">Sobre a Dryft07</h1>
              <div className="space-y-6 text-xs leading-relaxed text-muted-foreground">
                <p>
                  A Dryft07 nasce da rua, da expressão e do movimento. Criamos peças para quem
                  transforma o próprio estilo em identidade.
                </p>
                <p>
                  Cada estampa é escolhida para marcar presença, com modelagens street e oversize
                  que unem conforto, atitude e personalidade.
                </p>
                <p>
                  Nosso catálogo está sempre em movimento, com referências que acompanham quem
                  vive a cultura urbana todos os dias.
                </p>
                <p className="border-l-2 border-foreground pl-4 text-foreground">
                  Trabalhamos por pedidos. Não realizamos compras avulsas de apenas uma peça.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
