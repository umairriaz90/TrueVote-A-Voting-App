import { LucideProps } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import icons with no SSR to prevent hydration issues
export const Icons = {
  // Add your commonly used icons here
  User: dynamic(() => import('lucide-react').then((mod) => mod.User)),
  Mail: dynamic(() => import('lucide-react').then((mod) => mod.Mail)),
  Lock: dynamic(() => import('lucide-react').then((mod) => mod.Lock))
};
