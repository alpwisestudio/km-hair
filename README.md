# KM Hair Beauty & Barber — mock sito vetrina

Anteprima (noindex) del sito per KM Hair Beauty & Barber, Via Giuseppe Mazzini 25b, Cassano Magnago (VA).

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build statica
```

## Dove si modifica cosa

- `app/content.ts` — tutti i testi e i dati: servizi, orari, telefoni, indirizzo, servizi accessori.
- `app/page.tsx` — sezioni della home.
- `app/prenota/` — pagina "Prenota" con il modulo (`booking-form.tsx`). Il modulo controlla i campi, propone
  orari ogni 30 minuti in base al giorno scelto e blocca lunedì e domenica. **Non è ancora collegato:** dopo l'invio
  mostra un riepilogo con "Invia via email" (apre la mail già compilata) e "Chiama". Per collegarlo davvero: Resend
  o un servizio di prenotazioni.
- `app/ui.tsx` — logo, icone e footer condivisi tra le pagine.
- `app/hours.tsx` — tabella orari, con il giorno di oggi evidenziato e lo stato "Aperto ora".
- `app/globals.css` — palette (crema, cipria, rosa, cacao) e animazioni.

## Foto

In `public/foto/` per ora ci sono foto segnaposto da Unsplash (licenza libera, crediti in `public/foto/CREDITS.md`).
Vanno sostituite con le foto reali del salone usando gli stessi nomi (`.avif`, `.webp`, `.jpg` o `.png`).
Se un file manca, al suo posto compare un riquadro neutro con il monogramma "KM".

## Animazioni

Sono tutte in `app/globals.css`, solo CSS: entrata scaglionata dell'hero, comparsa delle sezioni allo scroll
(`.reveal`, con animazioni legate allo scroll; sui browser che non le supportano il contenuto resta visibile),
header che diventa pieno allo scroll e micro-interazioni sui bottoni. Con "riduci movimento" attivo sono tutte spente.

| File | Dove compare |
|------|--------------|
| `hero` | Hero, a destra (verticale) |
| `hair` | Card servizi "Hair" |
| `barber` | Card servizi "Barber" (un degradè) |
| `beauty` | Card servizi "Beauty" (nail art o trucco) |
| `salone-1` … `salone-5` | Galleria "Dal salone" (formato 3:4) |

Fonti: profilo Google Maps, Instagram e Facebook del salone. Vanno bene per un mock mostrato solo al salone; per andare online servono il permesso e gli originali.

## Da verificare con il salone

- Colori: la palette segue il riferimento di stile, non è ancora presa da insegna o logo.
- Recensioni e link social: non inseriti, perché non ancora raccolti.
- Il numero di cellulare è l'azione principale ("Chiama"); va confermato quale numero preferiscono e se usano WhatsApp.
