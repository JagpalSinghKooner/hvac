export interface FAQ {
  question: string;
  answer: string;
}

export interface ServiceFAQs {
  [serviceSlug: string]: FAQ[];
}

export const generalFAQs: FAQ[] = [
  {
    question: 'Do you offer 24/7 emergency service?',
    answer: 'Yes! We provide 24/7 emergency HVAC service across Southern Ontario with response typically within 60 minutes. Call us any time for urgent heating or cooling issues.'
  },
  {
    question: 'What areas do you service?',
    answer: 'We serve Guelph, Cambridge, Kitchener-Waterloo, Milton, Oakville-Burlington, Hamilton, Brantford, and surrounding areas in Southern Ontario. Contact us to confirm service in your specific location.'
  },
  {
    question: 'Do you offer free estimates?',
    answer: 'Yes, we provide free estimates for all installation and replacement projects. We also offer free diagnostics with any repair. Our pricing is always upfront with no hidden fees.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely. We are TSSA licensed (License #000076639116), fully insured, and WSIB covered. Our technicians are certified professionals with extensive training.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, cheque, credit cards, and debit. We also offer financing options through multiple providers to help make your HVAC investment more affordable.'
  },
  {
    question: 'Do you offer warranties on your work?',
    answer: 'Yes, we stand behind our work with a comprehensive 10-year warranty on parts and labour. We also honour all manufacturer warranties on equipment we install.'
  },
  {
    question: 'How long does a typical service call take?',
    answer: 'Most repairs take 1-2 hours. Installations vary from 4-8 hours for residential systems to several days for commercial projects. We will provide a time estimate during your consultation.'
  },
  {
    question: 'Do I need to be home during service?',
    answer: 'For safety and security reasons, we require someone 18 or older to be present during service calls. We are happy to work around your schedule to find a convenient time.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We ask for at least 24 hours notice for cancellations. For emergency service calls, please call us as soon as possible if you need to reschedule.'
  },
  {
    question: 'Do you help with rebate applications?',
    answer: 'Yes! We assist with all rebate paperwork for government and utility company programs. We will help you maximize available rebates on eligible high-efficiency equipment.'
  }
];

export const faqsByService: ServiceFAQs = {
  'furnace-installation': [
    {
      question: 'How long does a furnace installation take?',
      answer: 'Most residential furnace installations take 4-8 hours to complete. The exact time depends on the complexity of your home, ductwork modifications needed, and the type of furnace being installed.'
    },
    {
      question: 'What size furnace do I need for my home?',
      answer: 'Proper furnace sizing depends on your home square footage, insulation, windows, and other factors. Our technicians will perform a detailed heat loss calculation to determine the right size furnace for optimal efficiency and comfort.'
    },
    {
      question: 'Should I replace my furnace or repair it?',
      answer: 'Generally, if your furnace is over 15 years old and requires expensive repairs, replacement is more cost-effective. We will provide honest recommendations based on repair costs, energy efficiency, and your system age.'
    },
    {
      question: 'What is the most energy-efficient furnace?',
      answer: 'High-efficiency furnaces with AFUE ratings of 95% or higher are most efficient. Two-stage and modulating furnaces provide better comfort and efficiency than single-stage models. We can help you choose the right model for your needs and budget.'
    },
    {
      question: 'Will a new furnace lower my energy bills?',
      answer: 'Yes! Modern high-efficiency furnaces use 20-40% less energy than 15-year-old models. Many customers see significant savings on their monthly heating bills after installation.'
    },
    {
      question: 'Do you remove and dispose of my old furnace?',
      answer: 'Yes, furnace removal and disposal are included in our installation service. We handle all aspects of the installation, including safely removing your old equipment.'
    }
  ],
  'furnace-repair': [
    {
      question: 'How much does furnace repair cost?',
      answer: 'Furnace repair costs vary depending on the issue. Common repairs range from $150-$500. We provide free diagnostics and upfront pricing before any work begins, so you know exactly what to expect.'
    },
    {
      question: 'What are signs my furnace needs repair?',
      answer: 'Common signs include unusual noises, weak airflow, frequent cycling, yellow pilot light, increased energy bills, or uneven heating. If you notice any of these issues, schedule service right away to prevent bigger problems.'
    },
    {
      question: 'Can you repair any brand of furnace?',
      answer: 'Yes, our technicians are trained to service all major furnace brands and models, including older units. We stock common parts and can source specialized components quickly.'
    },
    {
      question: 'Do I need annual furnace maintenance?',
      answer: 'Annual maintenance is highly recommended to prevent breakdowns, maintain efficiency, and extend your furnace lifespan. Regular tune-ups catch small issues before they become expensive repairs.'
    },
    {
      question: 'How long will my furnace repair last?',
      answer: 'Quality repairs should last for years, depending on the component replaced. All our repairs are backed by our workmanship warranty, and we use high-quality parts for durability.'
    },
    {
      question: 'What if my furnace breaks down in the middle of the night?',
      answer: 'Call us any time! We offer 24/7 emergency furnace repair with typical response times of 60 minutes or less. We understand heating emergencies cannot wait until morning.'
    }
  ],
  'air-conditioner-installation': [
    {
      question: 'How long does AC installation take?',
      answer: 'Central air conditioner installation typically takes 6-10 hours for a complete system. Ductless mini-split installations are usually faster, taking 4-6 hours depending on the number of zones.'
    },
    {
      question: 'What SEER rating should I choose?',
      answer: 'Higher SEER ratings mean better efficiency. We recommend at least SEER 16 for Ontario climate. Units with SEER 18+ provide excellent efficiency and may qualify for rebates.'
    },
    {
      question: 'Can I install AC if I only have a furnace?',
      answer: 'Yes! If you have existing ductwork, we can add a central AC system to work with your furnace. For homes without ducts, ductless mini-split systems are an excellent option.'
    },
    {
      question: 'Do new AC units qualify for rebates?',
      answer: 'Many high-efficiency air conditioners qualify for rebates from government programs and local utilities. We will help you identify eligible rebates and handle all the paperwork.'
    },
    {
      question: 'How do I choose between central AC and a heat pump?',
      answer: 'Heat pumps provide both heating and cooling, making them more versatile and efficient year-round. If you only need cooling and have a good furnace, central AC may be more cost-effective. We can help you decide based on your needs.'
    },
    {
      question: 'What size air conditioner do I need?',
      answer: 'Proper sizing is critical for efficiency and comfort. We perform detailed cooling load calculations considering your home size, insulation, windows, and more to determine the right tonnage for your system.'
    }
  ],
  'air-conditioner-repair': [
    {
      question: 'Why is my air conditioner not cooling?',
      answer: 'Common causes include low refrigerant, dirty filters, frozen coils, faulty thermostat, or compressor issues. Our technicians will diagnose the exact problem and recommend the most cost-effective solution.'
    },
    {
      question: 'How often should I change my AC filter?',
      answer: 'Change standard 1-inch filters every 1-3 months during cooling season. Higher-quality filters may last longer. Regular filter changes improve efficiency, air quality, and prevent breakdowns.'
    },
    {
      question: 'Is it normal for my AC to freeze up?',
      answer: 'No, frozen coils indicate a problem - usually restricted airflow, low refrigerant, or blower issues. Turn off your system and call us immediately to prevent compressor damage.'
    },
    {
      question: 'Can low refrigerant damage my air conditioner?',
      answer: 'Yes, running with low refrigerant can damage your compressor, leading to expensive repairs or system replacement. If your AC is not cooling properly, schedule service right away.'
    },
    {
      question: 'How much does it cost to recharge AC refrigerant?',
      answer: 'Refrigerant recharge costs vary depending on system size and refrigerant type. However, AC systems should not need regular recharges - if refrigerant is low, there is likely a leak that needs repair.'
    },
    {
      question: 'Should I repair or replace my old air conditioner?',
      answer: 'If your AC is over 12-15 years old and needs major repairs, replacement is usually more cost-effective. New systems are much more efficient and reliable, potentially saving you money in the long run.'
    }
  ],
  'heat-pump': [
    {
      question: 'How does a heat pump work in winter?',
      answer: 'Heat pumps extract heat from outdoor air and transfer it inside, even in cold temperatures. Modern cold-climate heat pumps work efficiently down to -25°C or lower, providing reliable heating for Ontario winters.'
    },
    {
      question: 'Are heat pumps more efficient than furnaces?',
      answer: 'Yes, heat pumps can be 200-400% efficient, meaning they produce more heat energy than the electricity they consume. This makes them significantly more efficient than even high-efficiency furnaces.'
    },
    {
      question: 'Do heat pumps work in very cold weather?',
      answer: 'Modern cold-climate heat pumps work effectively in Ontario winters. For extremely cold days, many systems include backup electric or gas heating to maintain comfort.'
    },
    {
      question: 'What rebates are available for heat pumps?',
      answer: 'Heat pumps qualify for substantial federal and provincial rebates, often $4,000-$7,000 or more. We will help you navigate all available programs and maximize your rebates.'
    },
    {
      question: 'How much can I save with a heat pump?',
      answer: 'Most homeowners save 30-60% on heating and cooling costs with a heat pump. Exact savings depend on your current system, home size, and energy prices.'
    },
    {
      question: 'Can I keep my furnace and add a heat pump?',
      answer: 'Yes! Dual-fuel systems combine a heat pump with a furnace backup. The heat pump handles most heating, and the furnace kicks in only on the coldest days, maximizing efficiency and savings.'
    }
  ],
  'boiler': [
    {
      question: 'How long do boilers last?',
      answer: 'Well-maintained boilers typically last 15-25 years. Regular maintenance, water quality, and usage patterns all affect lifespan. If your boiler is approaching 20 years, consider replacement planning.'
    },
    {
      question: 'What is the most efficient type of boiler?',
      answer: 'Condensing boilers with AFUE ratings of 90% or higher are most efficient. Combi boilers that provide both heating and hot water can also be very efficient for the right home.'
    },
    {
      question: 'Why is my boiler leaking water?',
      answer: 'Boiler leaks can result from corrosion, pressure issues, faulty seals, or expansion tank problems. Leaks should be addressed immediately to prevent water damage and system failure. Call us right away if you notice leaking.'
    },
    {
      question: 'How often should boilers be serviced?',
      answer: 'Annual boiler maintenance is essential for safety, efficiency, and reliability. We recommend scheduling service before the heating season to catch any issues early.'
    },
    {
      question: 'What is the difference between a boiler and a furnace?',
      answer: 'Boilers heat water to provide radiant heating through radiators or in-floor systems. Furnaces heat air that is distributed through ducts. Boilers provide more comfortable, even heating but cost more to install.'
    },
    {
      question: 'Can I switch from a boiler to a furnace?',
      answer: 'Switching is possible but requires installing ductwork throughout your home, which can be expensive. For many homes with boilers, upgrading to a new high-efficiency boiler is more practical and cost-effective.'
    }
  ]
};

// Helper function to get FAQs for a service
export function getServiceFAQs(serviceSlug: string): FAQ[] {
  return faqsByService[serviceSlug] || generalFAQs;
}

// Helper function to get all FAQs (general + service-specific)
export function getAllFAQs(serviceSlug?: string): FAQ[] {
  if (serviceSlug && faqsByService[serviceSlug]) {
    return [...generalFAQs, ...faqsByService[serviceSlug]];
  }
  return generalFAQs;
}
