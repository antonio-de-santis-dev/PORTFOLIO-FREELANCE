export interface ContactForm {
  name: string;
  email: string;
  type: string;
  message: string;
  consent: boolean;
  /** Campo trappola per bot: deve restare vuoto. */
  website: string;
}

export type ContactErrors = Partial<Record<keyof ContactForm, string>>;

export const projectTypes = [
  "Sito vetrina / landing page",
  "Restyling",
  "Menu digitale",
  "Web app / gestionale",
  "Manutenzione",
  "Altro",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(form: ContactForm): ContactErrors {
  const errors: ContactErrors = {};
  if (form.name.trim().length < 2) errors.name = "Scrivi il tuo nome (almeno 2 caratteri).";
  if (!EMAIL_RE.test(form.email.trim())) errors.email = "Inserisci un indirizzo email valido, ad esempio nome@dominio.it.";
  if (!form.type) errors.type = "Scegli il tipo di progetto, anche «Altro» va bene.";
  if (form.message.trim().length < 20) errors.message = "Racconta il progetto in qualche riga (almeno 20 caratteri).";
  if (!form.consent) errors.consent = "Serve il consenso per usare i tuoi dati solo per risponderti.";
  return errors;
}

export function buildMailto(to: string, form: ContactForm): string {
  const subject = `Richiesta preventivo: ${form.type}`;
  const body = [
    form.message.trim(),
    "",
    "—",
    `Nome: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Tipo di progetto: ${form.type}`,
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Link alla pagina contatti con tipo e messaggio precompilati. */
export function contactHref(type: string, message: string): string {
  const params = new URLSearchParams({ tipo: type, messaggio: message });
  return `/contatti?${params.toString()}`;
}
