import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nitindeep Singh | Full Stack Developer & Software Engineer",
  description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Building scalable web applications with modern technologies and best practices.",
  keywords: ["Full Stack Developer", "Software Engineer", "React Developer", "Next.js", "TypeScript", "Node.js", "Web Development", "UI/UX Design"],
  authors: [{ name: "Nitindeep Singh" }],
  creator: "Nitindeep Singh",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourwebsite.com",
    title: "Nitindeep Singh | Full Stack Developer & Software Engineer",
    description: "Experienced Full Stack Developer specializing in React, Next.js, Node.js, and TypeScript. Building scalable web applications with modern technologies.",
    siteName: "Nitindeep Singh Portfolio",
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Nitindeep Singh Portfolio',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nitindeep Singh | Full Stack Developer",
    description: "Experienced Full Stack Developer specializing in modern web technologies",
    creator: "@_NitindeepSingh",
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-gray-900 dark:text-zinc-100 transition-colors duration-300`}
        suppressHydrationWarning
      >
        {children} 
        <Analytics />
      </body>
    </html>
  );
}
