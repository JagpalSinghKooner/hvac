import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionReactProps {
  faqs: FAQ[];
}

export function FAQAccordionReact({ faqs }: FAQAccordionReactProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {faqs.map((faq, index) => (
        <AccordionItem value={`item-${index}`} key={`faq-${index}`} className="border rounded-lg px-6">
          <AccordionTrigger className="text-left font-heading text-lg hover:no-underline">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 font-body pt-2">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
