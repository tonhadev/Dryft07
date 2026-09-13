import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { WHATSAPP_NUMBER } from "@/config/store";

const contactUrl = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function ContactPage() {
  return (
    <Layout>
      <Helmet>
        <title>Contato — Dryft07</title>
        <meta name="description" content="Fale com a Dryft07 diretamente pelo WhatsApp." />
      </Helmet>

      <section className="page-padding py-20">
        <div className="mx-auto max-w-lg">
          <h1 className="mb-3 text-sm uppercase">Contato</h1>
          <p className="mb-8 text-xs leading-relaxed text-muted-foreground">
            Dúvidas sobre peças, tamanhos, disponibilidade, pedidos ou trocas? Fale diretamente
            com a Dryft07 pelo WhatsApp.
          </p>

          <a
            href={contactUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-12 w-full items-center justify-center bg-foreground text-xs uppercase tracking-wide text-background transition-opacity hover:opacity-90"
          >
            Chamar no WhatsApp
          </a>

          <div className="mt-12 border-t border-border pt-8">
            <h2 className="mb-4 text-xs uppercase">Atendimento direto</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Ao abrir o WhatsApp, envie sua dúvida ou o número do pedido. Assim conseguimos te
              atender de forma mais rápida.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
