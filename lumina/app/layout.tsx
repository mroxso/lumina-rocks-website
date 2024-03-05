import { Metadata } from "next";
import "./globals.css";
import App from "@/components/App";

export const metadata: Metadata = {
  title: "LUMINA",
  description: "An effortless, enjoyable, and innovative way to capture, enhance, and share moments with everyone, decentralized and boundless.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <App children={children} />
  );
}
