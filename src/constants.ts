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
    "Enzyme Wash", "Vintage / Aged Wash", "Acid Wash", "Indigo Wash", 
    "Silicone Softener Wash", "PP Spray", "CPD & Localized Effects"
  ],
  dyeing: [
    "Pigment Dyeing", "Reactive Dyeing", "Direct Dyeing", 
    "Tie-Dye & Dip-Dye", "Burnout Dyeing", "Pigment Chalk Method"
  ],
  technical: [
    "Textile Dyeing Process", "Textile Finishing Process", "Fabric Development",
    "Machine Troubleshooting", "Chemical Selection & Optimization",
    "Machine Operation", "Rejection & Rework Control", "Buyer Compliance Handling"
  ]
};

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
