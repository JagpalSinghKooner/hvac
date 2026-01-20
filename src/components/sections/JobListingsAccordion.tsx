import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import * as Icons from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Job } from '@/data/jobs';

interface JobListingsAccordionProps {
  jobs: Job[];
}

// Helper function to get department color
const getDepartmentColor = (department: Job['department']): string => {
  const colors = {
    'Installation': 'border-l-blue-500',
    'Service & Repair': 'border-l-orange-500',
    'Administration': 'border-l-green-500',
    'Sales': 'border-l-purple-500',
  };
  return colors[department] || 'border-l-gray-500';
};

// Helper function to truncate description
const truncateDescription = (text: string, maxLength: number = 150): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Helper function to get posted date info
const getPostedDateInfo = (postedDate?: string) => {
  if (!postedDate) return null;

  const posted = new Date(postedDate);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60 * 24));

  return {
    isNew: daysDiff <= 14,
    daysAgo: daysDiff,
    formattedDate: posted.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  };
};

// Helper function to create mailto link
const getApplyMailtoLink = (job: Job): string => {
  const subject = encodeURIComponent(`Application for ${job.title}`);
  const body = encodeURIComponent(
    `I am interested in applying for the ${job.title} position (Job ID: ${job.id}).\n\n` +
    `Please find my resume attached.\n\n` +
    `Best regards`
  );
  return `mailto:careers@bapheating.ca?subject=${subject}&body=${body}`;
};

export function JobListingsAccordion({ jobs }: JobListingsAccordionProps) {
  if (!jobs || jobs.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {jobs.map((job) => {
        const dateInfo = getPostedDateInfo(job.postedDate);
        const departmentColor = getDepartmentColor(job.department);
        const MailIcon = Icons.Mail;
        const ArrowRightIcon = Icons.ArrowRight;

        return (
          <Card
            key={job.id}
            className={cn(
              'border-l-4 h-full flex flex-col',
              departmentColor
            )}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-2 flex-wrap">
                <CardTitle className="text-xl flex-1">{job.title}</CardTitle>
                <div className="flex gap-2 flex-wrap">
                  {dateInfo?.isNew && (
                    <Badge variant="destructive" className="text-xs">
                      New
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {job.type}
                  </Badge>
                </div>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icons.MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                {dateInfo && (
                  <div className="flex items-center gap-2">
                    <Icons.Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>Posted: {dateInfo.formattedDate}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {truncateDescription(job.description)}
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col gap-4">
              {/* Accordion for job details */}
              <Accordion type="single" collapsible className="w-full">
                {/* Responsibilities */}
                <AccordionItem value={`${job.id}-responsibilities`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">
                    Responsibilities
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.responsibilities.map((item, index) => (
                        <li key={index} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Qualifications */}
                <AccordionItem value={`${job.id}-qualifications`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">
                    Qualifications
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.qualifications.map((item, index) => (
                        <li key={index} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Benefits */}
                <AccordionItem value={`${job.id}-benefits`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">
                    Benefits
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {job.benefits.map((item, index) => (
                        <li key={index} className="pl-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Salary */}
              {job.salary && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-semibold text-foreground">
                    Salary: <span className="font-normal text-muted-foreground">{job.salary}</span>
                  </p>
                </div>
              )}

              {/* Apply Button */}
              <div className="mt-auto pt-4">
                <Button asChild className="w-full">
                  <a href={getApplyMailtoLink(job)}>
                    <MailIcon className="h-4 w-4 mr-2" />
                    Apply Now
                    <ArrowRightIcon className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
