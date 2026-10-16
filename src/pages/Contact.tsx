import { useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { publicContact } from "../data/site";
import { buildMailto, projectTypes, validateContact, type ContactErrors, type ContactForm } from "../lib/contact";

const empty: ContactForm = { name: "", email: "", type: "", message: "", consent: false, website: "" };
const fieldOrder: (keyof ContactForm)[] = ["name", "email", "type", "message", "consent"];

type Status = { kind: "idle" } | { kind: "opened" } | { kind: "not-configured" };

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="field-error" id={id}>
      <Icon name="alert" size={16} />
      {message}
    </p>
  );
}

export function Contact() {
  const [params] = useSearchParams();
  const [form, setForm] = useState<ContactForm>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  // Precompila tipo e messaggio quando si arriva da una CTA contestuale.
  useEffect(() => {
    const tipo = params.get("tipo");
    const messaggio = params.get("messaggio");
    if (!tipo && !messaggio) return;
    setForm((f) => ({
      ...f,
      type: tipo && projectTypes.includes(tipo) ? tipo : f.type,
      message: messaggio ?? f.message,
    }));
  }, [params]);

  const update = <K extends keyof ContactForm>(key: K, value: ContactForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (form.website) return; // bot: il campo trappola è stato compilato
    const found = validateContact(form);
    setErrors(found);
    const firstInvalid = fieldOrder.find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      setStatus({ kind: "idle" });
      return;
    }
    if (!publicContact.email) {
      setStatus({ kind: "not-configured" });
      return;
    }
    window.location.href = buildMailto(publicContact.email, form);
    setStatus({ kind: "opened" });
  };

  const err = (k: keyof ContactForm) => (errors[k] ? `${k}-error` : undefined);
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <>
      <header className="container page-head">
        <h1>Raccontami il tuo progetto</h1>
        <p className="lead">
          Bastano poche righe: cosa fa la tua attività, cosa ti serve e, se c'è, una scadenza. Ti rispondo con qualche domanda
          e una proposta scritta.
        </p>
      </header>

      <section className="container contact-grid" style={{ paddingBottom: "var(--section-y)" }} aria-label="Modulo di contatto">
        <div>
          {!publicContact.email && (
            <div className="notice notice--warning" style={{ marginBottom: "var(--space-6)" }}>
              <Icon name="info" />
              <p>
                <strong>Configurazione in sospeso.</strong> L'indirizzo email pubblico non è ancora stato impostato, quindi il
                modulo per ora non invia messaggi. Puoi compilarlo per provare la validazione: nessun dato viene inviato o
                salvato.
              </p>
            </div>
          )}

          <form ref={formRef} className="form" noValidate onSubmit={onSubmit} aria-describedby="form-how">
            <p id="form-how" className="muted" style={{ fontSize: "var(--fs-small)" }}>
              Premendo «Prepara l'email» si apre il tuo programma di posta con il messaggio già scritto: lo invii tu, da lì.
              Questo sito non salva i dati che inserisci.
            </p>

            <div aria-live="polite" className={errorCount ? undefined : "visually-hidden"}>
              {errorCount > 0 && (
                <p className="field-error">
                  <Icon name="alert" size={16} />
                  {errorCount === 1 ? "C'è un campo da correggere." : `Ci sono ${errorCount} campi da correggere.`}
                </p>
              )}
            </div>

            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Nome e cognome</label>
                <input
                  id="name"
                  name="name"
                  className="input"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={err("name")}
                />
                <FieldError id="name-error" message={errors.name} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  autoComplete="email"
                  inputMode="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={err("email")}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="type">Tipo di progetto</label>
              <select
                id="type"
                name="type"
                className="select"
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
                aria-invalid={Boolean(errors.type)}
                aria-describedby={err("type")}
              >
                <option value="">Scegli un'opzione</option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <FieldError id="type-error" message={errors.type} />
            </div>

            <div className="field">
              <label htmlFor="message">Il tuo progetto</label>
              <span className="hint" id="message-hint">
                Che attività hai, cosa ti serve, entro quando. Eventuali siti di riferimento.
              </span>
              <textarea
                id="message"
                name="message"
                className="textarea"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={["message-hint", err("message")].filter(Boolean).join(" ")}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <div className="honeypot" aria-hidden="true">
              <label htmlFor="website">Lascia vuoto questo campo</label>
              <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} />
            </div>

            <div className="field">
              <label className="consent" htmlFor="consent">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={err("consent")}
                />
                <span>
                  Acconsento all'uso di nome ed email solo per ricevere una risposta a questa richiesta. I dati non vengono
                  ceduti a terzi né usati per newsletter.
                </span>
              </label>
              <FieldError id="consent-error" message={errors.consent} />
            </div>

            <div>
              <button type="submit" className="btn btn--primary">
                Prepara l'email <Icon name="mail" size={18} />
              </button>
            </div>

            <div aria-live="polite">
              {status.kind === "opened" && publicContact.email && (
                <div className="notice">
                  <Icon name="info" />
                  <p>
                    <strong>Il messaggio è pronto nel tuo programma di posta.</strong> Controllalo e premi «Invia». Se non si è
                    aperto nulla, scrivi direttamente a <a href={`mailto:${publicContact.email}`}>{publicContact.email}</a>.
                  </p>
                </div>
              )}
              {status.kind === "not-configured" && (
                <div className="notice notice--warning">
                  <Icon name="info" />
                  <p>
                    <strong>Il modulo è compilato correttamente, ma l'invio non è ancora attivo.</strong> Nessun messaggio è
                    stato inviato: l'indirizzo email pubblico verrà configurato prima della pubblicazione del sito.
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>

        <aside className="contact-aside" aria-labelledby="next-title">
          <div>
            <h2 id="next-title">Cosa succede dopo</h2>
            <ul className="check-list">
              <li>
                <Icon name="check" size={18} />
                <span>Leggo la richiesta e, se serve, ti faccio qualche domanda per capire meglio.</span>
              </li>
              <li>
                <Icon name="check" size={18} />
                <span>Ti propongo una soluzione con perimetro, tempi e costo, per iscritto.</span>
              </li>
              <li>
                <Icon name="check" size={18} />
                <span>Decidi tu con calma. Nessun impegno finché non approvi la proposta.</span>
              </li>
            </ul>
          </div>
          <div>
            <h2>Dove lavoro</h2>
            <p className="muted">Italia, da remoto. Per i progetti locali possiamo valutare un incontro.</p>
          </div>
          {publicContact.linkedin && (
            <div>
              <h2>Altri contatti</h2>
              <a className="text-link" href={publicContact.linkedin} target="_blank" rel="me noopener">
                Profilo LinkedIn (nuova scheda) <Icon name="arrow-up-right" size={18} />
              </a>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
