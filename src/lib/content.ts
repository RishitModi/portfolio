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
  resume: 'https://drive.google.com/file/d/1joVtyY-EzWICdjQlr7nsg22K1btSjlzN/view?usp=sharing',
  github: 'https://github.com/RishitModi',
  linkedin: 'https://linkedin.com/in/rishitmodii',
  leetcode: `https://leetcode.com/u/${HANDLES.leetcode}/`,
  codechef: `https://www.codechef.com/users/${HANDLES.codechef}`,
  codeforces: `https://codeforces.com/profile/${HANDLES.codeforces}`,
  email: 'mailto:modirishit6@gmail.com',
} as const;

// Update after contests. The hero shows the PEAK category; the Competitive section shows live/current numbers.
export const HERO_PEAKS = {
  leetcode: { category: 'Guardian', maxRating: 2142, currentRating: 2096, currentTier: 'Knight' },
  codechef: { stars: 3, maxRating: 1732, currentRating: 1685 },
  codeforces: { category: 'Specialist', maxRating: 1476, currentRating: 1359, currentTier: 'Pupil' },
} as const;

// problems solved on platforms without an API (e.g. GFG); added to the automatic total
export const EXTRA_SOLVED = 0;

// the hero never shows less than this
export const TOTAL_SOLVED_FLOOR = 1000;

// Skills that a project tag implies (e.g. a Spring Boot project is a Java project). Edit freely; skills with no matching project simply show no count.
export const SKILL_TAG_ALIASES: Record<string, string[]> = {
  Python: ['PyTorch', 'FastAPI', 'Flask', 'Scikit-learn', 'Pycryptodome', 'NLTK', 'SciPy', 'Prophet', 'LangGraph', 'LangChain', 'TensorFlow', 'HDBSCAN'],
  Java: ['Spring Boot', 'Spring Security', 'Java 23'],
  JavaScript: ['React'],
  SQL: ['PostgreSQL', 'MySQL', 'SQLite'],
  'REST APIs': ['Spring Boot'],
  Transformers: ['Transformer', 'DistilRoBERTa'],
};

// A project with any of these tags counts as an ML/DL project
export const ML_TAGS = ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Prophet', 'VAE', 'HDBSCAN', 'CNN', 'LSTM', 'DistilRoBERTa'];

// Extra rules that add projects to a skill on top of direct tag and alias matches. 'deployed' = the project has a liveUrl
export const SKILL_PROJECT_RULES: Record<string, { type: 'all' } | { type: 'deployed' } | { type: 'tagsAny'; tags: string[] }> = {
  Git: { type: 'all' },
  Supabase: { type: 'deployed' },
  NumPy: { type: 'tagsAny', tags: ML_TAGS },
  Pandas: { type: 'tagsAny', tags: ML_TAGS },
  'IntelliJ IDEA': { type: 'tagsAny', tags: ['Spring Boot'] },
  Postman: { type: 'tagsAny', tags: ['Spring Boot'] },
};

// Usage that isn't a project (e.g. competitive programming)
export const SKILL_EXTRA_USAGE: Record<string, { label: string; href: string }[]> = {
  'C++': [{ label: 'DSA problems', href: '#competitive' }],
};

export interface CpFallbackData {
  codechef: {
    rating: number;
    maxRating: number;
    stars: number;
    globalRank: number;
    countryRank?: number;
    solved: number;
    contests: number;
    updatedAt: string;
  };
  codeforces: {
    rating: number;
    maxRating: number;
    rank: string;
    maxRank: string;
    solved: number | null;
    contests: number;
    history?: number[];
    updatedAt: string;
  };
}

// Snapshot of 2026-11-05; the deploy-time stats job overrides these when it succeeds.
export const CODECHEF_STATS = {
  rating: 1685,
  maxRating: 1732,
  stars: 3,
  globalRank: 8274,
  countryRank: 7577,
  solved: 570,
  contests: 25,
  updatedAt: '2026-11-05',
};

export const LEETCODE_FALLBACK_UPDATED_AT = '2026-11-05';

export const CP_FALLBACK: CpFallbackData = {
  codechef: CODECHEF_STATS,
  // Snapshot of 2026-11-05; the deploy-time stats job overrides these when it succeeds.
  codeforces: {
    rating: 1359,
    maxRating: 1476,
    rank: 'pupil',
    maxRank: 'specialist',
    solved: 117,
    contests: 10,
    history: [462, 865, 1150, 1256, 1379, 1476, 1430, 1375, 1346, 1359],
    updatedAt: '2026-11-05',
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
  summary: string;
  highlights: string[];
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
    title: 'Visual Semantic Encoder',
    category: 'IMAGE CAPTIONING',
    summary:
      'PyTorch image-captioning model generating word-by-word descriptions with visual soft attention from scratch.',
    highlights: [
      'Problem: Translating raw visual features into coherent sequential text captions while maintaining spatial context.',
      'Approach: Built a five-layer CNN encoder producing 7×7 region feature grids and an LSTM decoder with soft attention.',
      'Result: Trained on 60K MS COCO 2017 subset, evaluated with BLEU-1/BLEU-4, and visualised via per-word attention heatmaps.',
    ],
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
    index: '02',
    title: 'Voyexa',
    category: 'AI TRAVEL COMPANION',
    summary:
      'AI travel planner generating validated day-by-day itineraries with real-time streaming and interactive map editing.',
    highlights: [
      'Problem: Turning freeform travel preferences into reliable, validated multi-day itineraries without hitting LLM rate limits.',
      'Approach: Engineered a Spring Boot Gemini pipeline with rotating key pools, cooldowns, exponential backoff, and SSE image streaming.',
      'Result: Delivered interactive React UI with drag-and-drop editing, Leaflet maps, cached alternatives, and tokenised trip sharing.',
    ],
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
    title: 'Full-Stack E-Commerce Platform',
    category: 'FULL-STACK + NLP',
    summary:
      'Dockerized microservice storefront pairing secure Spring Boot commerce with FastAPI DistilRoBERTa review sentiment analysis.',
    highlights: [
      'Problem: Building a secure microservice e-commerce architecture integrating real-time payment handling and review sentiment intelligence.',
      'Approach: Developed Spring Boot JWT auth with httpOnly refresh cookies, Stripe webhooks, Flyway migrations, and React storefront.',
      'Result: Served fine-tuned DistilRoBERTa model via FastAPI classifying review sentiment at 82.8% accuracy under Docker Compose.',
    ],
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
    index: '04',
    title: 'AlphaAgent: Equity Research AI',
    category: 'MULTI-AGENT AI · TEAM PROJECT',
    summary:
      'Multi-agent equity research platform running adversarial analyst debates and verifiable hybrid RAG for Indian specialty chemicals.',
    highlights: [
      'Problem: Eliminating hallucinations in equity research while evaluating specialty-chemicals firms from opposing market viewpoints.',
      'Approach: Built LangGraph pipeline with specialized domain agents, adversarial Bull vs Bear debate, and deterministic ratio calculations.',
      'Result: Audited claims via JSONPath and fused ChromaDB, BM25, and Neo4j knowledge graphs using Reciprocal Rank Fusion.',
    ],
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
  {
    index: '05',
    title: 'Energy-based & Neurosymbolic Cryptanalysis',
    category: 'ML RESEARCH',
    summary:
      'Machine learning research applying Energy-Based Transformers, CNNs, and classical cryptanalysis to cipher classification and key recovery.',
    highlights: [
      'Problem: Classifying block and stream ciphers and recovering cryptographic keys without prior knowledge of key lengths.',
      'Approach: Combined Energy-Based Transformers, CNN side-channel power trace analysis, and classical methods like Kasiski examination and frequency analysis.',
      'Result: Achieved 76% cipher classification accuracy and narrowed DES keys to top 4 candidates across 10,000 synthetic traces.',
    ],
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
    index: '06',
    title: 'eDNA Analyser',
    category: 'BIODIVERSITY ML',
    summary:
      'Automated environmental DNA analysis pipeline using Variational Autoencoders for species clustering and biodiversity assessment.',
    highlights: [
      'Engineered a VAE and HDBSCAN unsupervised pipeline for genetic sequence clustering and biodiversity assessment.',
      'Deployed an interactive Flask web interface with dynamic visualizations and scikit-learn analytics.',
    ],
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
    index: '07',
    title: 'Wealthio',
    category: 'ACTIVE PROJECT',
    summary:
      'Personal wealth-management platform featuring K-Means risk profiling, MPT portfolio optimisation, and Prophet price forecasting.',
    highlights: [
      'Problem: Personalising asset allocation dynamically while accounting for investor risk tolerance and volatile asset returns.',
      'Approach: Combined K-Means clustering with James-Stein-shrunk returns and reverse-optimised risk aversion in a mean-variance optimiser.',
      'Result: Delivered Prophet gold and Nifty price forecasts with buy/hold/wait signals across Spring Boot, FastAPI, and React.',
    ],
    description:
      'Personal wealth-management platform that profiles an investor with K-Means clustering, then builds a personalised allocation with a mean-variance optimiser using James-Stein-shrunk returns and reverse-optimised risk aversion. Prophet forecasts gold and Nifty prices with buy/hold/wait signals. Spring Boot API, FastAPI ML service and a React dashboard.',
    metric: 'K-Means risk profiling · MPT optimiser · Prophet forecasts',
    tags: ['React', 'Spring Boot', 'FastAPI', 'scikit-learn', 'SciPy', 'Prophet', 'PostgreSQL', 'Recharts', 'Docker'],
    liveUrl: null,
    githubUrl: 'https://github.com/RishitModi/Wealthio',
    videoSrc: null,
    imageSrc: null,
    iframeSrc: null,
  },
];

export interface SkillCategory {
  category: string;
  skills: (string | { name: string; isPrimary?: boolean })[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Java', 'Python', 'C++', 'SQL', 'JavaScript', 'HTML/CSS'],
  },
  {
    category: 'AI / ML',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'NumPy', 'Pandas'],
  },
  {
    category: 'Backend & Frameworks',
    skills: ['Spring Boot', 'React', 'Node.js', 'Flask', 'REST APIs', 'Tailwind'],
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase'],
  },
  {
    category: 'Developer Tools',
    skills: [
      { name: 'Docker', isPrimary: true },
      'Git',
      'Linux',
      'IntelliJ IDEA',
      'Postman',
    ],
  },
];
