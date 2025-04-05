import { Inter, Poppins } from 'next/font/google';

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'block',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'block',
  fallback: ['system-ui', 'sans-serif'],
  preload: false,
}); 