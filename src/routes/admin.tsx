import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  Calculator,
  ChevronRight,
  Eye,
  GripVertical,
  Headphones,
  LayoutList,
  Plus,
  RotateCcw,
  Save,
  Scale,
  Settings2,
  Sparkles,
  Table2,
  Trash2,
  Type,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Field, MoneyInput, Panel, SectionHeader } from "@/components/admin/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin de Preços — Vincis" },
      {
        name: "description",
        content:
          "Painel administrativo Vincis para configurar as regras, faixas e valores que alimentam a página de preços.",
      },
      { property: "og:title", content: "Admin de Preços — Vincis" },
      {
        property: "og:description",
        content: "Configure enquadramentos, faixas, adicionais e planos da calculadora de preços.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

/* ------------------------------------------------------------------ */
/* Dados de exemplo (somente visual — sem backend)                     */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "servicos", label: "Tipos de serviço", icon: Scale },
  { id: "perfil", label: "Perfil da empresa", icon: Building2 },
  { id: "faixas", label: "Faixas e volumes", icon: LayoutList },
  { id: "atendimento", label: "Atendimento e rotina", icon: Headphones },
  { id: "adicionais", label: "Adicionais", icon: Sparkles },
  { id: "planos", label: "Planos e descontos", icon: Calculator },
  { id: "comparativo", label: "Tabela comparativa", icon: Table2 },
  { id: "textos", label: "Textos da página", icon: Type },
] as const;

type NavId = (typeof NAV)[number]["id"];

const servicos = [
  { nome: "Contabilidade", desc: "Padrão ou consultiva", base: "260", ativo: true },
  { nome: "Assistência Jurídica", desc: "Consultas e contratos", base: "390", ativo: true },
  {
    nome: "Pacote Empresarial Completo",
    desc: "Contabilidade + Jurídico",
    base: "590",
    ativo: true,
  },
];

const enquadramentos = [
  { nome: "MEI", desc: "Faturamento até R$ 81 mil/ano", base: "89", mult: "1,00", ativo: true },
  { nome: "Simples Nacional", desc: "O regime mais comum", base: "260", mult: "1,00", ativo: true },
  { nome: "Lucro Presumido", desc: "Apuração trimestral", base: "420", mult: "1,25", ativo: true },
  { nome: "Lucro Real", desc: "Estrutura contábil completa", base: "780", mult: "1,60", ativo: true },
];

const ramos = [
  { nome: "Serviços", mult: "1,00", ativo: true },
  { nome: "Comércio", mult: "1,15", ativo: true },
  { nome: "Indústria", mult: "1,35", ativo: true },
];

const faixasFuncionarios = [
  { de: "0", ate: "0", valor: "0" },
  { de: "1", ate: "5", valor: "35" },
  { de: "6", ate: "15", valor: "28" },
  { de: "16", ate: "40", valor: "22" },
  { de: "41", ate: "999", valor: "18" },
];

const faixasNotas = [
  { de: "0", ate: "10", valor: "0" },
  { de: "11", ate: "30", valor: "60" },
  { de: "31", ate: "80", valor: "140" },
  { de: "81", ate: "9999", valor: "260" },
];

const faixasFaturamento = [
  { de: "0", ate: "30.000", valor: "0" },
  { de: "30.001", ate: "100.000", valor: "90" },
  { de: "100.001", ate: "300.000", valor: "210" },
  { de: "300.001", ate: "9.999.999", valor: "420" },
];

const atendimentos = [
  { nome: "100% digital", desc: "Chat e e-mail, resposta em até 9h", valor: "0", ativo: true },
  { nome: "Híbrido", desc: "Chat, telefone e reuniões em grupo", valor: "80", ativo: true },
  {
    nome: "Atendimento prioritário",
    desc: "WhatsApp direto e reuniões 1:1",
    valor: "180",
    ativo: true,
  },
];

const rotinas = [
  {
    nome: "Eu cuido de parte da rotina",
    desc: "Envio documentos e acompanho de perto",
    valor: "0",
    ativo: true,
  },
  {
    nome: "Quero que a Vincis cuide",
    desc: "Rotina conduzida pelo time Vincis de ponta a ponta",
    valor: "150",
    ativo: true,
  },
];

const adicionais = [
  { nome: "Emissão de notas avulsas extra", desc: "Além da faixa contratada", valor: "39" },
  { nome: "Reunião mensal 1:1", desc: "Com o profissional responsável", valor: "59" },
  { nome: "Suporte prioritário", desc: "Resposta garantida em até 2h", valor: "49" },
  { nome: "Especialista dedicado", desc: "Ponto de contato fixo", valor: "149" },
];

const planos = [
  {
    nome: "Contabilidade Padrão",
    desc: "Execução das rotinas contábeis, fiscais e trabalhistas da empresa com segurança, organização e pontualidade.",
    mult: "1,00",
    destaque: false,
    selo: "",
    d6: "20",
    d12: "40",
  },
  {
    nome: "Contabilidade Consultiva",
    desc: "Uma relação mais próxima com sua empresa, com acompanhamento, análises e orientação para apoiar decisões e crescimento.",
    mult: "1,29",
    destaque: true,
    selo: "Acompanhamento mais próximo",
    d6: "25",
    d12: "50",
  },
];

const comparativo = [
  { grupo: "Rotinas contábeis", linhas: [
    { f: "Escrituração fiscal e contábil", a: "incluso", b: "incluso" },
    { f: "Folha de pagamento", a: "incluso", b: "incluso" },
    { f: "Obrigações acessórias", a: "incluso", b: "incluso" },
    { f: "Emissão de notas fiscais", a: "Opcional", b: "Opcional" },
  ] },
  { grupo: "Consultoria", linhas: [
    { f: "Reuniões de acompanhamento", a: "—", b: "Mensal" },
    { f: "Análise e orientação estratégica", a: "—", b: "incluso" },
    { f: "Apoio à tomada de decisão", a: "—", b: "incluso" },
  ] },
  { grupo: "Atendimento", linhas: [
    { f: "Canal de atendimento", a: "Conforme escolhido", b: "Conforme escolhido" },
    { f: "Especialista dedicado", a: "Opcional", b: "Opcional" },
  ] },
];

/* ------------------------------------------------------------------ */

function AdminPage() {
  const [active, setActive] = useState<NavId>("servicos");

  return (
    <div className="min-h-dvh bg-background">
      <Topbar />
      <div className="mx-auto flex max-w-7xl gap-8 px-5 py-8">
        <Sidebar active={active} onSelect={setActive} />
        <main className="min-w-0 flex-1 space-y-6 pb-24">
          {active === "servicos" && <ServicosSection />}
          {active === "perfil" && <PerfilSection />}
          {active === "faixas" && <FaixasSection />}
          {active === "atendimento" && <AtendimentoSection />}
          {active === "adicionais" && <AdicionaisSection />}
          {active === "planos" && <PlanosSection />}
          {active === "comparativo" && <ComparativoSection />}
          {active === "textos" && <TextosSection />}
        </main>
        <PreviewRail />
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-card/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-gold text-sm font-bold text-primary-foreground">
            V
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">Vincis · Admin</p>
            <p className="text-xs text-muted-foreground">Configuração da página de preços</p>
          </div>
          <Badge variant="outline" className="ml-2 hidden border-border/80 text-[11px] sm:inline-flex">
            Rascunho
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <RotateCcw /> Descartar
          </Button>
          <Button variant="outline" size="sm">
            <Eye /> Pré-visualizar
          </Button>
          <Button size="sm">
            <Save /> Publicar
          </Button>
        </div>
      </div>
    </header>
  );
}

function Sidebar({ active, onSelect }: { active: NavId; onSelect: (id: NavId) => void }) {
  return (
    <aside className="hidden w-60 shrink-0 lg:block">
      <nav className="sticky top-24 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                isActive
                  ? "bg-accent font-medium text-foreground shadow-card"
                  : "text-muted-foreground hover:bg-accent/60 hover:text-foreground",
              )}
            >
              <Icon className={cn("size-4", isActive && "text-primary")} />
              <span className="truncate">{item.label}</span>
              {isActive ? <ChevronRight className="ml-auto size-4 text-primary" /> : null}
            </button>
          );
        })}
        <Separator className="my-4" />
        <div className="rounded-lg border border-border/70 bg-card p-3">
          <p className="text-xs font-semibold text-foreground">Regras demonstrativas</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Esta tela é apenas o layout. Nenhum valor é salvo até o backend ser conectado.
          </p>
        </div>
      </nav>
    </aside>
  );
}

/* ---------------------------- seções ---------------------------- */

function ServicosSection() {
  return (
    <>
      <SectionHeader
        title="Tipos de serviço"
        description="Os três cartões exibidos no topo da página de preços. O valor base é o ponto de partida do cálculo."
        action={
          <Button variant="outline" size="sm">
            <Plus /> Novo serviço
          </Button>
        }
      />
      <div className="grid gap-4 md:grid-cols-3">
        {servicos.map((s) => (
          <Panel key={s.nome} className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <GripVertical className="mt-1 size-4 shrink-0 text-muted-foreground/60" />
              <Switch defaultChecked={s.ativo} />
            </div>
            <Field label="Nome do serviço">
              <Input defaultValue={s.nome} className="h-9 bg-background" />
            </Field>
            <Field label="Subtítulo">
              <Input defaultValue={s.desc} className="h-9 bg-background" />
            </Field>
            <Field label="Valor base mensal" hint="Somado às faixas e adicionais escolhidos.">
              <MoneyInput value={s.base} suffix="/mês" />
            </Field>
          </Panel>
        ))}
      </div>
    </>
  );
}

function PerfilSection() {
  return (
    <>
      <SectionHeader
        title="Perfil da empresa"
        description="Enquadramento fiscal e ramo de atuação definem a base e o multiplicador aplicados ao preço."
      />
      <Panel
        title="Enquadramento fiscal"
        description="Cada opção aparece como cartão selecionável no simulador."
        aside={
          <Button variant="outline" size="sm">
            <Plus /> Adicionar
          </Button>
        }
      >
        <div className="space-y-3">
          {enquadramentos.map((e) => (
            <div
              key={e.nome}
              className="grid items-end gap-3 rounded-lg border border-border/70 bg-background/60 p-3 md:grid-cols-[1.2fr_1.6fr_140px_120px_auto]"
            >
              <Field label="Nome">
                <Input defaultValue={e.nome} className="h-9 bg-background" />
              </Field>
              <Field label="Descrição">
                <Input defaultValue={e.desc} className="h-9 bg-background" />
              </Field>
              <Field label="Valor base">
                <MoneyInput value={e.base} />
              </Field>
              <Field label="Multiplicador">
                <MoneyInput value={e.mult} prefix={null} suffix="x" />
              </Field>
              <div className="flex items-center gap-2 pb-1">
                <Switch defaultChecked={e.ativo} />
                <Button variant="ghost" size="icon" className="text-muted-foreground">
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Panel>

      <Panel
        title="Ramo da empresa"
        description="Multiplicador aplicado sobre o subtotal do enquadramento."
      >
        <div className="grid gap-3 sm:grid-cols-3">
          {ramos.map((r) => (
            <div key={r.nome} className="rounded-lg border border-border/70 bg-background/60 p-3">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{r.nome}</span>
                <Switch defaultChecked={r.ativo} />
              </div>
              <Field label="Multiplicador">
                <MoneyInput value={r.mult} prefix={null} suffix="x" />
              </Field>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function RangeTable({
  title,
  description,
  unidade,
  rows,
  icon: Icon,
}: {
  title: string;
  description: string;
  unidade: string;
  rows: { de: string; ate: string; valor: string }[];
  icon: typeof Users;
}) {
  return (
    <Panel
      title={title}
      description={description}
      aside={
        <Button variant="outline" size="sm">
          <Plus /> Nova faixa
        </Button>
      }
    >
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        <Icon className="size-4 text-primary" />
        Unidade: {unidade}
      </div>
      <div className="overflow-hidden rounded-lg border border-border/70">
        <table className="w-full text-sm">
          <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">De</th>
              <th className="px-3 py-2 font-medium">Até</th>
              <th className="px-3 py-2 font-medium">Acréscimo mensal</th>
              <th className="w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70 bg-card">
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="px-3 py-2">
                  <Input defaultValue={r.de} className="h-8 bg-background tabular-nums" />
                </td>
                <td className="px-3 py-2">
                  <Input defaultValue={r.ate} className="h-8 bg-background tabular-nums" />
                </td>
                <td className="px-3 py-2">
                  <MoneyInput value={r.valor} className="max-w-40" />
                </td>
                <td className="px-2">
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <Trash2 />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

function FaixasSection() {
  return (
    <>
      <SectionHeader
        title="Faixas e volumes"
        description="Os sliders da página (funcionários, notas fiscais e faturamento) somam valores conforme a faixa atingida."
      />
      <RangeTable
        title="Funcionários registrados"
        description="Valor cobrado por funcionário dentro de cada faixa."
        unidade="pessoas"
        rows={faixasFuncionarios}
        icon={Users}
      />
      <RangeTable
        title="Notas fiscais por mês"
        description="Acréscimo fixo por faixa de emissão mensal."
        unidade="notas/mês"
        rows={faixasNotas}
        icon={LayoutList}
      />
      <RangeTable
        title="Faturamento mensal"
        description="Acréscimo fixo por faixa de receita informada."
        unidade="R$/mês"
        rows={faixasFaturamento}
        icon={Calculator}
      />
    </>
  );
}

function OptionList({
  rows,
}: {
  rows: { nome: string; desc: string; valor: string; ativo: boolean }[];
}) {
  return (
    <div className="space-y-3">
      {rows.map((o) => (
        <div
          key={o.nome}
          className="grid items-end gap-3 rounded-lg border border-border/70 bg-background/60 p-3 md:grid-cols-[1.2fr_1.8fr_150px_auto]"
        >
          <Field label="Título">
            <Input defaultValue={o.nome} className="h-9 bg-background" />
          </Field>
          <Field label="Descrição">
            <Input defaultValue={o.desc} className="h-9 bg-background" />
          </Field>
          <Field label="Acréscimo">
            <MoneyInput value={o.valor} suffix="/mês" />
          </Field>
          <div className="flex items-center gap-2 pb-1">
            <Switch defaultChecked={o.ativo} />
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Trash2 />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AtendimentoSection() {
  return (
    <>
      <SectionHeader
        title="Atendimento e rotina"
        description="Como o cliente quer ser atendido e quem conduz a rotina — cada escolha soma ao valor final."
      />
      <Panel title="Como quer ser atendido">
        <OptionList rows={atendimentos} />
      </Panel>
      <Panel title="Quem cuida da rotina">
        <OptionList rows={rotinas} />
      </Panel>
    </>
  );
}

function AdicionaisSection() {
  return (
    <>
      <SectionHeader
        title="Personalize com adicionais"
        description="Itens opcionais exibidos como cartões marcáveis antes do resultado do cálculo."
        action={
          <Button variant="outline" size="sm">
            <Plus /> Novo adicional
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {adicionais.map((a) => (
          <Panel key={a.nome} className="space-y-4">
            <div className="flex items-start justify-between">
              <Badge className="bg-accent text-accent-foreground hover:bg-accent">Opcional</Badge>
              <Switch defaultChecked />
            </div>
            <Field label="Título">
              <Input defaultValue={a.nome} className="h-9 bg-background" />
            </Field>
            <Field label="Descrição">
              <Input defaultValue={a.desc} className="h-9 bg-background" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Valor">
                <MoneyInput value={a.valor} suffix="/mês" />
              </Field>
              <Field label="Ordem">
                <MoneyInput value={String(adicionais.indexOf(a) + 1)} prefix={null} />
              </Field>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}

function PlanosSection() {
  return (
    <>
      <SectionHeader
        title="Planos e descontos"
        description="Cartões de resultado, multiplicador sobre o valor calculado e desconto por período de contrato."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {planos.map((p) => (
          <Panel key={p.nome} className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Plano
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Destacar</span>
                <Switch defaultChecked={p.destaque} />
              </div>
            </div>
            <Field label="Nome do plano">
              <Input defaultValue={p.nome} className="h-9 bg-background" />
            </Field>
            <Field label="Selo de destaque" hint="Deixe vazio para não exibir a faixa dourada.">
              <Input defaultValue={p.selo} placeholder="Ex.: Acompanhamento mais próximo" className="h-9 bg-background" />
            </Field>
            <Field label="Descrição">
              <Textarea defaultValue={p.desc} rows={3} className="resize-none bg-background" />
            </Field>
            <div className="grid grid-cols-3 gap-3">
              <Field label="Multiplicador">
                <MoneyInput value={p.mult} prefix={null} suffix="x" />
              </Field>
              <Field label="Desconto 6 meses">
                <MoneyInput value={p.d6} suffix="/mês" />
              </Field>
              <Field label="Desconto 12 meses">
                <MoneyInput value={p.d12} suffix="/mês" />
              </Field>
            </div>
          </Panel>
        ))}
      </div>
      <Panel title="Períodos de contrato" description="Rótulos exibidos nas abas de cada cartão de plano.">
        <div className="grid gap-3 sm:grid-cols-3">
          {["Mensal", "6 meses", "12 meses"].map((label, i) => (
            <div key={label} className="rounded-lg border border-border/70 bg-background/60 p-3">
              <Field label={`Aba ${i + 1}`}>
                <Input defaultValue={label} className="h-9 bg-background" />
              </Field>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                Visível
                <Switch defaultChecked />
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function ComparativoSection() {
  return (
    <>
      <SectionHeader
        title="Veja exatamente o que muda"
        description="Tabela comparativa entre os planos exibida abaixo dos cartões de preço."
        action={
          <Button variant="outline" size="sm">
            <Plus /> Novo grupo
          </Button>
        }
      />
      {comparativo.map((g) => (
        <Panel key={g.grupo}>
          <div className="mb-4 flex items-center justify-between gap-3">
            <Input defaultValue={g.grupo} className="h-9 max-w-xs bg-background font-medium" />
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Plus /> Linha
            </Button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border/70">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Funcionalidade</th>
                  <th className="px-3 py-2 font-medium">Padrão</th>
                  <th className="px-3 py-2 font-medium">Consultiva</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border/70 bg-card">
                {g.linhas.map((l, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2">
                      <Input defaultValue={l.f} className="h-8 bg-background" />
                    </td>
                    <td className="px-3 py-2">
                      <Input defaultValue={l.a} className="h-8 bg-background" />
                    </td>
                    <td className="px-3 py-2">
                      <Input defaultValue={l.b} className="h-8 bg-background" />
                    </td>
                    <td className="px-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground">
                        <Trash2 />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      ))}
    </>
  );
}

function TextosSection() {
  return (
    <>
      <SectionHeader
        title="Textos da página"
        description="Títulos, chamadas e avisos exibidos na página pública de preços."
      />
      <Panel title="Topo da página">
        <div className="space-y-4">
          <Field label="Título principal">
            <Input defaultValue="Sua empresa não é igual às outras" className="h-9 bg-background" />
          </Field>
          <Field label="Subtítulo">
            <Input defaultValue="Seu preço também não precisa ser." className="h-9 bg-background" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Rótulo do seletor de serviço">
              <Input defaultValue="Escolha o tipo de serviço" className="h-9 bg-background" />
            </Field>
            <Field label="Rótulo do formulário">
              <Input defaultValue="Conte sobre a empresa" className="h-9 bg-background" />
            </Field>
          </div>
        </div>
      </Panel>
      <Panel title="Rodapé do cálculo">
        <div className="space-y-4">
          <Field label="Texto do botão de detalhamento">
            <Input defaultValue="Como chegamos nesse valor?" className="h-9 bg-background" />
          </Field>
          <Field label="Texto do botão principal">
            <Input defaultValue="Contratar" className="h-9 bg-background" />
          </Field>
          <Field label="Aviso legal" hint="Exibido em cinza abaixo da tabela comparativa.">
            <Textarea
              rows={3}
              className="resize-none bg-background"
              defaultValue="Valores calculados a partir do perfil informado, com regras ainda demonstrativas — a proposta final é confirmada após a análise dos documentos da empresa."
            />
          </Field>
        </div>
      </Panel>
    </>
  );
}

/* --------------------------- preview rail --------------------------- */

function PreviewRail() {
  return (
    <aside className="hidden w-72 shrink-0 xl:block">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Settings2 className="size-4 text-primary" /> Simulação
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Perfil exemplo: Simples Nacional · Serviços · 3 funcionários · 12 notas/mês
          </p>
          <div className="mt-4 space-y-2 text-sm">
            {[
              ["Base do enquadramento", "R$ 260"],
              ["Ramo (1,00x)", "R$ 0"],
              ["Funcionários", "R$ 105"],
              ["Notas fiscais", "R$ 60"],
              ["Atendimento", "R$ 0"],
              ["Adicionais", "R$ 0"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-muted-foreground">
                <span>{k}</span>
                <span className="tabular-nums text-foreground">{v}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="flex items-end justify-between">
            <span className="text-xs text-muted-foreground">Total mensal</span>
            <span className="text-2xl font-bold tabular-nums text-foreground">R$ 425</span>
          </div>
          <Button variant="outline" size="sm" className="mt-4 w-full">
            <Eye /> Abrir página de preços
          </Button>
        </div>
        <div className="rounded-xl border border-primary/30 bg-accent p-4">
          <p className="text-xs font-semibold text-accent-foreground">Somente visual</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Os campos ainda não persistem. O cálculo acima é ilustrativo e será ligado ao backend
            depois da aprovação do layout.
          </p>
        </div>
      </div>
    </aside>
  );
}
