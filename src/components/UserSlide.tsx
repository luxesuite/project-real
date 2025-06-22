'use client';

import { useEffect, useRef } from 'react';
import { CiBellOn } from "react-icons/ci";
import gsap from 'gsap';

interface User {
  name: string;
  country: string;
  timeSpent: string; 
}

export default function UserSlider() {
  const users: User[] = [
    { name: 'John Smith', country: 'United States', timeSpent: '$532' },
    { name: 'Maria Garcia', country: 'Spain', timeSpent: '$513' },
    { name: 'Chen Wei', country: 'China', timeSpent: '$1258' },
    { name: 'Amina Mohammed', country: 'Nigeria', timeSpent: '$233' },
    { name: 'Jean Dupont', country: 'France', timeSpent: '$805' },
    { name: 'Sakura Tanaka', country: 'Japan', timeSpent: '$1243' },
    { name: 'Carlos Silva', country: 'Brazil', timeSpent: '$1856' },
    { name: 'Emma Johnson', country: 'Canada', timeSpent: '$577' }
  ];

  const bannerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  useEffect(() => {
    const banner = bannerRef.current;
    if (!banner) return;

    // Initial position (off-screen to the left)
    gsap.set(banner, { x: -300 });

    const animateBanner = () => {
      // Slide in
      gsap.to(banner, {
        x: 0,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => {
          if (banner) {
            banner.innerHTML = `
              <div class="bg-white text-primary p-2 rounded-r-lg shadow-sm min-w-64 flex items-center gap-x-2 justify-center">
                <svg class="w-4 h-4 stroke-primary fill-none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.93 6 11v5l-2 2v1h16v-1l-2-2z"/>
                </svg>
                <span class="font-bold">${users[currentIndex.current].name}</span>
                 <span class="">from ${users[currentIndex.current].country}</span>
                 <span class="=">just invested ${users[currentIndex.current].timeSpent}</span>
              </div>
            `;
          }
        }
      });

      // Slide out after 2 seconds (stays visible for 1.5s after animation)
      gsap.to(banner, {
        x: -300,
        duration: 0.5,
        delay: 1.5,
        ease: 'power2.in',
        onComplete: () => {
          currentIndex.current = (currentIndex.current + 1) % users.length;
          animateBanner(); // Repeat with next user
        }
      });
    };

    animateBanner();

    return () => {
      gsap.killTweensOf(banner);
    };
  }, []);

  return (
    <div 
      ref={bannerRef} 
      className="fixed top-[20%] left-0 transform -translate-y-1/2 z-50"
    />
  );
}