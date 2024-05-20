"use client";

import { CreateProfileForm } from "@/components/onboarding/createProfileForm";
import { CreateSecretKeyForm } from "@/components/onboarding/createSecretKeyForm";
import { NostrProvider } from "nostr-react";


export default function OnboardingCreateProfile() {

  const relayUrls = [
    "wss://relay.lumina.rocks",
  ];

  return (
    <>
      <NostrProvider relayUrls={relayUrls} debug={false}>
        <div className="flex flex-col items-center py-6 px-6">
          <h1>Step 2: Create Profile</h1>
          <CreateProfileForm />
        </div>
      </NostrProvider>
    </>
  );
}
