
import type { Metadata } from "next";
import "./globals.css";
import Script from 'next/script';
import { ReduxProvider } from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Real Vista",
  description: "Real Vista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>

<Script id="gtranslate-init" strategy="afterInteractive">
  {`
    window.gtranslateSettings = {
      default_language: 'en',
      languages: [
        'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs',
        'bg', 'ca', 'ceb', 'zh-CN', 'zh-TW', 'co', 'hr', 'cs', 'da', 'nl',
        'en', 'eo', 'et', 'fi', 'fr', 'fy', 'gl', 'ka', 'de', 'el',
        'gu', 'ht', 'ha', 'haw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig',
        'id', 'ga', 'it', 'ja', 'jv', 'kn', 'kk', 'km', 'rw', 'ko',
        'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms',
        'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'ny', 'or',
        'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru', 'sm', 'gd', 'sr',
        'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw',
        'sv', 'tl', 'tg', 'ta', 'tt', 'te', 'th', 'tr', 'tk', 'uk',
        'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
      ]
    };
  `}
</Script>

<Script
  src="https://cdn.gtranslate.net/widgets/latest/float.js"
  strategy="afterInteractive"
/>
      </head>
      <ReduxProvider>
      <body
        className={`font-jakarta text-[0.8rem] `}
        >
           <div className="gtranslate_wrapper" style={{ padding: '10px' }} />
        {children}
       
      </body>
          </ReduxProvider>
        
    </html>
  );
}
