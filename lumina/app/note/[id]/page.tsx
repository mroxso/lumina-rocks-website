'use client';

import Head from "next/head";
import { NostrProvider, useNostrEvents } from "nostr-react";
import { useParams } from 'next/navigation'
import NotePageComponent from "@/components/NotePageComponent";

const relayUrls = [
  "wss://relay.damus.io",
  "wss://relay.nostr.band",
];

export default function NotePage() {

  const params = useParams()
  let id = params.id

  return (
    <>
      <NostrProvider relayUrls={relayUrls}>
        <Head>
          <title>LUMINA.rocks - {id}</title>
          <meta name="description" content="Yet another nostr web ui" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="py-6 px-6">
          <div className="pb-6">
            <NotePageComponent id={id.toString()} />
          </div>
        </div>
      </NostrProvider>
    </>
  );
}
