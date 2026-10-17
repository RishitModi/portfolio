export interface Certification {
  title: string;
  issuer: string;
  date: string;
  type?: string;
  credentialId?: string | null;
  file: string;
}

// Vite eager glob imports for certificates handling spaces and asset bundling
const dataPdfModules = import.meta.glob('./certificates/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const srcPdfModules = import.meta.glob('../certificates/*.pdf', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const pdfFileMap = new Map<string, string>();

for (const [filePath, url] of Object.entries({ ...srcPdfModules, ...dataPdfModules })) {
  const filename = filePath.split('/').pop();
  if (filename) {
    pdfFileMap.set(filename, url);
    pdfFileMap.set(filename.toLowerCase(), url);
  }
}

export function getCertificatePdfUrl(filename: string): string | undefined {
  if (pdfFileMap.has(filename)) {
    return pdfFileMap.get(filename);
  }
  if (pdfFileMap.has(filename.toLowerCase())) {
    return pdfFileMap.get(filename.toLowerCase());
  }

  // Handle potential comma/parenthesis formatting differences safely
  const withComma = filename.replace(/collectingest/i, 'collect,ingest');
  if (pdfFileMap.has(withComma)) return pdfFileMap.get(withComma);

  const withoutComma = filename.replace(/,/g, '');
  if (pdfFileMap.has(withoutComma)) return pdfFileMap.get(withoutComma);

  const withParen = filename.replace(/1\.pdf$/i, '(1).pdf');
  if (pdfFileMap.has(withParen)) return pdfFileMap.get(withParen);

  const withoutParen = filename.replace(/\s*\(\s*1\s*\)\.pdf$/i, ' 1.pdf');
  if (pdfFileMap.has(withoutParen)) return pdfFileMap.get(withoutParen);

  return undefined;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS ML Engineer Associate: Collect, Ingest, and Store Data',
    issuer: 'AWS Training & Certification',
    date: 'October 17, 2026',
    type: 'Completion Certificate',
    credentialId: null,
    file: 'AWS ML Engineer Associate - collectingest and store data.pdf',
  },
  {
    title: 'Google Cloud Gen AI Academy APAC 2026 (Cohort 2)',
    issuer: 'Google Cloud x Hack2skill',
    date: 'July 20, 2026',
    type: 'Completion Certificate',
    credentialId: '2026H2S07GCGENAIAPACC2-P01255',
    file: 'GoogleGenAIAcademy APAC Edition Cohort 2.pdf',
  },
  {
    title: 'Spring Boot: Mastering REST API Development',
    issuer: 'Code with Mosh',
    date: 'July 15, 2026',
    type: 'Completion Certificate',
    credentialId: 'cert_q0yx2xpm',
    file: 'certificate-of-completion-for-spring-boot-mastering-rest-api-development.pdf',
  },
  {
    title: 'DSA (Basics to Advanced)',
    issuer: 'TakeUForward (TUF)',
    date: 'July 7, 2026',
    type: 'Completion Certificate',
    credentialId: 'NN1A-mPbZoTCC',
    file: 'dsa cert.pdf',
  },
  {
    title: 'Spring Boot: Mastering the Fundamentals',
    issuer: 'Code with Mosh',
    date: 'February 21, 2026',
    type: 'Completion Certificate',
    credentialId: 'cert_j9d0zpx9',
    file: 'certificate-of-completion-for-spring-boot-mastering-the-fundamentals 1.pdf',
  },
  {
    title: 'Object Oriented Programming',
    issuer: 'TakeUForward (TUF)',
    date: 'January 26, 2026',
    type: 'Completion Certificate',
    credentialId: 'NN1A-DsaJbWN9',
    file: 'OOPs-JAVA.pdf',
  },
];
