# Academia Fire Up

Site da **Academia Fire Up**, academia nova na Praia do Arrastão / Olaria, São Sebastião (SP). É uma landing de pré-venda: apresenta a casa, os três lotes de matrícula e manda a reserva direto para o WhatsApp da equipe.

Não há área logada, painel nem banco de matrículas. O visitante escolhe o plano, preenche os dados e o site abre uma conversa no WhatsApp já montada. A recepção confirma o lote e envia o link de pagamento.

Repositório: [github.com/matheusmathias365/fireup](https://github.com/matheusmathias365/fireup)

## A academia

| | |
|---|---|
| Razão | FIREUP ACADEMIA LTDA |
| CNPJ | 66.666.125/0001-63 |
| Endereço | Rod. Dr. Manoel Hipólito do Rêgo, 1927 — Praia do Arrastão / Olaria, São Sebastião, SP |
| Inauguração | 10 de outubro de 2026 |
| Capacidade inicial | 400 matrículas |
| E-mail | academiafireup@gmail.com |
| WhatsApp | (12) 98225-6204 |

**Horário**

- Segunda a sexta: 5h às 22h
- Sábado, domingo e feriado: 8h às 14h
- Atendimento online no mesmo horário

**O que a casa oferece no lançamento**

- Musculação (outras modalidades ficam para o terraço, depois da inauguração)
- Professor na sala em todos os turnos
- Treino montado no app CloudGym, com aviso no WhatsApp
- Sala kids
- Rampas no térreo e banheiro adaptado
- Recepção com catraca, loja e café

O plano só começa a contar no dia da inauguração. Exemplo: abre em 10/10, o próximo pagamento cai em 10/11.

## O que o site faz

Uma única página, em português, com âncoras no menu:

1. **Hero** — fachada à noite, contagem regressiva até 10/10/2026 e chamada para os planos.
2. **Prova** — inauguração, 400 matrículas, horário e professor em todos os turnos.
3. **Planos** — troca mensal/anual e os três lotes. O lote escolhido acompanha o formulário.
4. **A casa** — diferenciais e foto da recepção.
5. **Espaços** — galeria (fachada, recepção, banheiros, sala kids, área molhada).
6. **Reserva** — formulário que abre o WhatsApp.
7. **Dúvidas** — FAQ filtrável por Planos, Pagamento, Horário e Casa.
8. **Local** — endereço, horário, e-mail, mapa e botão do Google Maps.

No celular, uma barra fixa mostra o preço do plano selecionado e o WhatsApp. No desktop, o botão do WhatsApp flutua no canto.

## Pré-venda

Fora da pré-venda: mensal **R$ 169,90** e anual **R$ 139,90** por mês.

| Lote | Vagas | Cupom | Mensal | Anual / mês |
|---|---|---|---|---|
| 1º lote (melhor condição) | 100 | `PREVENDA1` | R$ 139,90 | R$ 109,90 |
| 2º lote | 150 | `PREVENDA2` | R$ 149,90 | R$ 119,90 |
| 3º lote | 150 | `PREVENDA3` | R$ 159,90 | R$ 129,90 |

- **Mensal:** sem fidelidade de 12 meses. Cancela quando quiser e usa o saldo de dias até o fim do ciclo.
- **Anual:** contrato de 12 meses. Cancelamento com multa de 10% do saldo restante.
- **Pagamento na pré-venda:** Pix automático ou cartão de crédito recorrente. Depois da inauguração a recepção também aceita dinheiro, débito e crédito.
- **Cancelamento da pré-venda:** até 7 dias após a inauguração.
- **Congelamento:** até 30 dias após a inauguração, para não perder o desconto.
- **Depois das 400 vagas:** a gestão decide se abre vaga nova. Se não abrir, lista de espera por ordem de cadastro.

Os números e o texto das dúvidas ficam em [`src/lib/site.ts`](src/lib/site.ts). Mudou preço, cupom ou FAQ: edite esse arquivo.

## Como a reserva funciona

O formulário pede nome, e-mail, WhatsApp, cidade, bairro e lote. No envio, monta uma mensagem e abre:

`https://api.whatsapp.com/send?phone=5512982256204`

Nada é gravado no servidor. A confirmação (“Pronto. Vamos te chamar no WhatsApp.”) só aparece no navegador de quem enviou.

Passos que a página descreve para o visitante:

1. Envia nome e WhatsApp
2. Confirma lote e cupom
3. Paga e trava a matrícula

## Stack

- [React 19](https://react.dev/) e [TanStack Start](https://tanstack.com/start) / TanStack Router
- [Vite](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Lucide](https://lucide.dev/) para ícones
- TypeScript
- Fontes: **Bebas Neue** nos títulos, **Manrope** no texto

A página pública não usa login nem banco. O repositório traz a infraestrutura de auth e Postgres do template (Better Auth, Kysely, `migrations/`), mas a landing não liga isso. Visitante não cria conta.

## Marca

Paleta da interface, em [`src/styles.css`](src/styles.css):

| Token | Cor | Uso |
|---|---|---|
| `--color-bg` | `#0c0c0d` | Fundo |
| `--color-surface` | `#141416` | Cartões e faixas |
| `--color-fg` | `#f2efe8` | Texto |
| `--color-muted` | `#9a958c` | Texto secundário |
| `--color-primary` | `#e85d12` | Laranja da marca |
| `--color-ok` | `#6fbf8a` | Confirmação |
| `--color-wa` | `#1f8f4e` | Botão do WhatsApp |

Identidade visual:

- Logo circular da chama: [`public/fireup/logo.png`](public/fireup/logo.png)
- Favicon (chama em anel laranja): [`public/favicon.svg`](public/favicon.svg)
- Card de compartilhamento 1200×630: [`public/og.jpg`](public/og.jpg)
- Título do card: `Academia Fire Up`, em [`src/lib/og/site.json`](src/lib/og/site.json)

Fotos da casa, servidas em `/fireup/`:

- `fachada.jpg`
- `recepcao.jpg`
- `banheiros.jpg`
- `sala-kids.jpg`
- `vestiario.jpg`

## Estrutura

```text
src/routes/index.tsx        página inicial
src/routes/__root.tsx       documento, título e meta
src/components/landing.tsx  a landing inteira
src/lib/site.ts             preços, lotes, FAQ, endereço, horário
src/lib/utils.ts            real brasileiro e link do WhatsApp
src/styles.css              tokens de cor e tipografia
public/fireup/              fotos e logo
public/og.jpg               imagem de compartilhamento
public/favicon.svg          ícone da aba
```

`scripts/`, `server/` e `src/lib/auth` são suporte do template (preview, PWA, checagens). A experiência do visitante está em `landing.tsx` e `site.ts`.

## Como rodar

Requisitos: Node 22.

```bash
npm install
npm run dev
```

O dev sobe em `http://127.0.0.1:8080` (o script escuta em `0.0.0.0:8080`).

Outros comandos:

| Comando | O que faz |
|---|---|
| `npm run build` | Build de produção (Vite) e migrações |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm run test` | Testes dos scripts e da infra de auth |
| `npm run preview` | Serve o build |

O que **não** entra no Git (veja [`.gitignore`](.gitignore)): `node_modules`, pasta de build `.vercel`, capturas de tela e artefatos locais.

## Deploy

O app é um TanStack Start pensado para a Vercel. Identidade de compartilhamento (`og:title`, `og:image`) é injetada a partir de `src/lib/og/site.json` e de `public/og.jpg` no momento do build. Um card novo só aparece no link publicado depois do próximo deploy.

Não há `.env` no repositório. Credenciais de banco e de auth, se um dia forem usadas, entram pelo ambiente da hospedagem — não commitar segredo.
