'use client';

import { useParams } from 'next/navigation'
import TagFeed from "@/components/TagFeed";

export default function Home() {

  const params = useParams()
  let tag = params.tag
  // check if pubkey contains "npub"
  // if so, then we need to convert it to a pubkey
  // if (pubkey.includes("npub")) {
  //   // convert npub to pubkey
  //   pubkey = nip19.decode(pubkey.toString()).data.toString()
  // }

  return (
    <>
      <div className="py-6 px-6">
        <TagFeed tag={tag.toString()} />
      </div>
    </>
  );
}
