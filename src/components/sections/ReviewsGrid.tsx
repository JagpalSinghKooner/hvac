import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, CheckCircle } from "lucide-react";

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

interface ReviewsGridProps {
  reviews: Review[];
}

// Map service slugs to categories
const getServiceCategory = (serviceSlug: string): string => {
  const categoryMap: Record<string, string> = {
    // Heating
    "furnace-installation": "heating",
    "furnace-repair": "heating",
    "heat-pump-installation": "heating",
    "heat-pump-repair": "heating",
    "boiler-installation": "heating",
    "boiler-repair": "heating",
    "ductless-heating": "heating",
    "fireplace-installation": "heating",

    // Cooling
    "air-conditioning-installation": "cooling",
    "air-conditioning-repair": "cooling",
    "central-air-installation": "cooling",
    "ductless-air-conditioning": "cooling",

    // IAQ
    "air-purifier-installation": "iaq",
    "humidifier-installation": "iaq",
    "dehumidifier-installation": "iaq",
    "air-quality-testing": "iaq",
    "ventilation-systems": "iaq",
    "hrv-erv-installation": "iaq",

    // Water Heating
    "water-heater-installation": "water-heating",
    "water-heater-repair": "water-heating",
    "tankless-water-heaters": "water-heating",

    // Commercial
    "commercial-hvac-installation": "commercial",
    "commercial-hvac-repair": "commercial",
  };

  return categoryMap[serviceSlug] || "other";
};

export default function ReviewsGrid({ reviews = [] }: ReviewsGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  // Filter options
  const filters = [
    { key: "all", label: "All Reviews" },
    { key: "heating", label: "Heating" },
    { key: "cooling", label: "Cooling" },
    { key: "iaq", label: "Indoor Air Quality" },
    { key: "water-heating", label: "Water Heating" },
  ];

  // Filter reviews based on active filter
  const filteredReviews = useMemo(() => {
    if (activeFilter === "all") {
      return reviews;
    }
    return reviews.filter(
      (review) => getServiceCategory(review.data.serviceSlug) === activeFilter
    );
  }, [reviews, activeFilter]);

  // Render star rating
  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div className="w-full space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === filter.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-center text-sm text-muted-foreground">
        Showing {filteredReviews.length} review{filteredReviews.length !== 1 ? "s" : ""}
      </p>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="h-full">
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
              <blockquote className="text-sm text-foreground/90 mb-4 flex-grow">
                "{review.data.text}"
              </blockquote>

              {/* Author Info */}
              <div className="pt-4 border-t space-y-1">
                <p className="font-semibold text-sm">{review.data.authorName}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {review.data.citySlug && (
                    <span className="capitalize">
                      {review.data.citySlug.replace(/-/g, " ")}
                    </span>
                  )}
                  {review.data.citySlug && <span>•</span>}
                  <span>{formatDate(review.data.reviewDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredReviews.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No reviews found for this category.
          </p>
        </div>
      )}
    </div>
  );
}
