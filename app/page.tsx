import Link from "next/link";
import { amenities, gallery, salon, services, specialties } from "./content";
import { Hours } from "./hours";
import { Photo } from "./photo";
import { Arrow, Footer, Label, Logo, Sparkle, mainPhone } from "./ui";

const nav = [
  { href: "#servizi", label: "Servizi" },
  { href: "#specialita", label: "Specialità" },
  { href: "#salone", label: "Il salone" },
  { href: "#orari", label: "Orari e contatti" },
];

export default function Home() {
  return (
    <>
      {/* HEADER */}
      <header className="header-scroll enter absolute inset-x-0 top-0 z-30 lg:fixed lg:bg-cream/85 lg:backdrop-blur-md lg:shadow-[0_1px_0_rgba(42,26,22,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" aria-label={`${salon.fullName}, torna su`}>
            <Logo />
          </a>
          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex gap-9 text-xs font-semibold uppercase tracking-[0.18em]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line transition-colors duration-300 hover:text-rose">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Link
            href="/prenota"
            className="hidden rounded-full bg-pink px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] text-cocoa shadow-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(176,74,98,0.6)] sm:inline-flex"
          >
            Prenota
          </Link>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-to-br from-blush via-cream to-blush lg:min-h-[min(92vh,860px)]">
          <div className="mx-auto grid max-w-7xl lg:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 px-5 pb-12 pt-32 sm:px-8 lg:pb-24 lg:pt-44">
              <p
                className="enter mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-mocha"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {salon.city} · Via Mazzini 25b <Sparkle className="text-rose" />
              </p>
              <h1 className="font-display uppercase leading-[0.92]">
                <span className="sr-only">{salon.fullName}: parrucchiere, barbiere ed estetica a {salon.city}. </span>
                <span className="block overflow-hidden pb-1" aria-hidden="true">
                  <span
                    className="enter-line block text-[17vw] text-cocoa sm:text-8xl xl:text-[8.5rem]"
                    style={{ "--i": 2 } as React.CSSProperties}
                  >
                    Hair &amp; Barber.
                  </span>
                </span>
                <span className="block overflow-hidden pb-1" aria-hidden="true">
                  <span
                    className="enter-line block text-[17vw] text-rose sm:text-8xl xl:text-[8.5rem]"
                    style={{ "--i": 3 } as React.CSSProperties}
                  >
                    &amp; Beauty.
                  </span>
                </span>
              </h1>
              <p
                className="enter mt-7 text-sm font-bold uppercase tracking-[0.24em]"
                style={{ "--i": 5 } as React.CSSProperties}
              >
                Taglio. Colore. Degradè. Unghie.
              </p>
              <p
                className="enter mt-4 max-w-md text-base leading-relaxed text-mocha"
                style={{ "--i": 6 } as React.CSSProperties}
              >
                Parrucchiere, barbiere ed estetica nello stesso salone. Il mercoledì apriamo alle 13 e restiamo
                aperti fino alle 20.
              </p>
              <div
                className="enter mt-9"
                style={{ "--i": 7 } as React.CSSProperties}
              >
                <Link
                  href="/prenota"
                  className="btn group inline-flex items-center gap-3 rounded-full bg-cocoa px-8 py-4 text-sm font-bold uppercase tracking-[0.14em] text-cream"
                >
                  Prenota ora <Arrow />
                </Link>
              </div>
            </div>

            <div className="relative h-[460px] sm:h-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[48%]">
              <div className="enter-img absolute inset-0 overflow-hidden">
                <Photo
                  name="hero"
                  alt="Modella con capelli castani davanti a una parete rosa (foto segnaposto)"
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  priority
                  className="hero-parallax h-full w-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SERVIZI */}
        <section id="servizi" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="reveal flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Label>I nostri servizi</Label>
                <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-6xl">
                  Capelli, barba
                  <br />e bellezza.
                </h2>
              </div>
              <p className="max-w-sm text-mocha">
                Tre reparti sotto lo stesso tetto: puoi prenotare taglio e manicure nella stessa visita.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {services.map((s) => (
                <article
                  key={s.id}
                  className="reveal card group relative flex min-h-[520px] flex-col justify-end overflow-hidden rounded-2xl text-cream"
                >
                  <Photo
                    name={s.photo}
                    alt={s.alt}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="!absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cocoa via-cocoa/65 to-cocoa/0 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="relative p-7 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-1.5">
                    <h3 className="font-display text-7xl uppercase leading-none">{s.title}</h3>
                    <p className="mt-2 font-semibold text-pink">{s.lead}</p>
                    <ul className="mt-5 space-y-1.5 text-sm text-cream/90">
                      {s.items.map((i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <span className="h-1 w-1 rounded-full bg-pink" aria-hidden="true" />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIALITÀ */}
        <section id="specialita" className="scroll-mt-24 bg-blush/60 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="reveal lg:sticky lg:top-28 lg:self-start">
              <Label>Specialità</Label>
              <h2 className="mt-5 font-display text-5xl uppercase leading-none sm:text-6xl">
                Quello che
                <br />
                <span className="text-rose">ci chiedono</span>
                <br />
                di più.
              </h2>
              <p className="mt-6 max-w-sm text-mocha">
                Dal degradè alla ricostruzione del capello, fino all&apos;analisi dei colori più adatti a te.
              </p>
              <Link
                href="/prenota"
                className="btn group mt-8 inline-flex items-center gap-3 rounded-full bg-cocoa px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-cream"
              >
                Prenota un appuntamento <Arrow />
              </Link>
            </div>
            <ol className="divide-y divide-cocoa/15 border-y border-cocoa/15">
              {specialties.map((s) => (
                <li key={s.n} className="reveal group grid grid-cols-[3.5rem_1fr] gap-4 py-8">
                  <span className="font-display text-2xl text-rose transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1">{s.n}</span>
                  <div>
                    <h3 className="font-display text-3xl uppercase leading-tight transition-colors duration-300 group-hover:text-rose sm:text-4xl">{s.title}</h3>
                    <p className="mt-2 max-w-md text-mocha">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GALLERIA */}
        <section id="salone" className="scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[260px_1fr] lg:items-center">
            <div className="reveal">
              <h2 className="font-display text-5xl uppercase leading-none">
                Dal
                <br />
                salone <Sparkle className="mb-6 text-rose" />
              </h2>
              <p className="mt-4 text-mocha">I lavori fatti in Via Mazzini, ogni settimana.</p>
            </div>
            <div className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
              {gallery.map((g) => (
                <Photo
                  key={g.photo}
                  name={g.photo}
                  alt={g.alt}
                  sizes="(min-width: 640px) 20vw, 60vw"
                  className="reveal aspect-[3/4] w-[60vw] shrink-0 snap-start rounded-xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1.5 sm:w-auto"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ORARI E CONTATTI */}
        <section id="orari" className="scroll-mt-24 bg-cocoa px-5 py-20 text-cream sm:px-8 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:gap-24">
            <div className="reveal">
              <h2 className="font-display text-5xl uppercase leading-none sm:text-6xl">
                Orari <span className="text-pink">&amp;</span> contatti
              </h2>
              <div className="mt-10">
                <Hours />
              </div>
            </div>

            <div className="reveal flex flex-col gap-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink">Dove siamo</h3>
                <address className="mt-3 text-2xl not-italic leading-snug">
                  {salon.address.street}
                  <br />
                  {salon.address.zip} {salon.address.city} ({salon.address.province})
                </address>
                <a
                  href={salon.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-5 inline-flex items-center gap-3 rounded-full border border-cream/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-pink hover:text-pink"
                >
                  Apri in Google Maps <Arrow />
                </a>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink">Prenota</h3>
                <ul className="mt-3 space-y-2">
                  {salon.phones.map((p) => (
                    <li key={p.href}>
                      <a href={p.href} className="group flex items-baseline gap-4">
                        <span className="w-24 text-sm text-cream/70">{p.label}</span>
                        <span className="font-display text-3xl tracking-wide transition-colors duration-300 group-hover:text-pink">{p.display}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`mailto:${salon.email}`} className="group flex items-baseline gap-4">
                      <span className="w-24 text-sm text-cream/70">Email</span>
                      <span className="break-all text-lg underline decoration-pink underline-offset-4 group-hover:text-pink">
                        {salon.email}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-pink">Buono a sapersi</h3>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {amenities.map((a) => (
                    <li key={a} className="rounded-full bg-cream/10 px-4 py-2 text-sm transition-colors duration-300 hover:bg-cream/20">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* BARRA MOBILE */}
      <div className="enter-bar fixed inset-x-3 bottom-3 z-40 flex gap-2 sm:hidden">
        <a
          href={mainPhone.href}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cocoa py-4 text-sm font-bold uppercase tracking-[0.12em] text-cream shadow-lg"
        >
          Chiama
        </a>
        <Link
          href="/prenota"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-pink py-4 text-sm font-bold uppercase tracking-[0.12em] text-cocoa shadow-lg"
        >
          Prenota
        </Link>
      </div>
    </>
  );
}
