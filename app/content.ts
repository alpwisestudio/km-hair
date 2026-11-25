// Tutti i testi e i dati del sito in un unico file.
// Fonti: scheda Google e pagina Treatwell del salone (nov 2026). Non aggiungere numeri o recensioni non verificati.
// ATTENZIONE: gli orari di Treatwell sono diversi da quelli di Google (es. mer 14–19, ven 9–20:30).
// Qui ci sono quelli di Google: da confermare con il salone.

export const salon = {
  name: "KM Hair",
  tagline: "Beauty & Barber",
  fullName: "KM Hair Beauty & Barber",
  city: "Cassano Magnago",
  address: {
    street: "Via Giuseppe Mazzini, 25b",
    zip: "21012",
    city: "Cassano Magnago",
    province: "VA",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("KM Hair Beauty & Barber, Via Giuseppe Mazzini 25b, 21012 Cassano Magnago VA"),
  phones: [
    { label: "Cellulare", display: "+39 389 594 7733", href: "tel:+393895947733" },
    { label: "Salone", display: "0331 026587", href: "tel:+390331026587" },
  ],
  email: "ketty.hairstylist@gmail.com",
};

// 0 = domenica … 6 = sabato (come Date.getDay())
export type Day = { day: number; label: string; open?: string; close?: string };

export const hours: Day[] = [
  { day: 1, label: "Lunedì" },
  { day: 2, label: "Martedì", open: "09:00", close: "18:00" },
  { day: 3, label: "Mercoledì", open: "13:00", close: "20:00" },
  { day: 4, label: "Giovedì", open: "09:00", close: "18:00" },
  { day: 5, label: "Venerdì", open: "09:00", close: "19:00" },
  { day: 6, label: "Sabato", open: "09:00", close: "18:00" },
  { day: 0, label: "Domenica" },
];

export const services = [
  {
    id: "hair",
    title: "Hair",
    lead: "Taglio, piega e colore.",
    photo: "hair",
    alt: "Capelli lunghi con riflessi, su maglia nera (foto segnaposto)",
    items: [
      "Taglio donna",
      "Taglio bambini e ragazzi",
      "Piega e acconciatura",
      "Colore",
      "Colpi di sole e schiariture",
      "Extension",
      "Permanente",
      "Trattamenti cute e capello",
      "Ricostruzione e Olaplex",
    ],
  },
  {
    id: "barber",
    title: "Barber",
    lead: "Degradè e cura della barba.",
    photo: "barber",
    alt: "Barbiere che rifinisce un taglio con il rasoio (foto segnaposto)",
    items: ["Degradè specialist", "Taglio uomo", "Taglio barba", "Trattamenti barba", "Styling"],
  },
  {
    id: "beauty",
    title: "Beauty",
    lead: "Mani, viso, corpo e trucco.",
    photo: "beauty",
    alt: "Manicure in corso in un salone (foto segnaposto)",
    items: [
      "Manicure e pedicure",
      "Nail art",
      "Epilazione",
      "Trattamenti viso e corpo",
      "Ciglia e sopracciglia",
      "Make-up e trucco semipermanente",
      "Armocromia",
      "Consulenza",
    ],
  },
];

// Prezzi e durate dal listino Treatwell ("Servizi più richiesti"). Da confermare con il salone.
export const priceList = [
  { name: "Taglio uomo", time: "30 min", price: "€ 20" },
  { name: "Taglio + asciugatura", time: "45 min – 1 ora", price: "da € 27" },
  { name: "Piega", time: "30 – 45 min", price: "da € 17" },
  { name: "Piega con piastra", time: "45 min", price: "€ 27" },
  { name: "Shampoo e asciugatura", time: "15 – 30 min", price: "da € 5" },
  { name: "Shampoo speciale + maschera", time: "30 min", price: "€ 10" },
  { name: "Schiariture, colpi di sole e piega", time: "1 ora 30 – 2 ore 15", price: "da € 52" },
];

// Valutazioni pubbliche su Treatwell (recensioni verificate)
export const rating = {
  score: "4,8",
  count: 274,
  source: "Treatwell",
  award: "Top Rated 2023",
};

export const team = [
  { name: "Mary", role: "Stilista", score: "4,8", reviews: 72 },
  { name: "Ketti", role: "Stilista", score: "4,9", reviews: 42 },
];

// Recensioni vere da Treatwell, testo originale. Nome come compare sulla piattaforma.
export const reviews = [
  {
    text: "Gentilezza simpatia e professionalità. Non c'è stata una volta che non sia uscita soddisfatta del lavoro fatto \"sulla mia testa\" da Mary o Ketty. Bravissime!",
    author: "Flavia",
    service: "Decolorazione donna",
    stars: 5,
  },
  {
    text: "Totalmente eccellente come sempre del resto.",
    author: "Fabio",
    service: "Taglio barba",
    stars: 5,
  },
  {
    text: "Il top come sempre.",
    author: "Oriana T.",
    service: "Ritocco colore",
    stars: 5,
  },
];

export const transport = "Fermata bus Cassano Magnago – Via 5 Giornate angolo Via Mazzini";

export const specialties = [
  {
    n: "01",
    title: "Degradè specialist",
    text: "Sfumature pulite, dalla nuca alle tempie. Il degradè è la nostra specialità in barberia.",
  },
  {
    n: "02",
    title: "Ricostruzione e Olaplex",
    text: "Trattamenti Olaplex e ricostruzione per capelli trattati, decolorati o stressati dal calore.",
  },
  {
    n: "03",
    title: "GHD e L'Oréal",
    text: "Lavoriamo e consigliamo prodotti GHD e L'Oréal, anche da usare a casa.",
  },
  {
    n: "04",
    title: "Armocromia",
    text: "L'analisi dei colori che ti valorizzano, per scegliere tinta, trucco e abiti.",
  },
];

export const amenities = [
  "Accesso in sedia a rotelle",
  "Parcheggio gratuito nelle vicinanze",
  "Carte di credito e debito",
  "Pagamenti NFC da smartphone",
];

// Foto in /public/foto: per ora segnaposto Unsplash (vedi public/foto/CREDITS.md), da sostituire con foto reali del salone.
export const gallery = [
  { photo: "salone-1", alt: "Le postazioni del salone KM Hair: pareti grigie, specchi e poltrone nere" },
  { photo: "salone-2", alt: "Parrucchiera che asciuga i capelli con la spazzola (foto segnaposto)" },
  { photo: "salone-3", alt: "Barbiere che rifinisce la barba con le forbici (foto segnaposto)" },
  { photo: "salone-4", alt: "Unghie nere e tartarugate con anello dorato (foto segnaposto)" },
  { photo: "salone-5", alt: "Parrucchiera che crea un raccolto (foto segnaposto)" },
];
