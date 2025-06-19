// components/SponsorMarquee.tsx
"use client";

import Image from "next/image";

const sponsors = [
  "/aba.jpg",
  "/amret.jpg",
  "/bitcoin.jpg",
  "/citibank.jpg",
  "/ftb.jpg",
  "/paypal.jpg",
  "/shinhan.jpg",
  "/wells.jpg",
  "/western.jpg",
  "/wing.jpg",

];

export default function Sponsors() {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-white py-4">
      <div className="animate-marquee inline-flex gap-8 gap-x-16">
        {[...sponsors, ...sponsors].map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Sponsor ${i + 1}`}
            width={80}
            height={30}
            className="object-contain"
          />
        ))}
      </div>
    </div>
  );
}
