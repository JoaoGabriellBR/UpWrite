import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/theme-provider';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';
import { NextAuthProvider } from "./providers";

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-sans'
});

const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-[100dvh] bg-background font-sans antialiased', fontSans.variable, fontHeading.variable)}
      >
        <NextAuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
