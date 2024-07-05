'use client';

import UploadComponent from "@/components/UploadComponent";

export default function UploadPage() {

  // check if pubkey contains "npub"
  // if so, then we need to convert it to a pubkey
  // if (pubkey.includes("npub")) {
  //   // convert npub to pubkey
  //   pubkey = nip19.decode(pubkey.toString()).data.toString()
  // }
  
  return (
    <>
      <div className="py-6 px-6">
        <UploadComponent />
      </div>
    </>
  );
}