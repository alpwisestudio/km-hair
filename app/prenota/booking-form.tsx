"use client";

import { useState, useSyncExternalStore } from "react";
import { hours, salon, services } from "../content";

type Errors = Partial<Record<"servizi" | "data" | "orario" | "nome" | "telefono" | "email" | "privacy", string>>;

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const toTime = (m: number) => `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;

function dayOf(value: string) {
  if (!value) return undefined;
  const [y, m, d] = value.split("-").map(Number);
  return hours.find((h) => h.day === new Date(y, m - 1, d).getDay());
}

// Orari proposti ogni 30 minuti, fino a un'ora prima della chiusura
function slotsFor(value: string) {
  const day = dayOf(value);
  if (!day?.open || !day.close) return [];
  const out: string[] = [];
  for (let m = toMin(day.open); m <= toMin(day.close) - 60; m += 30) out.push(toTime(m));
  return out;
}

const noop = () => () => {};

function formatDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("it-IT", { weekday: "long", day: "numeric", month: "long" });
}

const field =
  "block w-full min-w-0 max-w-full min-h-[3.25rem] appearance-none rounded-xl border border-cocoa/15 bg-white/70 px-4 py-3.5 text-cocoa placeholder:text-mocha/60 outline-none transition-[border-color,box-shadow] duration-300 focus:border-rose focus:shadow-[0_0_0_4px_rgb(176_74_98/0.12)]";
const chip =
  "cursor-pointer select-none rounded-full border px-4 py-2 text-sm transition-[background-color,border-color,color,transform] duration-300 active:scale-[0.97]";
const chipOff = "border-cocoa/15 bg-white/60 hover:border-rose/60";
const chipOn = "border-cocoa bg-cocoa text-cream";

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  return msg ? (
    <p id={id} className="mt-2 text-sm font-medium text-rose">
      {msg}
    </p>
  ) : null;
}

export function BookingForm() {
  const [selected, setSelected] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstTime, setFirstTime] = useState<"" | "si" | "no">("");
  const [notes, setNotes] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Data di oggi letta solo nel browser (non al momento della build)
  const today = useSyncExternalStore(noop, () => isoDate(new Date()), () => "");
  const day = dayOf(date);
  const slots = slotsFor(date);

  const toggle = (s: string) => setSelected((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  function validate(): Errors {
    const e: Errors = {};
    if (selected.length === 0) e.servizi = "Scegli almeno un servizio.";
    if (!date) e.data = "Scegli un giorno.";
    else if (date < today) e.data = "Scegli un giorno a partire da oggi.";
    else if (!day?.open) e.data = `Il ${day?.label.toLowerCase()} il salone è chiuso. Siamo aperti da martedì a sabato.`;
    if (date && day?.open && !time) e.orario = "Scegli un orario indicativo.";
    if (name.trim().length < 2) e.nome = "Scrivi nome e cognome.";
    if (phone.replace(/[^\d]/g, "").length < 8) e.telefono = "Scrivi un numero di telefono valido.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "L'indirizzo email non sembra corretto.";
    if (!privacy) e.privacy = "Serve il consenso per poterti ricontattare.";
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(`f-${Object.keys(e)[0]}`)?.focus();
    }
  }

  const summary = [
    `Servizi: ${selected.join(", ")}`,
    date && `Giorno: ${formatDate(date)}${time ? `, verso le ${time}` : ""}`,
    `Nome: ${name}`,
    `Telefono: ${phone}`,
    email && `Email: ${email}`,
    firstTime && `Prima volta da noi: ${firstTime === "si" ? "sì" : "no"}`,
    notes && `Note: ${notes}`,
  ].filter(Boolean) as string[];

  if (sent) {
    const mailto = `mailto:${salon.email}?subject=${encodeURIComponent(
      `Richiesta di appuntamento - ${name}`,
    )}&body=${encodeURIComponent(summary.join("\n"))}`;
    return (
      <div className="fade-in rounded-3xl bg-white/70 p-7 shadow-[0_30px_80px_-40px_rgb(42_26_22/0.35)] sm:p-10" role="status">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-pink text-cocoa">
          <svg viewBox="0 0 24 24" className="draw h-7 w-7 fill-none stroke-current stroke-[2.5]" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h2 className="mt-6 font-display text-4xl uppercase leading-none sm:text-5xl">Richiesta pronta</h2>
        <p className="mt-3 max-w-md text-mocha">
          Grazie {name.split(" ")[0]}! Ti richiamiamo al {phone} per confermare giorno e orario.
        </p>
        <ul className="mt-6 space-y-2 border-y border-cocoa/10 py-5 text-sm">
          {summary.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-5 rounded-xl bg-blush/70 px-4 py-3 text-sm text-mocha">
          <strong className="text-cocoa">Anteprima:</strong> in questa versione il modulo non è ancora collegato al
          salone. Per ora puoi inviare la richiesta via email o chiamare.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={mailto} className="btn rounded-full bg-cocoa px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream">
            Invia via email
          </a>
          <a
            href={salon.phones[0].href}
            className="btn rounded-full bg-pink px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cocoa"
          >
            Chiama {salon.phones[0].display}
          </a>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="px-2 py-3.5 text-xs font-bold uppercase tracking-[0.16em] underline decoration-rose underline-offset-4"
          >
            Modifica
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="space-y-9 rounded-3xl bg-white/50 p-6 shadow-[0_30px_80px_-40px_rgb(42_26_22/0.35)] ring-1 ring-cocoa/5 sm:p-10"
    >
      {/* 1. Servizi */}
      <fieldset aria-describedby={errors.servizi ? "e-servizi" : undefined}>
        <legend className="flex items-baseline gap-3 font-display text-2xl uppercase">
          <span className="text-rose">01</span> Cosa vuoi fare?
        </legend>
        <p className="mt-1 text-sm text-mocha">Puoi sceglierne più di uno.</p>
        <div className="mt-5 space-y-5">
          {services.map((s, gi) => (
            <div key={s.id}>
              <p className="mb-2.5 text-xs font-bold uppercase tracking-[0.18em] text-mocha">{s.title}</p>
              <div className="flex flex-wrap gap-2">
                {s.items
                  .filter((i) => !i.startsWith("Prodotti"))
                  .map((i, ii) => {
                    const on = selected.includes(i);
                    return (
                      <label key={i} className={`${chip} ${on ? chipOn : chipOff} has-focus-visible:ring-2 has-focus-visible:ring-rose`}>
                        <input
                          id={gi === 0 && ii === 0 ? "f-servizi" : undefined}
                          type="checkbox"
                          className="sr-only"
                          checked={on}
                          onChange={() => toggle(i)}
                        />
                        {i}
                      </label>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
        <ErrorText id="e-servizi" msg={errors.servizi} />
      </fieldset>

      {/* 2. Quando */}
      <fieldset>
        <legend className="flex items-baseline gap-3 font-display text-2xl uppercase">
          <span className="text-rose">02</span> Quando?
        </legend>
        <p className="mt-1 text-sm text-mocha">Indicativo: ti confermiamo noi l&apos;orario.</p>
        <div className="mt-5 max-w-xs">
          <label htmlFor="f-data" className="mb-2 block text-sm font-semibold">
            Giorno
          </label>
          <input
            id="f-data"
            type="date"
            min={today}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setTime("");
              setErrors((x) => ({ ...x, data: undefined, orario: undefined }));
            }}
            aria-invalid={!!errors.data}
            aria-describedby={errors.data ? "e-data" : undefined}
            className={field}
          />
          <ErrorText id="e-data" msg={errors.data} />
          {date && day && !day.open && !errors.data && (
            <p className="mt-2 text-sm font-medium text-rose">
              Il {day.label.toLowerCase()} siamo chiusi: scegli un giorno da martedì a sabato.
            </p>
          )}
        </div>

        {slots.length > 0 && (
          <div className="fade-in mt-6" role="radiogroup" aria-labelledby="l-orario" aria-describedby={errors.orario ? "e-orario" : undefined}>
            <p id="l-orario" className="mb-2.5 text-sm font-semibold">
              Orario preferito · {day?.label} {day?.open}–{day?.close}
            </p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
              {slots.map((t, i) => (
                <label
                  key={t}
                  className={`${chip} text-center tabular-nums ${time === t ? chipOn : chipOff} has-focus-visible:ring-2 has-focus-visible:ring-rose`}
                >
                  <input
                    id={i === 0 ? "f-orario" : undefined}
                    type="radio"
                    name="orario"
                    value={t}
                    className="sr-only"
                    checked={time === t}
                    onChange={() => {
                      setTime(t);
                      setErrors((x) => ({ ...x, orario: undefined }));
                    }}
                  />
                  {t}
                </label>
              ))}
            </div>
            <ErrorText id="e-orario" msg={errors.orario} />
          </div>
        )}
      </fieldset>

      {/* 3. Dati */}
      <fieldset>
        <legend className="flex items-baseline gap-3 font-display text-2xl uppercase">
          <span className="text-rose">03</span> I tuoi dati
        </legend>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="f-nome" className="mb-2 block text-sm font-semibold">
              Nome e cognome
            </label>
            <input
              id="f-nome"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "e-nome" : undefined}
              className={field}
            />
            <ErrorText id="e-nome" msg={errors.nome} />
          </div>
          <div>
            <label htmlFor="f-telefono" className="mb-2 block text-sm font-semibold">
              Telefono
            </label>
            <input
              id="f-telefono"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "e-telefono" : undefined}
              className={field}
            />
            <ErrorText id="e-telefono" msg={errors.telefono} />
          </div>
          <div>
            <label htmlFor="f-email" className="mb-2 block text-sm font-semibold">
              Email <span className="font-normal text-mocha">(facoltativa)</span>
            </label>
            <input
              id="f-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "e-email" : undefined}
              className={field}
            />
            <ErrorText id="e-email" msg={errors.email} />
          </div>
          <div className="sm:col-span-2" role="radiogroup" aria-labelledby="l-prima">
            <p id="l-prima" className="mb-2.5 text-sm font-semibold">
              È la prima volta da noi?
            </p>
            <div className="flex gap-2">
              {(["si", "no"] as const).map((v) => (
                <label key={v} className={`${chip} ${firstTime === v ? chipOn : chipOff} has-focus-visible:ring-2 has-focus-visible:ring-rose`}>
                  <input
                    type="radio"
                    name="prima"
                    className="sr-only"
                    checked={firstTime === v}
                    onChange={() => setFirstTime(v)}
                  />
                  {v === "si" ? "Sì" : "No"}
                </label>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="f-note" className="mb-2 block text-sm font-semibold">
              Note <span className="font-normal text-mocha">(facoltative)</span>
            </label>
            <textarea
              id="f-note"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Es. lunghezza dei capelli, colore attuale, allergie…"
              className={`${field} resize-y`}
            />
          </div>
        </div>
      </fieldset>

      {/* Privacy + invio */}
      <div>
        <label htmlFor="f-privacy" className="flex cursor-pointer items-start gap-3 text-sm text-mocha">
          <input
            id="f-privacy"
            type="checkbox"
            checked={privacy}
            onChange={(e) => setPrivacy(e.target.checked)}
            aria-invalid={!!errors.privacy}
            aria-describedby={errors.privacy ? "e-privacy" : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-cocoa"
          />
          Acconsento al trattamento dei miei dati per essere ricontattato/a riguardo a questa prenotazione.
        </label>
        <ErrorText id="e-privacy" msg={errors.privacy} />

        <button
          type="submit"
          className="btn group mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-cocoa px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-cream sm:w-auto"
        >
          Invia richiesta
          <svg viewBox="0 0 20 20" aria-hidden="true" className="h-4 w-4 fill-none stroke-current stroke-2 transition-transform duration-300 group-hover:translate-x-1">
            <path d="M3 10h13M11 5l5 5-5 5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
