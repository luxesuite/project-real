"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdKeyboardArrowRight } from 'react-icons/md';

const PathsNavigator = () => {
  const path = usePathname();
  
  // Split the path and filter out empty segments
  const segments = path.split('/').filter(segment => segment !== '');
  
  // Build the breadcrumbs
  const breadcrumbs = segments.map((segment, index) => {
    // The route is the combination of all segments up to the current one
    const route = `/${segments.slice(0, index + 1).join('/')}`;
    const isLast = index === segments.length - 1;
    const isAccounts = segment === 'accounts';
    
    return (
      <span key={route} className="flex items-center">
        {isLast || isAccounts ? (
          <span className="text-gray-600 font-medium text-[0.9rem]">
            {segment}
          </span>
        ) : (
          <>
            <Link 
              href={route} 
              className="text-primary font-medium text-[0.9rem] hover:underline"
            >
              {segment}
            </Link>
          </>
        )}
        {!isLast && <MdKeyboardArrowRight className="mx-1 text-gray-500" />}
      </span>
    );
  });

  return (
    <div className="flex gap-x-2 items-center justify-center">
      {breadcrumbs}
    </div>
  );
};

export default PathsNavigator;