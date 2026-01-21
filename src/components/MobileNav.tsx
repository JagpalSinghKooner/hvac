import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Menu, Phone, ChevronRight } from 'lucide-react';
import './MobileNav.css';

interface ServiceCategory {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href: string;
}

interface MobileNavProps {
  phone: string;
  phoneE164: string;
  serviceCategories: ServiceCategory[];
  mainNavItems: NavItem[];
}

export default function MobileNav({
  phone,
  phoneE164,
  serviceCategories,
  mainNavItems,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-11 w-11">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-left text-xl">Menu</SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col gap-1">
            {/* Services Accordion */}
            <div className="border-b border-border pb-1 mb-1">
              <button
                onClick={() => setServicesExpanded(!servicesExpanded)}
                className="mobile-nav-item w-full text-left"
              >
                <span>Services</span>
                <ChevronRight
                  className={`w-5 h-5 transition-transform ${
                    servicesExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>
              {servicesExpanded && (
                <div className="ml-4 mt-1 flex flex-col gap-1">
                  {serviceCategories.map((category) => (
                    <a
                      key={category.href}
                      href={category.href}
                      className="mobile-nav-subitem"
                      onClick={() => setOpen(false)}
                    >
                      {category.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {mainNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="mobile-nav-item"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Mobile Phone CTA */}
          <div className="mt-8 pt-6 border-t border-border">
            <a href={`tel:${phoneE164}`} className="block">
              <Button size="lg" className="w-full h-14 text-base font-semibold">
                <Phone className="w-5 h-5" />
                {phone}
              </Button>
            </a>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
