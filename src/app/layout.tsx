import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/theme-provider";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/contexts/next-auth-provider";
import { ReactQueryProvider } from "@/contexts/react-query-provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "UpWrite",
  description: "Crie currículos, e-mails e muito mais de forma rápida e fácil",
};

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <ReactQueryProvider>
          <NextAuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
            <Toaster />
          </NextAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
