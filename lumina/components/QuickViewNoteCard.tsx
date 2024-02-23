import React from 'react';
import { useProfile } from "nostr-react";
import {
  nip19,
} from "nostr-tools";
import {
  Card,
  SmallCardContent,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';

interface NoteCardProps {
  pubkey: string;
  text: string;
  eventId: string;
  tags: string[][];
  event: any;
  linkToNote: boolean;
}

const QuickViewNoteCard: React.FC<NoteCardProps> = ({ pubkey, text, eventId, tags, event, linkToNote }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub || nip19.npubEncode(pubkey);
  const imageSrc = text.match(/https?:\/\/.*\.(?:png|jpg|gif)/g)?.[0].split(' ');
  const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)/g, '');
  const createdAt = new Date(event.created_at * 1000);
  const hrefProfile = `/profile/${nip19.npubEncode(pubkey)}`;
  const profileImageSrc = userData?.picture || "https://robohash.org/" + pubkey;
  const encodedNoteId = nip19.noteEncode(event.id)

  const card = (
    <Card>
      <SmallCardContent>
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            {imageSrc && imageSrc.length > 0 && (
              <img src={imageSrc[0]} className='rounded lg:rounded-lg' style={{ maxWidth: '100%', maxHeight: '100vh', objectFit: 'contain', margin: 'auto' }} alt={text} />
              // <div style={{ position: 'relative', width: '100%', maxHeight: '100vh' }}>
              //   <Image src={imageSrc[0]} alt={text} layout='fill' objectFit='contain' />
              // </div>
            )}
          </div>
        </div>
      </SmallCardContent>
    </Card>
  );

  return (
    <>
      {linkToNote ? (
        <Link href={`/note/${encodedNoteId}`}>
          {card}
        </Link>
      ) : (
        card
      )}
    </>
  );
}

export default QuickViewNoteCard;