import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Settings2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vincis — Configuração de Preços" },
      {
        name: "description",
        content:
          "Ambiente de configuração da página de preços da Vincis: regras, faixas e valores da calculadora.",
      },
      { property: "og:title", content: "Vincis — Configuração de Preços" },
      {
        property: "og:description",
        content: "Ambiente de configuração da página de preços da Vincis.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-5">
      <div className="max-w-md text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-lg font-bold text-primary-foreground">
          V
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground">
          Configuração de preços Vincis
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Painel administrativo para cadastrar os valores e regras que alimentam a página pública de
          preços.
        </p>
        <Link
          to="/admin"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Settings2 className="size-4" /> Abrir o admin <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
