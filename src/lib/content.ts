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
  { label: 'About', id: 'about' },
  { label: 'Education', id: 'education' },
  { label: 'Experience', id: 'experience' },
  { label: 'Competitive Programming', id: 'competitive' },
  { label: 'Projects', id: 'projects' },
  { label: 'Certifications', id: 'certifications' },
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
  images?: { src: string; alt: string; caption?: string }[];
}

// Edit these entries; optional fields are hidden when omitted
export const EXPERIENCE_PROFESSIONAL: ExperienceEntry[] = [
  {
    id: 'handshake-ai',
    role: 'AI Evaluation Specialist',
    org: 'HandshakeAI',
    type: 'Part-time · Contract',
    period: 'Aug 2026 – Present',
    points: [
      'Developed complex, domain-specific prompts to test boundaries and reasoning limits of frontier Large Language Models (LLMs)',
      'Identified model hallucinations, bias, and reasoning gaps to deliver rigorous, structured qualitative feedback',
    ],
    tags: ['Large Language Models(LLM)', 'Prompt Engineering', 'Data Annotation', 'Model Evaluation', 'Research'],
    images: [
      {
        src: `${import.meta.env.BASE_URL}images/experience/handshake-ai-1.jpg`,
        alt: 'Certification issued by Handshake for the program (1 of 2)',
        caption: 'Handshake program certification',
      },
      {
        src: `${import.meta.env.BASE_URL}images/experience/handshake-ai-2.jpg`,
        alt: 'Certification issued by Handshake for the program (2 of 2)',
        caption: 'Handshake program certification',
      },
    ],
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
      'Personal wealth-management platform that profiles an investor with K-Means clustering, then builds a personalised allocation with a mean-variance optimiser using James-Stein-shrunk returns and reverse-optimised risk aversion. Prophet forecasts gold and Nifty prices with buy/hold/wait signals. Spring Boot API, FastAPI ML service and a React dashboard.',
    metric: 'K-Means risk profiling · MPT optimiser · Prophet forecasts',
    tags: ['React', 'Spring Boot', 'FastAPI', 'scikit-learn', 'SciPy', 'Prophet', 'PostgreSQL', 'Recharts', 'Docker'],
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
      'AI travel planner that turns preferences into validated day-by-day itineraries. A Spring Boot REST API runs a planner and validator Gemini pipeline over a rotating API-key pool with cooldowns and exponential backoff, streams Pexels images over SSE, caches on-demand activity alternatives, and shares trips through tokenised links. React frontend with drag-and-drop itinerary editing and Leaflet maps.',
    metric: 'Gemini LLM pipeline · SSE image streaming · Live deployment',
    tags: ['React', 'Tailwind', 'Spring Boot', 'PostgreSQL', 'Flyway', 'Docker', 'Gemini API', 'Leaflet'],
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
      'Cipher classification with an Energy-Based Transformer across AES, DES, SPECK32 and Vigenère, reaching 76% validation accuracy, plus a CNN side-channel model for DES key recovery that narrows the key to the top 4 candidates across 10,000 synthetic traces. Classical cryptanalysis (index of coincidence, Kasiski examination, frequency analysis) recovers Vigenère keys with no prior knowledge of key length.',
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
    title: 'Full-Stack E-Commerce Platform',
    category: 'FULL-STACK + NLP',
    description:
      'Microservice e-commerce app: a Spring Boot API with JWT access tokens and an httpOnly refresh cookie, role-based admin, Flyway migrations and Stripe Checkout with webhook order syncing, a React and TypeScript storefront with cart, orders and admin product management, and a FastAPI service serving a fine-tuned DistilRoBERTa model that classifies product-review sentiment. Orchestrated with Docker Compose.',
    metric: 'DistilRoBERTa sentiment · 82.8% accuracy · Stripe checkout',
    tags: ['React', 'TypeScript', 'Spring Boot', 'Spring Security', 'MySQL', 'FastAPI', 'DistilRoBERTa', 'Stripe', 'Docker'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/e-commerceBackend',
    videoSrc: `${import.meta.env.BASE_URL}images/ecommerce_demo.mp4`,
    imageSrc: null,
    iframeSrc: null,
  },
  {
    index: '06',
    title: 'Visual Semantic Encoder',
    category: 'IMAGE CAPTIONING',
    description:
      'Image-captioning model built from scratch in PyTorch. A five-layer CNN encoder turns each image into a 7×7 grid of region features, and an LSTM decoder with soft attention writes the caption one word at a time, looking at a different part of the image for each word. Trained on a 60K image–caption subset of MS COCO 2017 and evaluated with BLEU-1 and BLEU-4, with per-word attention heatmaps for interpretability.',
    metric: 'CNN encoder + LSTM decoder · Soft attention · Attention heatmaps',
    tags: ['PyTorch', 'CNN', 'LSTM', 'Attention', 'MS COCO', 'NLTK', 'Matplotlib'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/Visual-Semantic-Encoder',
    videoSrc: null,
    imageSrc: null,
    iframeSrc: null,
  },
  {
    index: '07',
    title: 'AlphaAgent: Equity Research AI',
    category: 'MULTI-AGENT AI · TEAM PROJECT',
    description:
      'Multi-agent equity-research platform for Indian specialty-chemicals companies, built with Team Ctrl+Alt+De-Dragon for DataHack 4.0. A LangGraph pipeline runs risk, financial-quality, management-credibility, industry-news and knowledge-graph agents, then a Bull and a Bear analyst argue opposing theses over the same data, with the Bear seeded with the Bull case. An Evidence Auditor resolves every cited claim against the pipeline state with JSONPath to flag untraceable ones, and financial ratios are computed deterministically rather than by the LLM. Hybrid retrieval fuses ChromaDB dense search, BM25 and a Neo4j knowledge graph with Reciprocal Rank Fusion.',
    metric: 'Bull vs Bear debate · Evidence auditor · Hybrid RAG (RRF)',
    tags: ['LangGraph', 'LangChain', 'Gemini', 'FastAPI', 'React', 'ChromaDB', 'Neo4j', 'SQLite', 'Python'],
    githubUrl: 'https://github.com/aryan-2206/Equity-Research-AI-Agent',
    liveUrl: null,
    videoSrc: null,
    imageSrc: null,
    iframeSrc: null,
  },
];

export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['PyTorch', 'TensorFlow', 'NumPy', 'Pandas'],
  },
  {
    category: 'Backend Technologies',
    skills: ['Spring Boot', 'Flask', 'RESTful APIs'],
  },
  {
    category: 'Developer Tools',
    skills: ['Git', 'Docker', 'Linux (Ubuntu)', 'IntelliJ IDEA', 'Postman'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'Supabase', 'PostgreSQL'],
  },
];
