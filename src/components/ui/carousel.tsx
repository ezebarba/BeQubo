"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import { cn } from "../../lib/utils"; // ⬅️ RUTA RELATIVA (no alias @)

type CarouselContextValue = {
  api: EmblaCarouselType | null;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);
export function useCarousel() {
  const ctx = React.useContext(CarouselContext);
  if (!ctx) throw new Error("useCarousel must be used within <Carousel>");
  return ctx;
}

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  options?: EmblaOptionsType;
  plugins?: any[];
};

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, options, plugins, children, ...props }, ref) => {
    const [viewportRef, api] = useEmblaCarousel(options, plugins);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((embla: EmblaCarouselType) => {
      setCanScrollPrev(embla.canScrollPrev());
      setCanScrollNext(embla.canScrollNext());
    }, []);

    React.useEffect(() => {
      if (!api) return;
      onSelect(api);
      api.on("reInit", onSelect);
      api.on("select", onSelect);
      return () => {
        api?.off("reInit", onSelect);
        api?.off("select", onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{ api: api ?? null, canScrollPrev, canScrollNext }} // ⬅️ normalizamos undefined -> null
      >
        <div ref={ref} className={cn("relative", className)} {...props}>
          {/* viewport */}
          <div ref={viewportRef} className="overflow-hidden">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>;
export const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("flex -ml-0", className)} {...props} />;
  }
);
CarouselContent.displayName = "CarouselContent";

type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>;
export const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("min-w-0 shrink-0 grow-0 basis-full pl-0", className)}
        {...props}
      />
    );
  }
);
CarouselItem.displayName = "CarouselItem";

type ArrowButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export const CarouselPrevious = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ className, disabled, children, ...props }, ref) => {
    const { api, canScrollPrev } = useCarousel();
    const handleClick = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Anterior"
        onClick={handleClick}
        disabled={disabled ?? !canScrollPrev}
        className={cn(
          "absolute left-3 top-1/2 -translate-y-1/2 z-20",
          "inline-flex items-center justify-center rounded-full",
          "bg-black/30 text-white hover:bg-black/50",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "h-10 w-10",
          className
        )}
        {...props}
      >
        {children ?? <span className="text-xl leading-none">‹</span>}
      </button>
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";

export const CarouselNext = React.forwardRef<HTMLButtonElement, ArrowButtonProps>(
  ({ className, disabled, children, ...props }, ref) => {
    const { api, canScrollNext } = useCarousel();
    const handleClick = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    return (
      <button
        ref={ref}
        type="button"
        aria-label="Siguiente"
        onClick={handleClick}
        disabled={disabled ?? !canScrollNext}
        className={cn(
          "absolute right-3 top-1/2 -translate-y-1/2 z-20",
          "inline-flex items-center justify-center rounded-full",
          "bg-black/30 text-white hover:bg-black/50",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "h-10 w-10",
          className
        )}
        {...props}
      >
        {children ?? <span className="text-xl leading-none">›</span>}
      </button>
    );
  }
);
CarouselNext.displayName = "CarouselNext";
