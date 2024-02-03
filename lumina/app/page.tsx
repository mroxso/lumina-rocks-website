"use client";

import { Search } from "@/components/Search";
import TrendingAccounts from "@/components/TrendingAccounts";
import { TrendingImages } from "@/components/TrendingImages";
import { NostrProvider } from "nostr-react";

const relayUrls = [
  "wss://relay.damus.io",
  "wss://relay.nostr.band",
];

export default function Home() {
  return (
    <NostrProvider relayUrls={relayUrls} debug={true}>
      <div className="flex flex-col items-center py-6 px-6">
        <Search />
      </div>
      <TrendingImages />
    </NostrProvider>
  );
}
