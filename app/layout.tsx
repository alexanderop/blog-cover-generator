import './globals.css';
import './fonts.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { GlobalFonts } from '@/components/GlobalFonts';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevCover - Blog Cover Generator',
  description: 'Generate stunning blog covers for your tech articles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalFonts />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
