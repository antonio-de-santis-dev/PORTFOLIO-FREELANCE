import type { ProjectImage } from "../data/types";

interface Props {
  image: ProjectImage;
  sizes: string;
  /** true solo per l'immagine principale above-the-fold. */
  priority?: boolean;
}

export function Picture({ image, sizes, priority = false }: Props) {
  const base = `/projects/${image.src}`;
  const srcset = (ext: string) => image.widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`${base}.jpg`}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchpriority: "high" } : {})}
      />
    </picture>
  );
}
