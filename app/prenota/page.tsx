import type { Metadata } from "next";
import Link from "next/link";
import { hours, salon } from "../content";
import { Arrow, Footer, Label, Logo } from "../ui";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = {
  title: "Prenota un appuntamento · KM Hair Beauty & Barber",
  description:
    "Richiedi un appuntamento da KM Hair Beauty & Barber a Cassano Magnago: taglio, colore, degradè, barba, manicure e trattamenti estetici.",
};

export default function Prenota() {
  return (
    <>
      <header className="enter relative z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" aria-label={`${salon.fullName}, home`}>
            <Logo />
          </Link>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 hover:text-rose"
          >
            <Arrow back /> Torna al sito
          </Link>
        </div>
      </header>

      <main className="bg-gradient-to-b from-cream via-blush/50 to-cream px-5 pb-24 pt-10 sm:px-8 lg:pt-16">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <div className="enter" style={{ "--i": 1 } as React.CSSProperties}>
              <Label>Prenota</Label>
            </div>
            <h1 className="mt-5 font-display text-[12vw] uppercase leading-[0.92] sm:text-7xl">
              <span className="block overflow-hidden pb-1">
                <span className="enter-line block" style={{ "--i": 2 } as React.CSSProperties}>
                  Il tuo
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="enter-line block text-rose" style={{ "--i": 3 } as React.CSSProperties}>
                  appuntamento.
                </span>
              </span>
            </h1>
            <p className="enter mt-6 max-w-sm text-mocha" style={{ "--i": 4 } as React.CSSProperties}>
              Compila il modulo: ti richiamiamo per confermare giorno e orario. Se preferisci, chiamaci direttamente.
            </p>

            <div className="enter mt-8 space-y-6" style={{ "--i": 5 } as React.CSSProperties}>
              <ul className="space-y-1">
                {salon.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="group flex items-baseline gap-4">
                      <span className="w-20 text-sm text-mocha">{p.label}</span>
                      <span className="font-display text-2xl tracking-wide transition-colors duration-300 group-hover:text-rose">
                        {p.display}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="max-w-xs rounded-2xl bg-white/60 p-5 ring-1 ring-cocoa/5">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-mocha">Orari</p>
                <table className="w-full text-sm">
                  <caption className="sr-only">Orari di apertura</caption>
                  <tbody>
                    {hours.map((h) => (
                      <tr key={h.day}>
                        <th scope="row" className="py-1 text-left font-medium">
                          {h.label}
                        </th>
                        <td className={`py-1 text-right tabular-nums ${h.open ? "" : "text-mocha"}`}>
                          {h.open ? `${h.open} – ${h.close}` : "Chiuso"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-mocha">
                {salon.address.street}, {salon.address.zip} {salon.address.city} ({salon.address.province})
              </p>
            </div>
          </div>

          <div className="enter" style={{ "--i": 4 } as React.CSSProperties}>
            <BookingForm />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
