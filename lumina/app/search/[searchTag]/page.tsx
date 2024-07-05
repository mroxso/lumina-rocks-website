'use client';

import { useParams } from 'next/navigation'
import SearchProfilesBox from "@/components/searchComponents/SearchProfilesBox";
import SearchNotesBox from "@/components/searchComponents/SearchNotesBox";

export default function SearchPage() {

  let pubkey = null;
  if (typeof window !== 'undefined') {
    pubkey = window.localStorage.getItem('pubkey');
  }

  const params = useParams()
  let searchTag = params.searchTag

  // check if pubkey contains "npub"
  // if so, then we need to convert it to a pubkey
  // if (pubkey.includes("npub")) {
  //   // convert npub to pubkey
  //   pubkey = nip19.decode(pubkey.toString()).data.toString()
  // }

  return (
    <>
      <div className="py-6 px-6">
        <div className='grid grid-cols-1 gap-6' >
          <SearchProfilesBox searchTag={searchTag.toString()} />
          <SearchNotesBox searchTag={searchTag.toString()} />
        </div>
      </div>
    </>
  );
}
