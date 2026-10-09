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
  };
  codeforces: {
    rating: number;
    maxRating: number;
    rank: string;
    solved: number | null;
    contests: number;
  };
}

export const CP_FALLBACK: CpFallbackData = {
  codechef: {
    rating: 1732,
    maxRating: 1732,
    stars: 3,
    globalRank: 6153,
    solved: 561,
    contests: 22,
  },
  codeforces: {
    rating: 1377,
    maxRating: 1377,
    rank: 'pupil',
    solved: null,
    contests: 5,
  },
};

export const NAV_ITEMS = [
  { label: 'Profile', id: 'profile' },
  { label: 'About', id: 'about' },
  { label: 'Competitive Programming', id: 'competitive' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
] as const;

export type NavId = (typeof NAV_ITEMS)[number]['id'];

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
