import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/data/testimonials';

interface Props {
  testimonial: Testimonial;
  variant?: 'card' | 'quote';
  className?: string;
}

export function TestimonialCardReact({
  testimonial,
  variant = 'card',
  className
}: Props) {
  // Defensive defaults for edge cases
  const rating = testimonial.rating || 5;
  const authorName = testimonial.author || 'Anonymous';
  const location = testimonial.location || 'Southern Ontario';
  const service = testimonial.service || 'HVAC Service';
  const hasText = testimonial.text && testimonial.text.trim().length > 0;

  // Star rating calculation
  const filledStars = rating;
  const emptyStars = 5 - rating;

  if (variant === 'card') {
    return (
      <Card className={cn("h-full flex flex-col", className)}>
        <CardContent className="p-6 flex flex-col gap-4 flex-1">
          {/* Star Rating with ARIA */}
          <div
            className="flex gap-0.5"
            role="img"
            aria-label={`${rating} out of 5 stars`}
          >
            {[...Array(filledStars)].map((_, i) => (
              <Star key={`filled-${i}`} className="h-4 w-4 fill-secondary text-secondary" />
            ))}
            {[...Array(emptyStars)].map((_, i) => (
              <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/30" />
            ))}
          </div>

          {/* Quote Text */}
          {hasText ? (
            <blockquote className="text-sm text-muted-foreground line-clamp-4 flex-1">
              "{testimonial.text}"
            </blockquote>
          ) : (
            <p className="text-sm text-muted-foreground italic flex-1">
              No review text available
            </p>
          )}

          {/* Author & Badges Footer */}
          <div className="flex flex-col gap-3 pt-2 border-t">
            <div>
              <p className="font-semibold text-sm">{authorName}</p>
              <p className="text-xs text-muted-foreground">{location}</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-primary/30 text-primary truncate max-w-[200px]">
                {service}
              </Badge>
              {testimonial.verified === true && (
                <Badge variant="default" className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" aria-hidden="true" />
                  <span>Verified</span>
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Quote Variant
  return (
    <blockquote className={cn("border-l-4 border-primary pl-6 py-4", className)}>
      {hasText ? (
        <p className="text-lg italic text-foreground mb-4">
          "{testimonial.text}"
        </p>
      ) : (
        <p className="text-lg italic text-muted-foreground mb-4">
          No review available
        </p>
      )}
      <footer className="flex items-center gap-2 flex-wrap">
        <div
          className="flex gap-0.5"
          role="img"
          aria-label={`${rating} out of 5 stars`}
        >
          {[...Array(filledStars)].map((_, i) => (
            <Star key={`filled-${i}`} className="h-4 w-4 fill-secondary text-secondary" />
          ))}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground/30" />
          ))}
        </div>
        <span className="text-sm font-semibold">— {authorName}</span>
        <span className="text-sm text-muted-foreground">{location}</span>
      </footer>
    </blockquote>
  );
}
