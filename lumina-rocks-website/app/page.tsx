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

const relayUrls = [
  "wss://relay.lumina.rocks",
];

export default function Home() {
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

          {/* <h1>Cool stuff will be coming soon!</h1>
          <hr /> */}

          <GlobalFeed />

          {/* <h2>Latest Notes</h2>
          <LatestNotes /> */}

          {/* <ExampleComponents /> */}
          {/* <hr className="col-1 my-5 mx-0" /> */}
          {/* <AppGuides /> */}
          <Footer />
        </Container>
      </NostrProvider>
    </>
  );
}
