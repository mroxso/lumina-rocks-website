import React from 'react';
import { useProfile } from "nostr-react";
import {
  NostrEvent,
  nip19,
} from "nostr-tools";
import {
  Card,
  SmallCardContent,
} from "@/components/ui/card"
import Image from 'next/image';
import Link from 'next/link';
import { PlayIcon, StackIcon, VideoIcon } from '@radix-ui/react-icons';

interface ProfileReelCardProps {
  event: NostrEvent;
  linkToNote: boolean;
}

const ProfileReelCard: React.FC<ProfileReelCardProps> = ({ event, linkToNote }) => {
  const encodedNoteId = nip19.noteEncode(event.pubkey);
  const imageUrl = event.tags.filter((tag: string[]) => tag[0] === 'url').map((tag: any[]) => tag[1])[0];

  const card = (
    <Card>
      <SmallCardContent>
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            <div style={{ position: 'relative' }}>
              <img src={imageUrl} className='rounded lg:rounded-lg' style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', margin: 'auto' }} alt={event.id} />
            </div>
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

export default ProfileReelCard;