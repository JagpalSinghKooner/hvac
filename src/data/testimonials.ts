export interface Testimonial {
  id: number;
  author: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string; // ISO format
  text: string;
  service: string;
  verified?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    author: 'Sarah M.',
    location: 'Guelph',
    rating: 5,
    date: '2025-11-15',
    text: 'B.A.P responded within 30 minutes when our furnace died in the middle of winter. The technician was professional, explained everything clearly, and had us warm again in under two hours. Honest pricing with no surprises. Highly recommend!',
    service: 'Furnace Repair',
    verified: true
  },
  {
    id: 2,
    author: 'Michael T.',
    location: 'Kitchener',
    rating: 5,
    date: '2025-10-22',
    text: 'Had a new high-efficiency furnace installed by B.A.P. The team was on time, incredibly clean, and completed the job in one day. My energy bills have already dropped noticeably. Worth every penny!',
    service: 'Furnace Installation',
    verified: true
  },
  {
    id: 3,
    author: 'Jennifer L.',
    location: 'Cambridge',
    rating: 5,
    date: '2025-09-08',
    text: 'Our AC stopped working during a heat wave. B.A.P came out the same day and diagnosed the issue quickly. Fair pricing and excellent service. They even showed me how to maintain the unit to prevent future problems.',
    service: 'Air Conditioner Repair',
    verified: true
  },
  {
    id: 4,
    author: 'David R.',
    location: 'Milton',
    rating: 4,
    date: '2025-08-30',
    text: 'Great experience with B.A.P for our new central air installation. Professional crew, clean work site, and they took time to answer all our questions. Only minor delay due to parts availability, but they kept us informed throughout.',
    service: 'Central Air Installation',
    verified: false
  },
  {
    id: 5,
    author: 'Amanda K.',
    location: 'Oakville',
    rating: 5,
    date: '2025-07-18',
    text: 'Had B.A.P install a heat pump for our home. The team was knowledgeable about the rebates and handled all the paperwork. System works beautifully and we are saving on heating and cooling costs. Excellent service from start to finish!',
    service: 'Heat Pump Installation',
    verified: true
  },
  {
    id: 6,
    author: 'Robert P.',
    location: 'Hamilton',
    rating: 5,
    date: '2025-06-25',
    text: 'B.A.P serviced our commercial HVAC system at our warehouse. They were punctual, efficient, and minimized disruption to our operations. Their maintenance plan is comprehensive and fairly priced. Will definitely use them again.',
    service: 'Commercial HVAC Maintenance',
    verified: true
  },
  {
    id: 7,
    author: 'Lisa W.',
    location: 'Guelph',
    rating: 5,
    date: '2025-05-12',
    text: 'Our boiler was leaking and B.A.P came out within an hour of our call. The technician was courteous, fixed the problem quickly, and even identified another small issue before it became major. Grateful for their 24/7 service!',
    service: 'Boiler Repair',
    verified: true
  },
  {
    id: 8,
    author: 'James H.',
    location: 'Waterloo',
    rating: 4,
    date: '2025-04-20',
    text: 'Tankless water heater installation went smoothly. B.A.P explained the pros and cons of different models and helped us choose the right size. Installation took longer than expected but the end result is great. Hot water on demand is amazing!',
    service: 'Tankless Water Heater Installation',
    verified: false
  },
  {
    id: 9,
    author: 'Patricia D.',
    location: 'Cambridge',
    rating: 5,
    date: '2025-03-15',
    text: 'Indoor air quality was a concern with our allergies. B.A.P recommended and installed a whole-home air purification system. The difference is noticeable - less dust, fresher air. Professional installation and great follow-up service.',
    service: 'Air Purifier Installation',
    verified: true
  },
  {
    id: 10,
    author: 'Mark S.',
    location: 'Brantford',
    rating: 5,
    date: '2025-02-28',
    text: 'Signed up for B.A.P annual maintenance plan. They came out for our furnace tune-up and were incredibly thorough. Found a small issue that could have been expensive down the road. The peace of mind is worth it!',
    service: 'Maintenance Plan',
    verified: true
  },
  {
    id: 11,
    author: 'Emily C.',
    location: 'Milton',
    rating: 5,
    date: '2025-01-10',
    text: 'Duct cleaning service was fantastic. The crew was respectful of our home, used protective coverings, and the difference in air flow is remarkable. They also identified some minor duct repairs that needed attention.',
    service: 'Duct Cleaning',
    verified: true
  },
  {
    id: 12,
    author: 'Thomas B.',
    location: 'Kitchener',
    rating: 4,
    date: '2024-12-18',
    text: 'Had B.A.P install a humidifier to combat the dry winter air. Installation was clean and professional. System works well and has made a noticeable difference in comfort. Would have appreciated more details on maintenance upfront.',
    service: 'Humidifier Installation',
    verified: false
  }
];

// Helper function to get testimonials by location
export function getTestimonialsByLocation(location: string): Testimonial[] {
  return testimonials.filter(t =>
    t.location.toLowerCase() === location.toLowerCase()
  );
}

// Helper function to get testimonials by service
export function getTestimonialsByService(service: string): Testimonial[] {
  return testimonials.filter(t =>
    t.service.toLowerCase().includes(service.toLowerCase())
  );
}

// Helper function to get top-rated testimonials
export function getTopTestimonials(count: number = 3): Testimonial[] {
  return testimonials
    .filter(t => t.rating === 5)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
