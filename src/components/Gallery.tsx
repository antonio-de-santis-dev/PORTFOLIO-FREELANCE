import { useRef, useState } from "react";
import type { ProjectImage } from "../data/types";
import { Icon } from "./Icon";
import { Picture } from "./Picture";

export function Gallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<ProjectImage | null>(null);

  const open = (image: ProjectImage) => {
    setActive(image);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <>
      {images.length > 1 && <p className="gallery-hint">Scorri lateralmente per vedere tutte le schermate.</p>}
      <div className="gallery" role="list">
        {images.map((image, i) => {
          // Con un numero dispari di immagini la prima occupa tutta la riga, le altre vanno in coppia.
          const wide = images.length % 2 === 1 && i === 0 && image.shape !== "phone";
          return (
            <figure key={image.src} role="listitem" className={wide ? "is-wide" : undefined}>
              <button type="button" className="zoom-btn" onClick={() => open(image)} aria-label={`Ingrandisci: ${image.caption}`}>
                <div className={`plate${image.shape === "phone" ? " plate--phone" : ""}`}>
                  <Picture image={image} sizes={wide ? "(min-width: 900px) 1240px, 86vw" : "(min-width: 900px) 620px, 86vw"} />
                </div>
              </button>
              <figcaption>{image.caption}</figcaption>
            </figure>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={active ? `${title}: ${active.caption}` : title}
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {active && (
          <>
            <div className="lightbox__bar">
              <p>{active.caption}</p>
              <button type="button" className="icon-btn" onClick={close} aria-label="Chiudi l'immagine ingrandita" autoFocus>
                <Icon name="close" />
              </button>
            </div>
            <Picture image={active} sizes="100vw" />
          </>
        )}
      </dialog>
    </>
  );
}
