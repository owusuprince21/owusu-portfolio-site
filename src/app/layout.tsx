import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "../components/providers/ThemeProvider";
import { CursorFX } from "../components/effects/CursorFX";
import Loader from "@/components/ui/Loader";
import { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prince Owusu - Software Developer Portfolio",
  description:
    "Full-stack developer specializing in React, Next.js, and Django. Explore my projects and get in touch.",
  keywords: ["software developer", "full stack", "react", "nextjs", "django", "portfolio"],
  authors: [{ name: "Prince Owusu" }],
  openGraph: {
    title: "Prince Owusu - Software Developer Portfolio",
    description: "Full-stack developer specializing in React, Next.js, and Django.",
    url: "https://owusu.vercel.app",
    siteName: "Prince Owusu Portfolio",
    images: [
      {
        url: "/hero-img.jpg",
        width: 1200,
        height: 630,
        alt: "Prince Owusu - Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Owusu - Software Developer Portfolio",
    description: "Full-stack developer specializing in React, Next.js, and Django.",
    images: ["/hero-img.jpg"],
    creator: "@princeowusu",
  },
  robots: {
    index: true,
    follow: true
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CursorFX />
          <Loader />
          <Navbar />
          {children}
          <Toaster position="top-right" />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}