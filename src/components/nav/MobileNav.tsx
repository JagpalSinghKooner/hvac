import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Menu, Phone } from 'lucide-react';

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
  };
}

interface MobileNavProps {
  business: BusinessData;
}

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
            {/* Services Accordion */}
            <AccordionItem value="services" className="border-b-0">
              <AccordionTrigger>Services</AccordionTrigger>
              <AccordionContent>
                {business.services?.navbar_categories
                  ?.filter((cat: any) => cat.key !== 'locations' && cat.key !== 'contact')
                  .map((category: any) => (
                  <div key={category.key} className="mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                      {category.name}
                    </h3>
                    <ul className="space-y-1 pl-4">
                      {business.services?.list?.[category.key]?.map((service: any) => (
                        <li key={service.slug}>
                          <a
                            href={`/services/${service.slug}/`}
                            className="text-sm hover:text-primary transition-colors block py-1"
                          >
                            {service.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Locations Accordion */}
            <AccordionItem value="locations" className="border-b-0">
              <AccordionTrigger>Locations</AccordionTrigger>
              <AccordionContent>
                {business.coverage?.regions?.map((region: any) => (
                  <div key={region.name} className="mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-2">
                      {region.name}
                    </h3>
                    <ul className="space-y-1 pl-4">
                      {region.locations?.map((location: any) => (
                        <li key={location.slug}>
                          <a
                            href={`/locations/${location.slug}/`}
                            className="text-sm hover:text-primary transition-colors block py-1"
                          >
                            {location.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* About & Contact Links */}
          <div className="mt-6 space-y-1">
            <a
              href="/about/"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
            >
              About Us
            </a>
            <a
              href="/contact/"
              className="block px-4 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Phone CTA */}
          <div className="mt-6">
            <a
              href={`tel:${business.contact.phone_e164}`}
              className="flex items-center justify-center gap-2 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-base font-medium transition-colors"
            >
              <Phone className="h-4 w-4" />
              {business.contact.phone_display}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
