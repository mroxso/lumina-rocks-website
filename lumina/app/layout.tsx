import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DropdownThemeMode } from "@/components/headerComponents/DropdownThemeMode";
// import { Navigation } from "@/components/Navigation";
import { SiteHeader } from "@/components/siteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LUMINA",
  description: "LUMINA.rocks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navigation /> */}
          <SiteHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
