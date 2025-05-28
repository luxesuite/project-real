
export interface Language {
  code: string;
  name: string;
  flag: string;
}

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}