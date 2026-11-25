import { salon } from "./content";

export const mainPhone = salon.phones[0];

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`inline-block h-3.5 w-3.5 fill-current ${className}`}>
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
    </svg>
  );
}

export function Arrow({ back = false }: { back?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={`h-4 w-4 fill-none stroke-current stroke-2 transition-transform duration-300 ease-out ${
        back ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
      }`}
    >
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full bg-blush px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-cocoa">
      {children}
      <Sparkle className="text-rose" />
    </p>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`flex flex-col leading-none ${light ? "text-cream" : "text-cocoa"}`}>
      <span className="font-display text-3xl tracking-[0.12em]">KM HAIR</span>
      <span className={`-mt-1 pl-6 font-script text-xl ${light ? "text-pink" : "text-rose"}`}>
        Beauty &amp; Barber
      </span>
    </span>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#1d1210] px-5 pb-28 pt-12 text-cream sm:px-8 sm:pb-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Logo light />
        <p className="text-sm text-cream/70">
          {salon.address.street}, {salon.address.city} ·{" "}
          <a href={mainPhone.href} className="hover:text-pink">
            {mainPhone.display}
          </a>
        </p>
        <p className="text-xs text-cream/70">
          <span className="mr-2 rounded bg-pink px-2 py-0.5 font-bold uppercase tracking-wider text-cocoa">Anteprima</span>
          Proposta realizzata da Alpwise Studio
        </p>
      </div>
    </footer>
  );
}
