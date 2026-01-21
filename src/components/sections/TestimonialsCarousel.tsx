import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Review {
  id: string;
  data: {
    authorName: string;
    rating: number;
    text: string;
    serviceSlug: string;
    citySlug?: string;
    verified: boolean;
    reviewDate: string;
  };
}

interface TestimonialsCarouselProps {
  reviews: Review[];
  googleRating: number;
  googleReviewCount: number;
  googleUrl?: string;
}

export default function TestimonialsCarousel({
  reviews,
  googleRating,
  googleReviewCount,
  googleUrl = 'https://www.google.com/search?q=B.A.P+Heating+%26+Cooling+Services+Ltd',
}: TestimonialsCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  // Track current slide
  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-background rounded-full shadow-sm">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-lg">{googleRating}</span>
              <span className="text-muted-foreground text-sm">
                from {googleReviewCount}+ reviews
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from homeowners across Southern Ontario
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {reviews.map((review) => (
                <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <Card className="h-full">
                      <CardContent className="p-6 flex flex-col h-full">
                        {/* Rating & Verified Badge */}
                        <div className="flex items-center justify-between mb-4">
                          {renderStars(review.data.rating)}
                          {review.data.verified && (
                            <Badge variant="secondary" className="gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        {/* Review Text */}
                        <blockquote className="text-sm text-foreground/90 mb-4 flex-grow line-clamp-6">
                          "{review.data.text}"
                        </blockquote>

                        {/* Author Info */}
                        <div className="pt-4 border-t">
                          <p className="font-semibold text-sm">
                            {review.data.authorName}
                          </p>
                          {review.data.citySlug && (
                            <p className="text-xs text-muted-foreground capitalize">
                              {review.data.citySlug.replace(/-/g, ' ')}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-muted-foreground/30'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              View All Reviews on Google
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
