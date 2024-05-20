"use client";

import { CreateSecretKeyForm } from "@/components/onboarding/createSecretKeyForm";
import { NostrProvider } from "nostr-react";


export default function OnboardingHome() {

  const relayUrls = [
    "wss://relay.lumina.rocks",
  ];
  
  return (
    <>
      <NostrProvider relayUrls={relayUrls} debug={false}>
          <CreateSecretKeyForm />
      </NostrProvider>
    </>
  );
}
