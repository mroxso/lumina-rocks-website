import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DropdownThemeMode } from "@/components/headerComponents/DropdownThemeMode";
// import { Navigation } from "@/components/Navigation";
import { SiteHeader } from "@/components/siteHeader";
import Head from "next/head";
import BottomBar from "@/components/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUMINA",
  description: "LUMINA.rocks",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navigation /> */}
          <SiteHeader />
          <BottomBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
