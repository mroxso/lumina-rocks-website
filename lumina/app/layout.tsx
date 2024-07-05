'use client';

import { Metadata } from "next";
import "./globals.css";
import { NostrProvider } from "nostr-react";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNavigation } from "@/components/headerComponents/TopNavigation";
import BottomBar from "@/components/BottomBar";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const relayUrls = [
    "wss://relay.lumina.rocks",
  ];

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
        <link rel="manifest" href="/manifest.json" />
        <title>LUMINA</title>
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NostrProvider relayUrls={relayUrls} debug={false}>
            <TopNavigation />
            <Toaster />
            <div className="main-content pb-14">
              {children}
            </div>
            <BottomBar />
          </NostrProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
