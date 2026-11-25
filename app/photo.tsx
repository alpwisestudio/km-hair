import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

// Letto una volta all'avvio/build: quali foto reali sono presenti in /public/foto.
const dir = path.join(process.cwd(), "public", "foto");
const exts = ["avif", "webp", "jpg", "jpeg", "png"];

function find(name: string): string | null {
  for (const ext of exts) {
    if (existsSync(path.join(dir, `${name}.${ext}`))) return `/foto/${name}.${ext}`;
  }
  return null;
}

export function Photo({
  name,
  alt,
  sizes,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const src = find(name);
  return (
    <div className={`relative overflow-hidden bg-cocoa ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        // Riquadro neutro finché la foto reale non è caricata
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_30%_20%,#4a302a,#2a1a16_70%)]"
        >
          <span className="font-display text-6xl tracking-wider text-blush/15">KM</span>
        </div>
      )}
    </div>
  );
}
