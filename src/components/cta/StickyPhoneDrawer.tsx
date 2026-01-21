'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Phone, Mail } from 'lucide-react';

interface StickyPhoneDrawerProps {
  phoneDisplay: string;
  phoneE164: string;
  email: string;
}

export default function StickyPhoneDrawer({
  phoneDisplay,
  phoneE164,
  email,
}: StickyPhoneDrawerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasPassedValueProps, setHasPassedValueProps] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if user has scrolled past Value Props section (roughly 100vh + hero)
      if (currentScrollY > 800 && !hasPassedValueProps) {
        setHasPassedValueProps(true);
      }

      // Only show/hide after user has passed Value Props
      if (hasPassedValueProps) {
        // Show when scrolling UP
        if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
        // Hide when scrolling DOWN
        else if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, hasPassedValueProps]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-150 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-background border-t border-border shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Phone CTA (Primary) */}
            <Button
              asChild
              size="lg"
              className="flex-1 sm:flex-none min-h-[56px]"
            >
              <a href={`tel:${phoneE164}`}>
                <Phone className="h-5 w-5 mr-2" />
                <span className="hidden sm:inline">{phoneDisplay}</span>
                <span className="sm:hidden">Call Now</span>
              </a>
            </Button>

            {/* Tagline (Hidden on Mobile) */}
            <div className="hidden md:flex flex-col flex-1 text-sm">
              <span className="font-semibold text-foreground">
                Get a Free Installation Quote
              </span>
              <span className="text-muted-foreground">
                No obligation • Same-day response
              </span>
            </div>

            {/* Email CTA (Secondary) */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-h-[56px]"
            >
              <a href={`mailto:${email}`}>
                <Mail className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline">Email</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
