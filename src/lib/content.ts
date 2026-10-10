export interface Profile {
  name: string;
  email: string;
  location: string;
  year: number;
}

export const PROFILE: Profile = {
  name: 'Rishit Modi',
  email: 'modirishit6@gmail.com',
  location: 'Mumbai, IN',
  year: 2026,
} as const;

export const HANDLES = {
  leetcode: 'modeiji09',
  codechef: 'rishitmodeiji',
  codeforces: 'rishitmodi',
} as const;

export const LEETCODE_USERNAME = HANDLES.leetcode;

export const LINKS = {
  resume: 'https://drive.google.com/file/d/1dujS7VBswnAi-Rb2ICW0JK79Y9O_yfnF/view?usp=sharing',
  github: 'https://github.com/RishitModi',
  linkedin: 'https://linkedin.com/in/rishitmodii',
  leetcode: `https://leetcode.com/u/${HANDLES.leetcode}/`,
  codechef: `https://www.codechef.com/users/${HANDLES.codechef}`,
  codeforces: `https://codeforces.com/profile/${HANDLES.codeforces}`,
  email: 'mailto:modirishit6@gmail.com',
} as const;

export interface CpFallbackData {
  codechef: {
    rating: number;
    maxRating: number;
    stars: number;
    globalRank: number;
    solved: number;
    contests: number;
    updatedAt: string;
  };
  codeforces: {
    rating: number;
    maxRating: number;
    rank: string;
    solved: number | null;
    contests: number;
    updatedAt: string;
  };
}

// Update both the stats and updatedAt together whenever CodeChef numbers change.
export const CODECHEF_STATS = {
  rating: 1732,
  maxRating: 1732,
  stars: 3,
  globalRank: 6153,
  solved: 561,
  contests: 22,
  updatedAt: '2026-10-09',
};

export const LEETCODE_FALLBACK_UPDATED_AT = '2026-10-09';

export const CP_FALLBACK: CpFallbackData = {
  codechef: CODECHEF_STATS,
  codeforces: {
    rating: 1377,
    maxRating: 1377,
    rank: 'pupil',
    solved: null,
    contests: 5,
    updatedAt: '2026-10-09',
  },
};

export const NAV_ITEMS = [
  { label: 'Profile', id: 'profile' },
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Experience', id: 'experience' },
  { label: 'Competitive Programming', id: 'competitive' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]['id'];

export interface EducationStage {
  id: string;
  stage: 'School' | 'College' | 'University';
  institution: string;
  qualification?: string;
  period?: string;
  location?: string;
  highlights?: string[];
  tags?: string[];
  current?: boolean;
}

// Edit these entries; optional fields are hidden when omitted
export const EDUCATION: EducationStage[] = [
  {
    id: 'school-1',
    stage: 'School',
    institution: 'Witty International School',
    period: '2006 – 2015',
  },
  {
    id: 'school-2',
    stage: 'School',
    institution: 'Dr S Radhakrishnan International School',
    qualification: 'Class 10',
    period: '2015 – 2022',
    highlights: ['10th: 95.33%'],
  },
  {
    id: 'college',
    stage: 'College',
    institution: 'Prakash College of Commerce and Science',
    qualification: 'HSC (Class 12)',
    location: 'Kandivali, Mumbai',
    period: '2022 – 2024',
    highlights: [
      'HSC 2024: 90.67%',
      'MHT-CET 2024: 99.97 percentile',
      'JEE Main: 92.4 percentile',
    ],
  },
  {
    id: 'university',
    stage: 'University',
    institution: 'Veermata Jijabai Technological Institute (VJTI)',
    qualification: 'B.Tech, Computer Engineering (Minor in Cybersecurity)',
    location: 'Matunga, Mumbai',
    period: '2024 – 2028',
    current: true,
    highlights: ['CGPA: 7.69', 'Top 0.03% nationally via MHT-CET'],
    tags: [
      'Data Structures',
      'Operating Systems',
      'Design and Analysis of Algorithms',
      'Deep Learning',
      'Cybersecurity',
      'Database Management Systems',
    ],
  },
];

export interface ExperienceEntry {
  id: string;
  role: string;
  org: string;
  type?: string;
  period?: string;
  points?: string[];
  tags?: string[];
  link?: string;
}

// Edit these entries; optional fields are hidden when omitted
// TODO: add period (e.g. 'Mar 2026 – Present') and 2-3 bullet points
export const EXPERIENCE_PROFESSIONAL: ExperienceEntry[] = [
  {
    id: 'handshake-ai',
    role: 'AI Evaluation Specialist',
    org: 'HandshakeAI',
    type: 'Part-time · Contract',
    tags: ['AI Evaluation'],
  },
];

// Edit these entries; optional fields are hidden when omitted
export const EXPERIENCE_COLLEGE: ExperienceEntry[] = [
  {
    id: 'projectx',
    role: 'AI/ML Mentor',
    org: 'Project X, VJTI',
    period: 'Jul 2025 – Present',
    points: [
      'Mentored 200+ juniors in AI/ML prototyping',
      'Conducted hands-on Git and Python workshops',
    ],
    tags: ['Mentorship', 'AI/ML', 'Git', 'Python'],
  },
  {
    id: 'hacktoberfest',
    role: 'Open-source Contributor',
    org: 'Hacktoberfest 2025 · Open Source Contribution Program',
    period: 'Oct 2025',
    points: [
      'Contributed 6+ merged PRs to open-source repositories, including a Vigenère cipher tool built in Python',
    ],
    tags: ['Open Source', 'GitHub', 'Python'],
  },
  {
    id: 'pratibimb',
    role: 'Department Coordinator',
    org: 'Pratibimb, Cultural Committee at VJTI',
    period: 'Oct 2024 – Present',
    points: [
      'Coordinated logistics and promotions for Pratibimb VJTI, driving student participation across university-wide events',
    ],
    tags: ['Leadership', 'Events'],
  },
];

export interface ProjectItem {
  index: string;
  title: string;
  category: string;
  description: string;
  metric: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  videoSrc: string | null;
  imageSrc: string | null;
  iframeSrc: string | null;
}

export type Project = ProjectItem;

export const PROJECTS: ProjectItem[] = [
  {
    index: '01',
    title: 'Wealthio',
    category: 'ACTIVE PROJECT',
    description:
      'A comprehensive personal wealth management platform integrating real-time market data with machine learning to offer tailored financial insights, risk profiling, and predictive forecasting.',
    metric: 'Microservices · AI Risk Profiling',
    tags: ['React', 'Spring Boot', 'FastAPI', 'scikit-learn', 'Prophet', 'Recharts'],
    liveUrl: 'https://wealthio-eight.vercel.app',
    githubUrl: 'https://github.com/RishitModi/Wealthio',
    videoSrc: null,
    imageSrc: null,
    iframeSrc: null,
  },
  {
    index: '02',
    title: 'Voyexa',
    category: 'AI TRAVEL COMPANION',
    description:
      'AI-powered travel companion using Gemini 1.5 Flash for intelligent itinerary generation. Full-stack app with React frontend, Spring Boot backend, and PostgreSQL for user data persistence.',
    metric: 'Gemini 1.5 integration · Live deployment',
    tags: ['React', 'Tailwind', 'Spring Boot', 'PostgreSQL', 'Gemini 1.5', 'Geoapify'],
    liveUrl: 'https://voyexa.vercel.app',
    githubUrl: 'https://github.com/RishitModi/Voyexa',
    videoSrc: `${import.meta.env.BASE_URL}images/voyexa_demo.webm`,
    imageSrc: null,
    iframeSrc: null,
  },
  {
    index: '03',
    title: 'eDNA Analyser',
    category: 'BIODIVERSITY ML',
    description:
      'Automated environmental DNA analysis pipeline using Variational Autoencoders for species clustering and biodiversity assessment. Flask-based web interface with interactive visualizations.',
    metric: 'VAE clustering · HDBSCAN · Real-time viz',
    tags: ['Flask', 'TensorFlow', 'VAE', 'HDBSCAN', 'Chart.js', 'Scikit-learn'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/eDNA-Analyser',
    videoSrc: `${import.meta.env.BASE_URL}images/edna_demo.webm`,
    imageSrc: null,
    iframeSrc: null,
  },
  {
    index: '04',
    title: 'Energy-based & Neurosymbolic Cryptanalysis',
    category: 'ML RESEARCH',
    description:
      'Novel approach to cipher classification using Energy-Based Transformers and side-channel analysis. Achieved 76% validation accuracy across multiple cipher families with deep learning architectures.',
    metric: '76% validation accuracy · 10K SCA traces',
    tags: ['PyTorch', 'Pycryptodome', 'CNN', 'Transformer', 'Side-Channel'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/Cryptanalysis',
    videoSrc: null,
    imageSrc: null,
    iframeSrc: 'https://anuushkay.github.io/Cryptanalysis_Documentation/',
  },
  {
    index: '05',
    title: 'Enterprise E-Commerce API',
    category: 'BACKEND ARCHITECTURE',
    description:
      'Production-ready backend system for a scalable e-commerce platform. Engineered with modern Java and Spring Boot, featuring secure JWT authentication with RBAC, automated Flyway migrations, and a complete order processing pipeline.',
    metric: 'Scalable Architecture · JWT Security',
    tags: ['Java 23', 'Spring Boot', 'Spring Security', 'MySQL', 'JWT'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/e-commerceBackend',
    videoSrc: null,
    imageSrc: null,
    iframeSrc: null,
  },
];

export interface AboutBlock {
  category: string;
  description: string;
  tags: string[];
}

export const ABOUT_BLOCKS: AboutBlock[] = [
  {
    category: 'AI & Deep Learning',
    description: 'Building intelligent systems with state-of-the-art architectures',
    tags: ['PyTorch', 'TensorFlow', 'VAE', 'CNN', 'Transformers'],
  },
  {
    category: 'Full-Stack Engineering',
    description: 'End-to-end product development from APIs to polished interfaces',
    tags: ['React', 'Spring Boot', 'Node.js', 'PostgreSQL', 'REST'],
  },
  {
    category: 'Cybersecurity',
    description: 'Applied cryptography and security analysis',
    tags: ['Cryptanalysis', 'AES/DES', 'Side-Channel', 'Pycryptodome'],
  },
];

export interface SkillCategory {
  category: string;
  skills: { name: string; isPrimary: boolean }[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', isPrimary: true },
      { name: 'Java', isPrimary: false },
      { name: 'C++', isPrimary: true },
      { name: 'JavaScript', isPrimary: false },
      { name: 'TypeScript', isPrimary: false },
      { name: 'SQL', isPrimary: false },
    ],
  },
  {
    category: 'AI / ML',
    skills: [
      { name: 'PyTorch', isPrimary: true },
      { name: 'TensorFlow', isPrimary: false },
      { name: 'Scikit-learn', isPrimary: false },
      { name: 'Transformers', isPrimary: false },
      { name: 'CNN', isPrimary: false },
      { name: 'VAE', isPrimary: false },
      { name: 'HDBSCAN', isPrimary: false },
    ],
  },
  {
    category: 'Backend & Frameworks',
    skills: [
      { name: 'Spring Boot', isPrimary: true },
      { name: 'React', isPrimary: true },
      { name: 'Node.js', isPrimary: false },
      { name: 'Flask', isPrimary: false },
      { name: 'REST APIs', isPrimary: false },
      { name: 'Tailwind', isPrimary: false },
    ],
  },
  {
    category: 'Databases & DevOps',
    skills: [
      { name: 'Docker', isPrimary: true },
      { name: 'PostgreSQL', isPrimary: false },
      { name: 'MongoDB', isPrimary: false },
      { name: 'Git', isPrimary: false },
      { name: 'Linux', isPrimary: false },
    ],
  },
];
