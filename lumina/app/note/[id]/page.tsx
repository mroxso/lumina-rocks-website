'use client';

import { useParams } from 'next/navigation'
import NotePageComponent from "@/components/NotePageComponent";
import { nip19 } from "nostr-tools";

export default function NotePage() {

  const params = useParams()
  let id = params.id

  if (id.includes("note1")) {
    id = nip19.decode(id.toString()).data.toString()
  }

  return (
    <>
      <div className="py-6 px-6">
        <div className="pb-6">
          <NotePageComponent id={id.toString()} />
        </div>
      </div>
    </>
  );
}
