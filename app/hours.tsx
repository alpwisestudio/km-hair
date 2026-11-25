"use client";

import { useSyncExternalStore } from "react";
import { hours } from "./content";

function toMin(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function snapshot() {
  const d = new Date();
  return `${d.getDay()}:${d.getHours() * 60 + d.getMinutes()}`;
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
}

export function Hours() {
  // Calcolato solo nel browser: il giorno di oggi e se il salone è aperto adesso.
  // Aggiornato ogni minuto; "" durante la build, così il server non mostra uno stato falso.
  const snap = useSyncExternalStore(subscribe, snapshot, () => "");
  const now = snap ? { day: Number(snap.split(":")[0]), min: Number(snap.split(":")[1]) } : null;

  const today = now ? hours.find((h) => h.day === now.day) : undefined;
  const isOpen =
    !!today?.open && !!today.close && now!.min >= toMin(today.open) && now!.min < toMin(today.close);

  return (
    <div>
      <p className="mb-5 h-6 text-sm font-semibold uppercase tracking-[0.2em]" aria-live="polite">
        {now &&
          (isOpen ? (
            <span className="inline-flex items-center gap-2.5 text-silver">
              <span className="pulse-dot h-2 w-2 rounded-full bg-silver" aria-hidden="true" />
              Aperto ora · fino alle {today!.close}
            </span>
          ) : (
            <span className="text-paper/70">● Chiuso in questo momento</span>
          ))}
      </p>
      <table className="w-full text-left">
        <caption className="sr-only">Orari di apertura</caption>
        <tbody>
          {hours.map((h) => {
            const isToday = now?.day === h.day;
            return (
              <tr
                key={h.day}
                className={`border-b border-paper/15 ${isToday ? "text-silver" : "text-paper"}`}
              >
                <th scope="row" className="py-3 font-medium">
                  {h.label}
                  {isToday && <span className="ml-2 text-xs uppercase tracking-widest">oggi</span>}
                </th>
                <td className="py-3 text-right tabular-nums">
                  {h.open ? `${h.open} – ${h.close}` : <span className="text-paper/60">Chiuso</span>}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
