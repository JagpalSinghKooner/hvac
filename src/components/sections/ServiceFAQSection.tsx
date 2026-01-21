import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQSectionProps {
  faqs: FAQ[];
  headline?: string;
  limit?: number;
}

export default function ServiceFAQSection({
  faqs = [],
  headline = "Frequently Asked Questions",
  limit = 6,
}: ServiceFAQSectionProps) {
  // Return null if no FAQs provided
  if (!faqs || faqs.length === 0) {
    return null;
  }

  // Limit the number of FAQs displayed
  const displayedFaqs = faqs.slice(0, limit);

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {headline}
          </h2>

          <Accordion type="single" collapsible className="w-full">
            {displayedFaqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
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
      </div>
    </section>
  );
}
