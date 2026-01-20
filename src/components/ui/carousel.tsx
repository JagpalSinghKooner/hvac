import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';
import { TestimonialCardReact } from '@/components/cards/TestimonialCardReact';
import { cn } from '@/lib/utils';

interface CarouselProps {
  testimonials: Testimonial[];
  variant?: 'card' | 'quote';
  autoplay?: boolean;
  autoplayInterval?: number;
  loop?: boolean;
  draggable?: boolean;
  showDots?: boolean;
  showArrows?: boolean;
}

export function TestimonialsCarouselClient({
  testimonials,
  variant = 'card',
  autoplay = true,
  autoplayInterval = 5000,
  loop = true,
  draggable = true,
  showDots = true,
  showArrows = true,
}: CarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Configure Embla with plugins
  const plugins = autoplay
    ? [Autoplay({ delay: autoplayInterval, stopOnInteraction: true })]
    : [];

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
      watchDrag: draggable,
    },
    plugins
  );

  // Navigation handlers
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Update selected index
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Initialize scroll snaps and listeners
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

  return (
    <div className="relative">
      {/* Carousel Viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)]"
            >
              <TestimonialCardReact testimonial={testimonial} variant={variant} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            onClick={scrollPrev}
            disabled={!canScrollPrev && !loop}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-background border shadow-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            onClick={scrollNext}
            disabled={!canScrollNext && !loop}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && scrollSnaps.length > 0 && (
        <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Carousel pagination">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                index === selectedIndex
                  ? "bg-primary w-8"
                  : "bg-muted hover:bg-primary/50"
              )}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              role="tab"
              aria-selected={index === selectedIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}
