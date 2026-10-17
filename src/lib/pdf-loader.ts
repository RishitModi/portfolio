import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

let pdfjsModule: typeof import('pdfjs-dist') | null = null;
let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

export async function getPdfjs(): Promise<typeof import('pdfjs-dist')> {
  if (pdfjsModule) {
    return pdfjsModule;
  }
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      const pdfjs = await import('pdfjs-dist');
      if (!pdfjs.GlobalWorkerOptions.workerSrc) {
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
      }
      pdfjsModule = pdfjs;
      return pdfjs;
    })();
  }
  return pdfjsPromise;
}

// Global cache for rendered canvas previews (pdfUrl -> dataUrl)
const previewCache = new Map<string, string>();

export function getCachedPreview(url: string): string | undefined {
  return previewCache.get(url);
}

export function setCachedPreview(url: string, dataUrl: string): void {
  previewCache.set(url, dataUrl);
}
