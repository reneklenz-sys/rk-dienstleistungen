"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { getText } from "@/lib/i18n";
import type { Locale, ProjectScreenshot } from "@/types/content";

export function ImageCarousel({
  slides,
  locale,
  className = "",
}: {
  slides: ProjectScreenshot[];
  locale: Locale;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((current) => (next + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goTo(index - 1);
      if (event.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, index]);

  if (!total) return null;

  const active = slides[index];

  return (
    <div className={`reference-carousel ${className}`}>
      <div className="reference-carousel-frame overflow-hidden rounded-[calc(var(--surface-radius)-6px)] border border-foreground/8 bg-foreground/[0.03] dark:border-white/10 dark:bg-white/[0.04]">
        <div className="relative aspect-[16/10] w-full">
          {slides.map((slide, slideIndex) => (
            <div
              key={slide.src}
              className={`reference-carousel-slide absolute inset-0 transition duration-500 ease-out ${
                slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              aria-hidden={slideIndex !== index}
            >
              <Image
                src={slide.src}
                alt={getText(slide.alt, locale)}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 720px"
                priority={slideIndex === 0}
              />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
          <p className="absolute bottom-4 left-4 right-16 text-sm font-medium text-white drop-shadow">
            {getText(active.alt, locale)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="glass-control grid size-10 place-items-center rounded-full text-lg transition hover:scale-105"
            aria-label={locale === "de" ? "Vorheriges Bild" : "Previous image"}
            onClick={() => goTo(index - 1)}
          >
            ←
          </button>
          <button
            type="button"
            className="glass-control grid size-10 place-items-center rounded-full text-lg transition hover:scale-105"
            aria-label={locale === "de" ? "Nächstes Bild" : "Next image"}
            onClick={() => goTo(index + 1)}
          >
            →
          </button>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {slides.map((slide, slideIndex) => (
            <button
              key={slide.src}
              type="button"
              aria-label={`${getText(slide.alt, locale)} (${slideIndex + 1}/${total})`}
              aria-current={slideIndex === index}
              className={`h-2.5 rounded-full transition-all ${
                slideIndex === index ? "w-8 bg-[var(--accent)]" : "w-2.5 bg-foreground/15 dark:bg-white/20"
              }`}
              onClick={() => setIndex(slideIndex)}
            />
          ))}
        </div>
      </div>

      <div className="reference-carousel-thumbs mt-4 hidden gap-3 sm:grid sm:grid-cols-5">
        {slides.map((slide, slideIndex) => (
          <button
            key={`thumb-${slide.src}`}
            type="button"
            className={`relative aspect-[16/10] overflow-hidden rounded-2xl border transition ${
              slideIndex === index
                ? "border-[var(--accent-bright)] ring-2 ring-[var(--accent-bright)]/30"
                : "border-foreground/10 opacity-70 hover:opacity-100 dark:border-white/10"
            }`}
            onClick={() => setIndex(slideIndex)}
          >
            <Image src={slide.src} alt="" fill className="object-cover object-top" sizes="120px" />
          </button>
        ))}
      </div>
    </div>
  );
}
