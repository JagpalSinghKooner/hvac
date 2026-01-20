import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import * as Icons from 'lucide-react';

interface ServiceProblem {
  problem: string;
  solution: string;
  icon: string; // Lucide icon name
}

interface CommonProblemsAccordionProps {
  problems: ServiceProblem[];
}

export function CommonProblemsAccordion({ problems }: CommonProblemsAccordionProps) {
  // Pre-process problems to resolve icon components
  const problemsWithIcons = problems.map(problem => ({
    ...problem,
    IconComponent: (Icons as any)[problem.icon] || Icons.AlertTriangle
  }));

  return (
    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto space-y-4">
      {problemsWithIcons.map((problem, index) => (
        <AccordionItem value={`problem-${index}`} key={`problem-${index}`} className="border rounded-lg px-6">
          <AccordionTrigger className="text-left font-heading text-lg gap-3 hover:no-underline">
            <span className="flex items-center gap-3">
              <problem.IconComponent className="h-5 w-5 text-error flex-shrink-0" aria-hidden="true" />
              <span>{problem.problem}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 font-body pl-8 pt-2">
            {problem.solution}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
