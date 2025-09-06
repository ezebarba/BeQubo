import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

type Preload = "auto" | "metadata" | "none";

type Props = {
  /** Fuentes por orientación y calidad */
  landscape720: string;
  landscape1080: string;
  portrait720: string;
  portrait1080: string;

  /** Posters opcionales (uno por orientación) */
  posterLandscape?: string;
  posterPortrait?: string;

  /** Alto del héroe en viewport height (por defecto 92) */
  heightVh?: number;

  /** Forzar retrato por debajo de este ancho en px (opcional) */
  portraitBelowPx?: number;

  /** Controles de video (sanos para autoplay) */
  preload?: Preload;
  muted?: boolean;
  loop?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;

  /** Accesibilidad */
  ariaLabel?: string;

  /** Overlay */
  overlay?: boolean;                 // muestra capa encima del video
  overlayClassName?: string;         // tailwind para el overlay (gradiente/oscurecido)

  /** Contenido superpuesto (slot) */
  children?: ReactNode;
  contentPosition?:
    | "center"
    | "top-left" | "top-center" | "top-right"
    | "bottom-left" | "bottom-center" | "bottom-right";
  contentClassName?: string;         // estilos extra del contenido (max-w, tipografía, etc.)

  /** Clases extra del contenedor raíz */
  className?: string;
};

const DEFAULTS = {
  heightVh: 92,
  preload: "auto" as Preload,
  muted: true,
  loop: true,
  autoPlay: true,
  playsInline: true,
  ariaLabel: "Video destacado",
  overlay: true,
  overlayClassName: "bg-gradient-to-b from-black/60 via-black/30 to-black/0",
  contentPosition: "center" as Props["contentPosition"],
};

function pickSource(
  w: number,
  h: number,
  dpr: number,
  portraitBelowPx: number | undefined,
  files: {
    landscape720: string;
    landscape1080: string;
    portrait720: string;
    portrait1080: string;
  }
) {
  // 1) Orientación efectiva
  const isPortraitByMedia =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(orientation: portrait)").matches;

  const isPortrait =
    (portraitBelowPx && w <= portraitBelowPx) ||
    (isPortraitByMedia ? true : h > w);

  // 2) Calidad según lado corto * dpr
  const shortSide = Math.min(w, h) * (dpr || 1);
  const want1080 = shortSide >= 1080;

  const src = isPortrait
    ? want1080
      ? files.portrait1080
      : files.portrait720
    : want1080
    ? files.landscape1080
    : files.landscape720;

  return { src, isPortrait, want1080 };
}

const positionClasses: Record<NonNullable<Props["contentPosition"]>, string> = {
  center: "items-center justify-center",
  "top-left": "items-start justify-start",
  "top-center": "items-start justify-center",
  "top-right": "items-start justify-end",
  "bottom-left": "items-end justify-start",
  "bottom-center": "items-end justify-center",
  "bottom-right": "items-end justify-end",
};

export default function HeroVideoAdaptive({
  landscape720,
  landscape1080,
  portrait720,
  portrait1080,
  posterLandscape,
  posterPortrait,
  heightVh = DEFAULTS.heightVh,
  portraitBelowPx,
  preload = DEFAULTS.preload,
  muted = DEFAULTS.muted,
  loop = DEFAULTS.loop,
  autoPlay = DEFAULTS.autoPlay,
  playsInline = DEFAULTS.playsInline,
  ariaLabel = DEFAULTS.ariaLabel,
  overlay = DEFAULTS.overlay,
  overlayClassName = DEFAULTS.overlayClassName,
  children,
  contentPosition = DEFAULTS.contentPosition,
  contentClassName = "",
  className = "",
}: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [active, setActive] = useState(() =>
    pickSource(
      typeof window !== "undefined" ? window.innerWidth : 1920,
      typeof window !== "undefined" ? window.innerHeight : 1080,
      typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1,
      portraitBelowPx,
      { landscape720, landscape1080, portrait720, portrait1080 }
    )
  );

  const poster = useMemo(
    () =>
      active && active.src
        ? active.src === portrait720 || active.src === portrait1080
          ? posterPortrait
          : posterLandscape
        : posterLandscape,
    [active, portrait720, portrait1080, posterLandscape, posterPortrait]
  );

  useEffect(() => {
    const onChange = () => {
      const { innerWidth: w, innerHeight: h, devicePixelRatio: dpr } = window;
      const next = pickSource(
        w,
        h,
        dpr || 1,
        portraitBelowPx,
        { landscape720, landscape1080, portrait720, portrait1080 }
      );
      setActive((prev) => (prev?.src !== next.src ? next : prev));
    };

    const mq =
      typeof window !== "undefined" && window.matchMedia
        ? window.matchMedia("(orientation: portrait)")
        : null;

    window.addEventListener("resize", onChange, { passive: true });
    mq?.addEventListener?.("change", onChange);
    onChange();

    return () => {
      window.removeEventListener("resize", onChange);
      mq?.removeEventListener?.("change", onChange);
    };
  }, [portraitBelowPx, landscape720, landscape1080, portrait720, portrait1080]);

  // Fallback si falla 1080 ➜ 720
  const handleError = () => {
    if (!active) return;
    const isPortrait = active.src === portrait720 || active.src === portrait1080;
    const fallback = isPortrait ? portrait720 : landscape720;
    if (fallback && fallback !== active.src) {
      setActive({ src: fallback, isPortrait, want1080: false });
    }
  };

  const key = active?.src || "video";

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ height: `${heightVh}vh` }}
      aria-label="Sección de video hero"
    >
      <video
        key={key}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src={active?.src}
        poster={poster}
        preload={preload}
        muted={muted}
        loop={loop}
        autoPlay={autoPlay}
        playsInline={playsInline}
        aria-label={ariaLabel}
        onError={handleError}
      />

      {overlay && (
        <div
          className={`absolute inset-0 pointer-events-none ${overlayClassName}`}
          aria-hidden="true"
        />
      )}

      {children && (
        <div
          className={`absolute inset-0 flex ${positionClasses[contentPosition]} px-6`}
        >
          <div className={contentClassName}>{children}</div>
        </div>
      )}
    </section>
  );
}
