export const FULL = { mensal: 169.9, anual: 139.9 };

export const EMAIL = "academiafireup@gmail.com";
export const PHONE_DISPLAY = "(12) 98225-6204";
export const INAUGURATION_ISO = "2026-10-10T08:00:00-03:00";
export const INAUGURATION_LABEL = "10 de outubro de 2026";
export const INAUGURATION_SHORT = "10/10/2026";

export const HOURS = [
  { when: "Segunda a sexta", time: "5h às 22h" },
  { when: "Sábado, domingo e feriado", time: "8h às 14h" },
] as const;

export const PROOF = [
  { label: "Inauguração", value: "10 de outubro" },
  { label: "Capacidade", value: "400 matrículas" },
  { label: "Horário", value: "5h às 22h" },
  { label: "Sala", value: "Professor em todos os turnos" },
] as const;

export const LOTS = [
  {
    id: 1,
    name: "1º lote",
    vagas: 100,
    coupon: "PREVENDA1",
    mensal: 139.9,
    anual: 109.9,
    featured: true,
  },
  {
    id: 2,
    name: "2º lote",
    vagas: 150,
    coupon: "PREVENDA2",
    mensal: 149.9,
    anual: 119.9,
    featured: false,
  },
  {
    id: 3,
    name: "3º lote",
    vagas: 150,
    coupon: "PREVENDA3",
    mensal: 159.9,
    anual: 129.9,
    featured: false,
  },
] as const;

export const SPACES = [
  {
    src: "/fireup/fachada.jpg",
    title: "Fachada",
    copy: "Volume laranja, iluminação cênica e vagas na frente da casa.",
  },
  {
    src: "/fireup/recepcao.jpg",
    title: "Recepção",
    copy: "Catraca, loja e café. Chega, registra e treina.",
  },
  {
    src: "/fireup/banheiros.jpg",
    title: "Banheiros",
    copy: "Masculino, feminino e acessível — rampa e sanitário adaptado.",
  },
  {
    src: "/fireup/sala-kids.jpg",
    title: "Sala Kids",
    copy: "Espaço para a criança enquanto você treina.",
  },
  {
    src: "/fireup/vestiario.jpg",
    title: "Área molhada",
    copy: "Pias, secadores e jardim vertical no fluxo do vestiário.",
  },
] as const;

export const FAQ_TAGS = ["Planos", "Pagamento", "Horário", "Casa"] as const;

export const FAQ = [
  {
    tag: "Casa",
    q: "Qual será a data da inauguração?",
    a: "Prevista para 10 de outubro de 2026. O plano só começa a contar depois da inauguração. Exemplo: inaugura dia 10/10, o próximo pagamento cai em 10/11.",
  },
  {
    tag: "Planos",
    q: "A academia terá limite de alunos?",
    a: "Sim. No início são 400 matrículas. Quem já está dentro treina à vontade — sem restrição de horário nem de dias na semana. Depois das 400, a gestão avalia se abre vaga nova. Se não abrir, entra lista de espera por ordem de cadastro.",
  },
  {
    tag: "Planos",
    q: "Qual a diferença do mensal para o anual?",
    a: "Mensal: sem fidelidade de 12 meses. Cancela quando quiser e usa o saldo de dias até o fim do ciclo. Anual: contrato de 12 meses. Pode cancelar, com multa de 10% do saldo restante.",
  },
  {
    tag: "Planos",
    q: "Qual o valor fora da pré-venda?",
    a: "Mensal R$ 169,90. Anual R$ 139,90 por mês.",
  },
  {
    tag: "Planos",
    q: "Qual o valor na pré-venda?",
    a: "1º lote (100 vagas): mensal R$ 139,90 / anual R$ 109,90, cupom PREVENDA1. 2º lote (150): mensal R$ 149,90 / anual R$ 119,90, cupom PREVENDA2. 3º lote (150): mensal R$ 159,90 / anual R$ 129,90, cupom PREVENDA3.",
  },
  {
    tag: "Pagamento",
    q: "Qual a forma de pagamento?",
    a: "Na pré-venda: Pix automático (assinatura) ou cartão de crédito recorrente. Depois da inauguração também vale dinheiro, débito e crédito na recepção.",
  },
  {
    tag: "Pagamento",
    q: "O que é Pix automático?",
    a: "Funciona como débito automático do banco. No dia do vencimento cobra da conta — sem pedir chave ou QR Code todo mês. Cancelamento pelo atendimento, na recepção ou no app do banco. Avise a academia.",
  },
  {
    tag: "Pagamento",
    q: "O que é recorrência no cartão?",
    a: "Assinatura no crédito: todo mês cai a mensalidade. Cancelamento pelo WhatsApp ou na recepção.",
  },
  {
    tag: "Horário",
    q: "Qual é o horário?",
    a: "Segunda a sexta: 5h às 22h. Sábado, domingo e feriado: 8h às 14h. O atendimento online segue o mesmo horário.",
  },
  {
    tag: "Planos",
    q: "Posso cancelar a pré-venda?",
    a: "Sim. Até 7 dias após a inauguração.",
  },
  {
    tag: "Planos",
    q: "Posso congelar a matrícula?",
    a: "Sim, para aproveitar o desconto da pré-venda. Congelamento de no máximo 30 dias após a inauguração.",
  },
  {
    tag: "Casa",
    q: "Tem acessibilidade?",
    a: "Sim. Rampas no térreo e banheiros adaptados para cadeirantes.",
  },
  {
    tag: "Planos",
    q: "Vai ter desconto para família?",
    a: "Só depois da pré-venda. O maior desconto da casa é agora, na pré-venda.",
  },
  {
    tag: "Casa",
    q: "Como fica o treino?",
    a: "No questionário de pré-matrícula já alinhamos o objetivo. O treino sobe no app CloudGym e o aluno é avisado no WhatsApp quando estiver pronto. Em todos os horários tem professor na sala.",
  },
  {
    tag: "Casa",
    q: "Quais modalidades?",
    a: "No início, só musculação. Depois da inauguração vem o plano do terraço — cerca de 400 m² no piso superior.",
  },
] as const;

export const ADDRESS =
  "Rod. Dr. Manoel Hipólito do Rêgo, 1927 — Praia do Arrastão / Olaria, São Sebastião, SP";
