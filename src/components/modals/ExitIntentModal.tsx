'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Phone, Mail } from 'lucide-react';

interface ExitIntentModalProps {
  phoneDisplay: string;
  phoneE164: string;
  email: string;
}

const STORAGE_KEY = 'bap_exit_modal_shown';

export default function ExitIntentModal({
  phoneDisplay,
  phoneE164,
  email,
}: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);

  useEffect(() => {
    // Check if modal has already been shown this session
    const hasShown = sessionStorage.getItem(STORAGE_KEY);
    if (hasShown) {
      return; // Don't set up triggers if already shown
    }

    // Track time on page
    const startTime = Date.now();
    const timeInterval = setInterval(() => {
      setTimeOnPage(Date.now() - startTime);
    }, 1000);

    // Track scroll depth
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const depth = ((scrollTop + windowHeight) / documentHeight) * 100;
      setScrollDepth(depth);
    };

    // Desktop: Mouse leaves viewport top (after 10+ seconds)
    const handleMouseLeave = (e: MouseEvent) => {
      if (timeOnPage < 10000) return; // Must be on page for 10+ seconds
      if (e.clientY <= 0) {
        // Mouse leaving from top
        showModal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearInterval(timeInterval);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [timeOnPage]);

  // Mobile: 75% scroll depth OR 30 seconds on page
  useEffect(() => {
    const hasShown = sessionStorage.getItem(STORAGE_KEY);
    if (hasShown) return;

    if (scrollDepth >= 75 || timeOnPage >= 30000) {
      showModal();
    }
  }, [scrollDepth, timeOnPage]);

  const showModal = () => {
    const hasShown = sessionStorage.getItem(STORAGE_KEY);
    if (hasShown) return;

    setIsOpen(true);
    sessionStorage.setItem(STORAGE_KEY, 'true');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Have Questions About Your HVAC Project?
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            Our experts are ready to help — no pressure, no obligation
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 pt-4">
          {/* Phone CTA (Primary) */}
          <Button
            asChild
            size="lg"
            className="w-full min-h-[56px]"
            onClick={handleClose}
          >
            <a href={`tel:${phoneE164}`}>
              <Phone className="h-5 w-5 mr-2" />
              {phoneDisplay}
            </a>
          </Button>

          {/* Email CTA (Secondary) */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full min-h-[56px]"
            onClick={handleClose}
          >
            <a href={`mailto:${email}`}>
              <Mail className="h-5 w-5 mr-2" />
              Send an Email
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
