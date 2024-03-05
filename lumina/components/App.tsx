"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { TopNavigation } from "@/components/headerComponents/TopNavigation";
import Head from "next/head";
import BottomBar from "@/components/BottomBar";
import { NostrProvider } from "nostr-react";

const inter = Inter({ subsets: ["latin"] });

const relayUrls = [
    "wss://relay.damus.io",
    "wss://relay.nostr.band",
  ];

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  )
}

