import { useState, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
  scopes: string[];
}

interface GroupedFAQs {
  [key: string]: FAQ[];
}

interface FAQFilterProps {
  faqs: FAQ[];
}

export default function FAQFilter({ faqs = [] }: FAQFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter FAQs based on search query
  const filteredFaqs = useMemo(() => {
    if (!searchQuery.trim()) {
      return faqs;
    }
    const query = searchQuery.toLowerCase();
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
    );
  }, [faqs, searchQuery]);

  // Group FAQs by scope prefix
  const groupedFaqs = useMemo(() => {
    const groups: GroupedFAQs = {
      general: [],
      service: [],
      location: [],
      other: [],
    };

    filteredFaqs.forEach((faq) => {
      const scope = faq.scopes[0] || "other";
      if (scope === "general") {
        groups.general.push(faq);
      } else if (scope.startsWith("service:")) {
        groups.service.push(faq);
      } else if (scope.startsWith("location:")) {
        groups.location.push(faq);
      } else {
        groups.other.push(faq);
      }
    });

    return groups;
  }, [filteredFaqs]);

  // Group display names
  const groupNames: Record<string, string> = {
    general: "General Questions",
    service: "Service Questions",
    location: "Location Questions",
    other: "Other Questions",
  };

  return (
    <div className="w-full space-y-8">
      {/* Search Input */}
      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
        {searchQuery && (
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* No Results */}
      {filteredFaqs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No FAQs found matching your search.
          </p>
        </div>
      )}

      {/* Grouped FAQs */}
      {Object.entries(groupedFaqs).map(([groupKey, groupFaqs]) => {
        if (groupFaqs.length === 0) return null;

        return (
          <div key={groupKey} className="space-y-4">
            <h3 className="text-2xl font-semibold">{groupNames[groupKey]}</h3>
            <Accordion type="single" collapsible className="w-full">
              {groupFaqs.map((faq, index) => (
                <AccordionItem
                  key={`${groupKey}-${index}`}
                  value={`${groupKey}-${index}`}
                >
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="text-muted-foreground whitespace-pre-line">
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        );
      })}
    </div>
  );
}
