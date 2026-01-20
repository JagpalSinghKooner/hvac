import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Menu, Phone, ChevronRight, Mail, Calendar } from 'lucide-react';

interface Service {
  title: string;
  slug: string;
}

interface Location {
  name: string;
  slug: string;
}

interface Region {
  name: string;
  locations: Location[];
}

interface NavCategory {
  name: string;
  key: string;
}

interface BusinessData {
  services: {
    navbar_categories: NavCategory[];
    list: Record<string, Service[]>;
  };
  coverage: {
    regions: Region[];
  };
  contact: {
    phone_display: string;
    phone_e164: string;
    email: string;
  };
}

interface MobileNavProps {
  business: BusinessData;
}

// Define service category groups matching desktop navigation
const serviceCategoryGroups = [
  { name: "Heating", key: "heating" },
  { name: "Cooling", key: "cooling" },
  { name: "Water Heating", key: "water_heating" },
  { name: "Indoor Air Quality", key: "iaq" },
  { name: "Other Services", key: "other" }
];

// Animation delay helper for staggered effects
const getAnimationDelay = (index: number) => ({
  animationDelay: `${index * 50}ms`,
});

export function MobileNav({ business }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open mobile menu">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <Accordion type="single" collapsible className="w-full">
            {/* Individual Service Category Accordions */}
            {serviceCategoryGroups.map((category, index) => (
              <AccordionItem
                key={category.key}
                value={category.key}
                className="border-b-0 animate-fade-in-left opacity-0"
                style={getAnimationDelay(index)}
              >
                <AccordionTrigger className="text-sm font-heading font-semibold hover:text-primary transition-colors">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-4">
                    {category.key === 'other'
                      ? [
                          ...(business.services?.list?.commercial || []),
                          ...(business.services?.list?.plans || [])
                        ].map((service) => (
                          <li key={service.slug}>
                            <SheetClose asChild>
                              <a
                                href={`/services/${service.slug}/`}
                                className="flex items-center justify-between py-1.5 text-sm font-body hover:text-primary transition-all duration-200 group"
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                  {service.title}
                                </span>
                                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </a>
                            </SheetClose>
                          </li>
                        ))
                      : business.services?.list?.[category.key]?.map((service) => (
                          <li key={service.slug}>
                            <SheetClose asChild>
                              <a
                                href={`/services/${service.slug}/`}
                                className="flex items-center justify-between py-1.5 text-sm font-body hover:text-primary transition-all duration-200 group"
                              >
                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                  {service.title}
                                </span>
                                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                              </a>
                            </SheetClose>
                          </li>
                        ))
                    }
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}

          </Accordion>

          {/* Locations Link (outside accordion) */}
          <div
            className="mt-4 px-2 border-t pt-4 animate-fade-in-left opacity-0"
            style={getAnimationDelay(serviceCategoryGroups.length)}
          >
            <SheetClose asChild>
              <a
                href="/locations/"
                className="flex items-center justify-between py-2 text-sm font-heading font-semibold hover:text-primary transition-all duration-200 group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  Locations
                </span>
                <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            </SheetClose>
          </div>

          {/* Contact Information Section */}
          <div
            className="mt-6 px-2 space-y-3 border-t pt-6 animate-fade-in-left opacity-0"
            style={getAnimationDelay(serviceCategoryGroups.length + 1)}
          >
            <h3 className="text-xs font-heading font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Contact Us
            </h3>

            {/* Phone */}
            <a
              href={`tel:${business.contact.phone_e164}`}
              className="flex items-center gap-3 text-sm font-body hover:text-primary transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <span>{business.contact.phone_display}</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${business.contact.email}`}
              className="flex items-center gap-3 text-sm font-body hover:text-primary transition-colors group"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <span className="truncate">{business.contact.email}</span>
            </a>
          </div>

          {/* CTA Buttons */}
          <div
            className="mt-6 space-y-3 px-2 border-t pt-6 animate-fade-in-left opacity-0"
            style={getAnimationDelay(serviceCategoryGroups.length + 2)}
          >
            {/* Call CTA with gradient */}
            <a
              href={`tel:${business.contact.phone_e164}`}
              className="flex items-center justify-center gap-2 w-full rounded-md gradient-brand text-white hover:scale-105 hover:shadow-glow-primary h-11 px-8 text-base font-heading font-semibold transition-all duration-300"
            >
              <Phone className="h-4 w-4" />
              <span>Call {business.contact.phone_display}</span>
            </a>

            {/* Booking CTA */}
            <a
              href="/contact/"
              className="flex items-center justify-center gap-2 w-full rounded-md border-2 border-primary bg-background text-primary hover:bg-primary hover:text-white h-11 px-8 text-base font-heading font-semibold transition-all duration-300"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Online</span>
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Inject animation styles
if (typeof document !== 'undefined' && !document.getElementById('mobile-nav-styles')) {
  const styles = `
    @keyframes fade-in-left {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .animate-fade-in-left {
      animation: fade-in-left 0.5s ease forwards;
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-fade-in-left {
        animation: none;
        opacity: 1;
      }

      .transition-transform,
      .transition-all,
      .group:hover .transition-transform {
        transition: none;
      }
    }
  `;

  const styleSheet = document.createElement('style');
  styleSheet.id = 'mobile-nav-styles';
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
