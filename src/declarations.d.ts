// declarations.d.ts
interface Window {
  google: any; // You can refine this type if you want to dive deep into Google Translate's API types, but 'any' is usually sufficient for this purpose.
  googleTranslateElementInit: () => void;
}