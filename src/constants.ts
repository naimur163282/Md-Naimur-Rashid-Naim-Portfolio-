export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  responsibilities: string[];
  milestones?: { date: string; title: string; description: string }[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  result?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  skills?: string[];
  link?: string;
  logoUrl?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Sustainable Dyeing of Cellulosic Fibres with Reactive Dyes",
    issuer: "Society of Dyers and Colourists (SDC)",
    issueDate: "2024",
    credentialId: "SDC-SDCF-2024-001",
    skills: ["Sustainable Dyeing", "Reactive Dyes", "Cellulosic Fibres"],
    logoUrl: "https://picsum.photos/seed/sdc/100/100"
  },
  {
    title: "Textile Care Labelling",
    issuer: "Society of Dyers and Colourists (SDC)",
    issueDate: "2023",
    credentialId: "SDC-TCL-2023-042",
    skills: ["Quality Control", "Compliance", "Labelling"],
    logoUrl: "https://picsum.photos/seed/sdc2/100/100"
  },
  {
    title: "Critical Thinking",
    issuer: "University of Cambridge",
    issueDate: "2023",
    credentialId: "CAM-CT-2023-991",
    skills: ["Problem Solving", "Analytical Skills"],
    logoUrl: "https://picsum.photos/seed/cambridge/100/100"
  },
  {
    title: "Colour Management for Print Designers and Printers",
    issuer: "Society of Dyers and Colourists (SDC)",
    issueDate: "2023",
    skills: ["Colour Management", "Printing"],
    logoUrl: "https://picsum.photos/seed/sdc3/100/100"
  },
  {
    title: "Principles of Printed Textiles",
    issuer: "Society of Dyers and Colourists (SDC)",
    issueDate: "2022",
    skills: ["Textile Printing", "Design Principles"],
    logoUrl: "https://picsum.photos/seed/sdc4/100/100"
  }
];

export const SKILLS: Skill[] = [
  { name: "Garment Washing", level: 95 },
  { name: "Sustainable Dyeing", level: 90 },
  { name: "Process Optimization", level: 85 },
  { name: "Technical Problem Solving", level: 92 },
  { name: "Production Planning", level: 88 },
];

export const EXPERTISE = {
  washing: [
    { name: "Enzyme Wash", desc: "Bio-polishing for soft handle and clean surface." },
    { name: "Vintage / Aged Wash", desc: "Creating authentic worn-in looks through stone and chemical abrasion." },
    { name: "Acid Wash", desc: "High-contrast marble effects using potassium permanganate soaked stones." },
    { name: "Indigo Wash", desc: "Specialized processing for indigo-dyed garments to achieve desired shades." },
    { name: "Silicone Softener Wash", desc: "Enhancing fabric hand-feel and drape with premium silicone emulsions." },
    { name: "PP Spray", desc: "Localized brightening and fading effects using potassium permanganate." },
    { name: "CPD & Localized Effects", desc: "Cold Pigment Dyeing and manual localized abrasion for unique fashion looks." }
  ],
  dyeing: [
    { name: "Dip Dyeing", desc: "Creating beautiful gradient color transitions on fabrics.", effect: "gradient" },
    { name: "Tie Dyeing", desc: "Manual binding and dyeing for unique, organic patterns.", effect: "pattern" },
    { name: "Denim Washing", desc: "Transforming raw denim into fashion-forward pieces.", effect: "transformation" },
    { name: "Pigment Dyeing", desc: "Achieving vintage, washed-out looks with pigment colors." },
    { name: "Reactive Dyeing", desc: "High-fastness dyeing for vibrant and durable colors." }
  ],
  technical: [
    "Textile Dyeing Process", "Textile Finishing Process", "Fabric Development",
    "Machine Troubleshooting", "Chemical Selection & Optimization",
    "Machine Operation", "Rejection & Rework Control", "Buyer Compliance Handling"
  ]
};

export const RD_PROJECT = {
  title: "Industrial-Scale Natural Mordant Development",
  certification: "BUET Certified",
  summary: "A pioneering research project focused on replacing synthetic chemical mordants with sustainable natural alternatives in industrial textile dyeing.",
  timeline: [
    { date: "2021 Q3", title: "Research Initiation", desc: "Identification of potential natural sources for mordants." },
    { date: "2022 Q1", title: "Lab Testing", desc: "Testing color fastness and affinity on various cellulosic fibers." },
    { date: "2022 Q4", title: "Pilot Production", desc: "Scaling up to 50kg batches in a controlled environment." },
    { date: "2023 Q2", title: "Industrial Implementation", desc: "Full-scale production integration at Anowara Knit Composite." },
    { date: "2023 Q4", title: "BUET Certification", desc: "Official validation of results and sustainability impact." }
  ],
  phases: [
    {
      title: "Research Phase",
      content: "Extensive literature review and sourcing of natural ingredients like pomegranate peel, myrobalan, and alum alternatives. Focused on eco-toxicity and availability."
    },
    {
      title: "Development Phase",
      content: "Optimization of extraction methods and application temperatures. Developed a standardized 'Natural Mordant Recipe' compatible with existing industrial machinery."
    },
    {
      title: "Implementation Phase",
      content: "Successfully replaced 65% of synthetic mordants in reactive dyeing processes. Achieved 35% reduction in overall chemical costs and significantly improved effluent quality."
    }
  ],
  impact: [
    { name: 'Natural Mordant Use', value: 65, color: '#D4AF37' },
    { name: 'Synthetic Reduction', value: 35, color: '#10B981' }
  ]
};

export const WASH_DEMOS = [
  {
    id: 'dip-dye',
    title: 'Dip Dyeing',
    subtitle: 'Gradient Transitions',
    imageBefore: 'https://picsum.photos/seed/dip-before/800/600',
    imageAfter: 'https://picsum.photos/seed/dip-after/800/600',
    description: 'A visual demonstration of gradient color transitions on fabrics. Hover to see the transformation from raw fabric to a beautiful dip-dyed gradient.'
  },
  {
    id: 'tie-dye',
    title: 'Tie Dyeing',
    subtitle: 'Organic Patterns',
    imageBefore: 'https://picsum.photos/seed/tie-before/800/600',
    imageAfter: 'https://picsum.photos/seed/tie-after/800/600',
    description: 'Showcasing the tie-dyeing effect with dynamic patterns. Manual binding creates unique, non-repeatable designs that define modern sustainable fashion.'
  },
  {
    id: 'denim-wash',
    title: 'Denim Washing',
    subtitle: 'Industrial Transformation',
    imageBefore: 'https://picsum.photos/seed/denim-before/800/600',
    imageAfter: 'https://picsum.photos/seed/denim-after/800/600',
    description: 'Transforming raw denim into fashion-forward pieces through stone wash, bleach effects, and localized abrasion.'
  }
];

export const WORK_EXPERIENCE: Experience[] = [
  {
    company: "Fakir Apparels Ltd.",
    role: "Executive – Washing",
    period: "Nov 8, 2025 – Present",
    responsibilities: [
      "Overseeing industrial washing processes",
      "Implementing sustainable wet processing techniques",
      "Optimizing production efficiency and quality control",
      "Managing technical troubleshooting for washing machinery"
    ]
  },
  {
    company: "Blue Creations Limited",
    role: "Denim Washing Executive – Production (Buyer Responsible – GAP)",
    period: "Aug 16, 2022 – Nov 8, 2025",
    responsibilities: [
      "Led production for major global buyer (GAP)",
      "Managed denim washing operations and quality compliance",
      "Coordinated with R&D for new wash development",
      "Ensured timely delivery and rejection control"
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Post Graduate Diploma in Garments Business",
    institution: "IBA, Dhaka University",
    year: "Enrolled – 2026"
  },
  {
    degree: "BSc in Textile Engineering – Wet Processing",
    institution: "BGMEA University of Fashion & Technology",
    year: "2023",
    result: "CGPA 3.6/4.00"
  },
  {
    degree: "HSC – Science",
    institution: "Bangladesh Navy College",
    year: "2018",
    result: "CGPA 4.92/5.00"
  },
  {
    degree: "SSC – Science",
    institution: "Bangladesh Navy School & College",
    year: "2016",
    result: "CGPA 5.00/5.00"
  }
];

export const LANGUAGES = [
  { name: "Bangla", level: 100 },
  { name: "English", level: 85 }
];

export const REFERENCES = [
  {
    name: "Md. Shahabuddin",
    role: "Assistant Manager, Anowara Knit Composite Ltd.",
    phone: "01754571864",
    email: "shahabuddinmon1441@gmail.com"
  },
  {
    name: "Md Raijul Islam",
    role: "Lecturer, BGMEA University of Fashion Technology",
    phone: "01841129449",
    email: "raijul@buft.edu.bd"
  }
];
