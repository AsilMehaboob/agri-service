/* eslint-disable */ //nextjs requires this to be disabled for the layout file as they have not resolved the eslint issue for app router 
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "KrishiSetu",
  description: "Connecting Farmers & Buyers",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Hedvig+Letters+Serif&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
