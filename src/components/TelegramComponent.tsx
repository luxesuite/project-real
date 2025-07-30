// components/TelegramFloatButton.tsx
import React from 'react';
import { FaTelegram } from 'react-icons/fa';
import Link from 'next/link';

const TelegramButton = () => {
  const telegramGroupLink = 'https://t.me/RealVista_Global_Wealth_Ltd';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div className="hidden md:flex items-center bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg animate-bounce">
        <span className="mr-2">Connect with us on telegram</span>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
      </div>
      
      <Link
        href={telegramGroupLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300"
        aria-label="Join our Telegram group"
        title="Join our Telegram group"
      >
        <FaTelegram className="text-2xl" />
      </Link>
    </div>
  );
};

export default TelegramButton;