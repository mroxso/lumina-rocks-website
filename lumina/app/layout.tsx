import { Metadata } from "next";
import "./globals.css";
import App from "@/components/App";
import { NostrProvider } from "nostr-react";
import Head from "next/head";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNavigation } from "@/components/headerComponents/TopNavigation";
import BottomBar from "@/components/BottomBar";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "LUMINA",
  description: "An effortless, enjoyable, and innovative way to capture, enhance, and share moments with everyone, decentralized and boundless.",
  manifest: "/manifest.json",
};

const inter = Inter({ subsets: ["latin"] });
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/icon?<generated>" type="image/png" sizes="32x32" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TopNavigation />
          <BottomBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
