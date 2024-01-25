'use client';

import Head from "next/head";
import Container from "react-bootstrap/Container";
import AppGuides from "@/components/AppGuides";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ExampleComponents from "@/components/ExampleComponents";
import LatestNotes from "@/components/LatestNotes";
import GlobalFeed from "@/components/GlobalFeed";
import { NostrProvider } from "nostr-react";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import ProfileFeed from "@/components/ProfileFeed";
import { useParams } from 'next/navigation'
import { nip19 } from "nostr-tools";

const relayUrls = [
  "wss://relay.lumina.rocks",
];


export default function Home() {
  
  const params = useParams()
  let pubkey = params.pubkey
  // check if pubkey contains "npub"
  // if so, then we need to convert it to a pubkey
  if(pubkey.includes("npub")) {
    // convert npub to pubkey
    pubkey = nip19.decode(pubkey.toString()).data.toString()
  }

  return (
    <>
      <NostrProvider relayUrls={relayUrls}>
        <Head>
          <title>LUMINA.rocks</title>
          <meta name="description" content="Yet another nostr web ui" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container as="main" className="py-4 px-3 mx-auto">
          <Header />

          <ProfileInfoCard pubkey={pubkey.toString()} />
          <hr />
          <ProfileFeed pubkey={pubkey.toString()}/>

          <Footer />
        </Container>
      </NostrProvider>
    </>
  );
}
