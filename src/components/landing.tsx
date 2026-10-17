import { useEffect, useState } from "react";
import {
  Accessibility,
  Baby,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Dumbbell,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Smartphone,
  X,
} from "lucide-react";
import {
  ADDRESS,
  EMAIL,
  FAQ,
  FAQ_TAGS,
  FULL,
  HOURS,
  INAUGURATION_ISO,
  INAUGURATION_LABEL,
  INAUGURATION_SHORT,
  LOTS,
  PHONE_DISPLAY,
  PROOF,
  SPACES,
} from "@/lib/site";
import { brl, cn, waLink } from "@/lib/utils";

type Billing = "mensal" | "anual";
type FaqTag = (typeof FAQ_TAGS)[number] | "Todas";

const NAV = [
  ["#planos", "Planos"],
  ["#casa", "A casa"],
  ["#espacos", "Espaços"],
  ["#lista", "Reservar"],
  ["#faq", "Dúvidas"],
  ["#local", "Local"],
] as const;

export function Landing() {
  const [menu, setMenu] = useState(false);
  const [billing, setBilling] = useState<Billing>("anual");
  const [lotId, setLotId] = useState(1);
  const [space, setSpace] = useState(0);
  const [sent, setSent] = useState(false);
  const lot = LOTS.find((l) => l.id === lotId) ?? LOTS[0];
  const price = lot[billing];

  function chooseLot(id: number) {
    setLotId(id);
    document.getElementById("lista")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-bg text-fg">
      <a
        href="#planos"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg"
      >
        Ir para planos
      </a>

      <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4">
          <a href="#topo" className="flex items-center gap-2 text-sm font-bold tracking-[0.16em]">
            <img src="/fireup/logo.png" alt="Fire Up" className="size-9 object-contain" />
            FIRE UP
          </a>
          <nav className="ml-auto hidden items-center gap-5 text-sm text-muted lg:flex">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} className="hover:text-fg">
                {label}
              </a>
            ))}
          </nav>
          <a
            href="#lista"
            className="ml-auto hidden h-10 items-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-fg lg:ml-3 lg:inline-flex"
          >
            Reservar vaga
          </a>
          <button
            type="button"
            className="ml-auto grid size-11 place-items-center rounded-full border border-border lg:hidden"
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            {menu ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menu ? (
          <div className="flex flex-col border-t border-border bg-bg px-4 py-3 lg:hidden">
            {NAV.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="flex min-h-11 items-center text-base"
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main id="topo">
        <Hero price={price} billing={billing} />

        <section className="border-y border-border bg-surface">
          <div className="mx-auto grid max-w-6xl gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((item) => (
              <div key={item.label} className="bg-surface px-5 py-5">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{item.label}</p>
                <p className="mt-1 text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="planos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">01 — Pré-venda</p>
          <h2 className="mt-3 max-w-2xl text-5xl md:text-6xl">Três lotes. Quem entra agora, paga menos.</h2>
          <p className="mt-4 max-w-xl text-muted">
            Fora da pré-venda: mensal {brl(FULL.mensal)} · anual {brl(FULL.anual)}/mês. O plano começa a
            contar em {INAUGURATION_LABEL}. Mensal sem fidelidade. Anual com 12 meses (multa de 10% se
            cancelar).
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="inline-flex rounded-full border border-border bg-surface p-1" role="tablist" aria-label="Tipo de plano">
              {(
                [
                  ["mensal", "Mensal"],
                  ["anual", "Anual"],
                ] as const
              ).map(([b, label]) => (
                <button
                  key={b}
                  type="button"
                  role="tab"
                  aria-selected={billing === b}
                  onClick={() => setBilling(b)}
                  className={cn(
                    "min-h-11 rounded-full px-5 text-sm font-semibold capitalize",
                    billing === b ? "bg-primary text-primary-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="text-sm text-muted">
              {billing === "anual"
                ? "Valor por mês, cobrado no Pix automático ou no cartão."
                : "Sem fidelidade de 12 meses. Cancela quando quiser."}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {LOTS.map((item) => {
              const p = item[billing];
              const active = lotId === item.id;
              return (
                <article
                  key={item.id}
                  className={cn(
                    "relative flex flex-col gap-3 rounded-xl border bg-surface p-6",
                    item.featured ? "border-primary" : "border-border",
                    active && "ring-2 ring-primary ring-offset-2 ring-offset-bg",
                  )}
                >
                  {item.featured ? (
                    <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-fg">
                      Melhor condição
                    </span>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-4xl">{item.name}</h3>
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{item.vagas} vagas</p>
                  </div>
                  <p className="text-4xl font-semibold tabular-nums">
                    {brl(p)} <span className="text-base font-medium text-muted">/mês</span>
                  </p>
                  <p className="text-sm text-muted">
                    De {brl(FULL[billing])} · cupom{" "}
                    <code className="rounded-sm border border-border bg-bg px-1.5 py-0.5 text-fg">{item.coupon}</code>
                  </p>
                  <ul className="space-y-2 text-sm text-muted">
                    <li className="flex gap-2">
                      <Check className="mt-0.5 size-4 text-primary" />
                      Economia de {brl(FULL[billing] - p)} por mês
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-0.5 size-4 text-primary" />
                      Pix automático ou cartão recorrente
                    </li>
                    <li className="flex gap-2">
                      <Check className="mt-0.5 size-4 text-primary" />
                      Acesso livre a partir de {INAUGURATION_SHORT}
                    </li>
                  </ul>
                  <button
                    type="button"
                    onClick={() => chooseLot(item.id)}
                    className={cn(
                      "mt-auto min-h-12 rounded-full px-4 text-sm font-semibold",
                      item.featured ? "bg-primary text-primary-fg" : "border border-border",
                    )}
                  >
                    Reservar {item.name.toLowerCase()}
                  </button>
                </article>
              );
            })}
          </div>
          <p className="mt-6 max-w-2xl text-sm text-muted">
            Depois das 400 vagas, a gestão avalia se abre turma nova. Se não abrir, lista de espera por
            ordem de cadastro — prioridade é o conforto de quem já treina.
          </p>
        </section>

        <section id="casa" className="scroll-mt-20 border-y border-border bg-surface py-20">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">02 — A casa</p>
              <h2 className="mt-3 text-5xl md:text-6xl">Projeto novo. Atendimento de verdade.</h2>
              <p className="mt-4 text-muted">
                Academia própria na Praia do Arrastão. Circulação clara, recepção com catraca e um
                ambiente feito para treinar sem fila, sem desculpa.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  [Dumbbell, "Musculação no lançamento"],
                  [ShieldCheck, "Professor em todos os horários"],
                  [Smartphone, "Treino no app CloudGym"],
                  [Baby, "Sala kids"],
                  [Accessibility, "Rampas e banheiro adaptado"],
                  [Clock, "Seg a sex, 5h às 22h"],
                ].map(([Icon, text]) => (
                  <li key={String(text)} className="flex items-center gap-3 rounded-md border border-border bg-bg px-3 py-3 text-sm">
                    <Icon className="size-4 shrink-0 text-primary" />
                    <span>{text as string}</span>
                  </li>
                ))}
              </ul>
            </div>
            <figure className="overflow-hidden rounded-xl border border-border">
              <img src="/fireup/recepcao.jpg" alt="Recepção da Academia Fire Up" className="h-80 w-full object-cover md:h-[28rem]" />
              <figcaption className="border-t border-border px-4 py-3 text-sm text-muted">Recepção · Praia do Arrastão</figcaption>
            </figure>
          </div>
        </section>

        <Gallery space={space} setSpace={setSpace} />

        <LeadForm
          key={lotId}
          defaultLot={lotId}
          billing={billing}
          sent={sent}
          setSent={setSent}
        />

        <FaqBlock />

        <section id="local" className="scroll-mt-20 border-t border-border bg-surface py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">05 — Local</p>
              <h2 className="mt-3 text-5xl">Rodovia na porta. Praia do Arrastão.</h2>
              <dl className="mt-6 space-y-4 text-sm">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold">Endereço</dt>
                    <dd className="text-muted">{ADDRESS}</dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold">Funcionamento</dt>
                    {HOURS.map((h) => (
                      <dd key={h.when} className="text-muted">
                        {h.when}: {h.time}
                      </dd>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold">Atendimento</dt>
                    <dd>
                      <a className="text-muted hover:text-fg" href={`mailto:${EMAIL}`}>
                        {EMAIL}
                      </a>
                    </dd>
                    <dd className="text-muted">WhatsApp {PHONE_DISPLAY}</dd>
                  </div>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  className="inline-flex min-h-12 items-center rounded-full bg-primary px-5 font-semibold text-primary-fg"
                  href="https://www.google.com/maps/search/?api=1&query=Rod.+Dr.+Manoel+Hipolito+do+Rego+1927+Sao+Sebastiao"
                  target="_blank"
                  rel="noreferrer"
                >
                  Abrir no Maps
                </a>
                <a
                  className="inline-flex min-h-12 items-center rounded-full border border-border px-5 font-semibold"
                  href={waLink("Oi, Fire Up. Quero informações sobre a pré-venda.")}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar no WhatsApp
                </a>
              </div>
            </div>
            <div className="overflow-hidden rounded-xl border border-border">
              <iframe
                title="Mapa Academia Fire Up"
                className="h-80 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Rodovia%20Doutor%20Manoel%20Hipolito%20do%20Rego%201927%20Sao%20Sebastiao&z=16&output=embed"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-6 px-4">
          <div className="flex items-center gap-3">
            <img src="/fireup/logo.png" alt="" className="size-11" />
            <div>
              <p className="font-semibold">Academia Fire Up</p>
              <p className="text-sm text-muted">
                FIREUP ACADEMIA LTDA · CNPJ 66.666.125/0001-63
                <br />
                {EMAIL}
              </p>
            </div>
          </div>
          <p className="text-sm text-muted">© {new Date().getFullYear()} · São Sebastião, Litoral Norte</p>
        </div>
      </footer>

      <a
        href={waLink("Oi, Fire Up. Quero garantir minha vaga na pré-venda.")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-4 z-50 hidden size-14 place-items-center rounded-full bg-wa text-fg shadow-lg md:grid"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <div className="flex gap-2">
          <a
            href="#lista"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary font-semibold text-primary-fg"
          >
            Reservar · {brl(price)}
          </a>
          <a
            href={waLink("Oi, Fire Up. Quero garantir minha vaga na pré-venda.")}
            target="_blank"
            rel="noreferrer"
            className="grid size-12 place-items-center rounded-full bg-wa"
            aria-label="WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ price, billing }: { price: number; billing: Billing }) {
  return (
    <section className="relative min-h-[86svh] overflow-hidden">
      <img
        src="/fireup/fachada.jpg"
        alt="Fachada da Academia Fire Up à noite"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/65 to-bg/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 to-transparent" />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-4 pb-16 pt-20 md:grid-cols-[1.15fr_.85fr] md:items-end md:pt-28">
        <div>
          <p className="rise text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Pré-venda aberta · São Sebastião
          </p>
          <h1 className="rise mt-4 text-6xl md:text-8xl" style={{ animationDelay: "70ms" }}>
            Nova academia.
            <br />
            <span className="text-primary">400 vagas no lançamento.</span>
          </h1>
          <p className="rise mt-5 max-w-lg text-lg text-muted" style={{ animationDelay: "130ms" }}>
            Praia do Arrastão. Inauguração em {INAUGURATION_LABEL}. Fora da pré-venda o mensal vai a{" "}
            {brl(FULL.mensal)}. O plano começa no dia da abertura.
          </p>
          <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "190ms" }}>
            <a
              href="#planos"
              className="inline-flex min-h-12 items-center rounded-full bg-primary px-6 font-semibold text-primary-fg"
            >
              Ver planos
            </a>
            <a
              href="#lista"
              className="inline-flex min-h-12 items-center rounded-full border border-border px-6 font-semibold"
            >
              Reservar vaga
            </a>
          </div>
        </div>
        <aside
          className="rise rounded-xl border border-border bg-surface/90 p-6 backdrop-blur-sm"
          style={{ animationDelay: "230ms" }}
        >
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="pulse-live inline-block size-2.5 rounded-full bg-ok" />
            Pré-venda liberada
          </p>
          <p className="mt-1 text-sm text-muted">Abre as portas em {INAUGURATION_SHORT}</p>
          <Countdown />
          <ul className="mt-4 space-y-0 text-sm">
            {LOTS.map((l) => (
              <li key={l.id} className="flex justify-between gap-3 border-b border-border py-2.5 last:border-0">
                <span className="text-muted">
                  {l.name} · {l.vagas} vagas
                </span>
                <span className="font-semibold tabular-nums">{brl(l[billing])}</span>
              </li>
            ))}
          </ul>
          <a
            href="#lista"
            className="mt-5 flex h-12 items-center justify-center rounded-full bg-primary font-semibold text-primary-fg"
          >
            Garantir {brl(price)}
          </a>
        </aside>
      </div>
    </section>
  );
}

function Gallery({ space, setSpace }: { space: number; setSpace: (n: number) => void }) {
  const current = SPACES[space];
  const prev = () => setSpace((space + SPACES.length - 1) % SPACES.length);
  const next = () => setSpace((space + 1) % SPACES.length);

  return (
    <section id="espacos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">03 — Espaços</p>
      <div className="mt-3 flex items-end justify-between gap-4">
        <h2 className="max-w-xl text-5xl md:text-6xl">Como a casa ficou.</h2>
        <div className="hidden gap-2 md:flex">
          <button type="button" className="grid size-11 place-items-center rounded-full border border-border" onClick={prev} aria-label="Foto anterior">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" className="grid size-11 place-items-center rounded-full border border-border" onClick={next} aria-label="Próxima foto">
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
      <div className="mt-8 overflow-hidden rounded-xl border border-border">
        <img src={current.src} alt={current.title} className="h-72 w-full object-cover md:h-[28rem]" />
        <div className="flex items-end justify-between gap-4 bg-surface px-5 py-4">
          <div>
            <h3 className="text-3xl">{current.title}</h3>
            <p className="text-muted">{current.copy}</p>
          </div>
          <p className="text-sm tabular-nums text-muted">
            {space + 1} / {SPACES.length}
          </p>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-2">
        {SPACES.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setSpace(i)}
            aria-current={i === space}
            aria-label={item.title}
            className={cn(
              "overflow-hidden rounded-md border",
              i === space ? "border-primary" : "border-border opacity-70 hover:opacity-100",
            )}
          >
            <img src={item.src} alt="" className="h-14 w-full object-cover md:h-20" />
          </button>
        ))}
      </div>
    </section>
  );
}

function LeadForm({
  defaultLot,
  billing,
  sent,
  setSent,
}: {
  defaultLot: number;
  billing: Billing;
  sent: boolean;
  setSent: (v: boolean) => void;
}) {
  const [lote, setLote] = useState(String(defaultLot));
  const chosen = LOTS.find((l) => String(l.id) === lote);

  return (
    <section id="lista" className="scroll-mt-20 border-y border-border bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">04 — Reserva</p>
          <h2 className="mt-3 text-5xl">Reserve a vaga. A recepção confirma o lote.</h2>
          <p className="mt-4 text-muted">
            Preencha os dados. A equipe envia o link de pagamento — Pix automático ou cartão
            recorrente. Cobrança começa em {INAUGURATION_LABEL}.
          </p>
          <ol className="mt-8 space-y-4">
            {[
              "Envia nome e WhatsApp",
              "Confirma lote e cupom",
              "Paga e trava a matrícula",
            ].map((step, i) => (
              <li key={step} className="flex items-center gap-4">
                <span className="grid size-10 place-items-center rounded-full border border-border text-sm font-semibold">
                  0{i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          {chosen ? (
            <p className="mt-8 rounded-md border border-border bg-bg px-4 py-3 text-sm">
              Selecionado: <strong>{chosen.name}</strong> · {billing} {brl(chosen[billing])}/mês · cupom{" "}
              {chosen.coupon}
            </p>
          ) : null}
        </div>
        <form
          className="grid gap-4 rounded-xl border border-border bg-bg p-6"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget).entries());
            const lot = LOTS.find((l) => String(l.id) === data.lote);
            const lotLabel = lot ? `${lot.name} · ${lot.coupon} · ${billing}` : "Ainda não sei";
            const text = `Olá, Fire Up! Quero reservar minha vaga.\nNome: ${data.nome}\nE-mail: ${data.email}\nWhatsApp: ${data.whatsapp}\nCidade: ${data.cidade}\nBairro: ${data.bairro}\nLote: ${lotLabel}`;
            setSent(true);
            window.open(waLink(text), "_blank");
          }}
        >
          <Field name="nome" label="Nome completo" placeholder="Seu nome" autoComplete="name" />
          <Field name="email" label="E-mail" type="email" placeholder="voce@email.com" autoComplete="email" />
          <Field name="whatsapp" label="WhatsApp" type="tel" placeholder="(12) 9 0000-0000" autoComplete="tel" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="cidade" label="Cidade" placeholder="São Sebastião" autoComplete="address-level2" />
            <Field name="bairro" label="Bairro" placeholder="Praia do Arrastão" />
          </div>
          <label className="grid gap-1.5 text-sm font-medium">
            Lote
            <select
              name="lote"
              value={lote}
              onChange={(e) => setLote(e.target.value)}
              className="min-h-12 rounded-md border border-border bg-surface px-3 font-normal"
            >
              {LOTS.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} · {brl(l[billing])}/mês · {l.coupon}
                </option>
              ))}
              <option value="0">Ainda não sei — me orientem</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-1 h-12 rounded-full bg-primary font-semibold text-primary-fg"
          >
            Enviar reserva
          </button>
          {sent ? (
            <p className="text-sm font-medium text-ok">Pronto. Vamos te chamar no WhatsApp.</p>
          ) : null}
          <p className="text-xs text-muted">Ao enviar, você autoriza o contato da Academia Fire Up sobre a pré-venda.</p>
        </form>
      </div>
    </section>
  );
}

function FaqBlock() {
  const [tag, setTag] = useState<FaqTag>("Todas");
  const items = tag === "Todas" ? FAQ : FAQ.filter((item) => item.tag === tag);

  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Atendimento</p>
      <h2 className="mt-3 text-5xl">Dúvidas frequentes</h2>
      <div className="mt-6 flex flex-wrap gap-2">
        {(["Todas", ...FAQ_TAGS] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTag(item)}
            className={cn(
              "min-h-10 rounded-full border px-4 text-sm font-medium",
              tag === item ? "border-primary bg-primary text-primary-fg" : "border-border text-muted hover:text-fg",
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <details key={item.q} className="group py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-1 text-left text-lg font-semibold">
              {item.q}
              <ChevronRight className="size-5 shrink-0 text-muted transition-transform duration-200 group-open:rotate-90" />
            </summary>
            <p className="mt-2 max-w-2xl text-muted">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium">
      {label}
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="min-h-12 rounded-md border border-border bg-surface px-3 font-normal outline-none focus:ring-2 focus:ring-primary"
      />
    </label>
  );
}

function Countdown() {
  const [parts, setParts] = useState({ d: "--", h: "--", m: "--", s: "--" });

  useEffect(() => {
    const target = new Date(INAUGURATION_ISO).getTime();
    const tick = () => {
      let diff = Math.max(0, target - Date.now());
      const d = Math.floor(diff / 86400000);
      diff %= 86400000;
      const h = Math.floor(diff / 3600000);
      diff %= 3600000;
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setParts({ d: pad(d), h: pad(h), m: pad(m), s: pad(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-5 grid grid-cols-4 gap-2">
      {[
        [parts.d, "dias"],
        [parts.h, "horas"],
        [parts.m, "min"],
        [parts.s, "seg"],
      ].map(([val, label]) => (
        <div key={label} className="rounded-md bg-bg py-2 text-center">
          <strong className="font-display block text-2xl tabular-nums">{val}</strong>
          <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 fill-current" aria-hidden="true">
      <path d="M20.5 3.5A11 11 0 0 0 2.1 17.8L1 23l5.3-1.4A11 11 0 0 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 20.5z" />
    </svg>
  );
}
