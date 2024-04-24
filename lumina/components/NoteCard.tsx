import React from 'react';
import { useProfile } from "nostr-react";
import {
  nip19,
} from "nostr-tools";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ReactionButton from '@/components/ReactionButton';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import ViewRawButton from '@/components/ViewRawButton';
import ViewNoteButton from './ViewNoteButton';
import Link from 'next/link';
import ViewCopyButton from './ViewCopyButton';
import { Event as NostrEvent } from "nostr-tools";
import ZapButton from './ZapButton';

interface NoteCardProps {
  pubkey: string;
  text: string;
  eventId: string;
  tags: string[][];
  event: NostrEvent;
  showViewNoteCardButton: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({ pubkey, text, eventId, tags, event, showViewNoteCardButton }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub || nip19.npubEncode(pubkey);
  // text = text.replaceAll('\n', '<br />');
  text = text.replaceAll('\n', ' ');
  const imageSrc = text.match(/https?:\/\/[^ ]*\.(png|jpg|gif)/g);
  const textWithoutImage = text.replace(/https?:\/\/.*\.(?:png|jpg|gif)/g, '');
  const createdAt = new Date(event.created_at * 1000);
  const hrefProfile = `/profile/${nip19.npubEncode(pubkey)}`;
  const profileImageSrc = userData?.picture || "https://robohash.org/" + pubkey;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href={hrefProfile} style={{ textDecoration: 'none' }}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar>
                        <AvatarImage src={profileImageSrc} />
                      </Avatar>
                      <span className='break-all' style={{ marginLeft: '10px' }}>{title}</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='py-4'>
            {
              <div className='w-full h-full px-10'>
                {imageSrc && imageSrc.length > 1 ? (
                  <Carousel>
                    <CarouselContent>
                      {imageSrc.map((src, index) => (
                        <CarouselItem key={index}>
                          <img
                            key={index}
                            src={src}
                            className='rounded lg:rounded-lg'
                            style={{ maxWidth: '100%', maxHeight: '66vh', objectFit: 'contain', margin: 'auto' }}
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                ) : (
                  imageSrc ? <img src={imageSrc[0]} className='rounded lg:rounded-lg' style={{ maxWidth: '100%', maxHeight: '66vh', objectFit: 'contain', margin: 'auto' }} /> : ""
                )}
              </div>
            }
            <br />
            <div className='break-all'>
              {textWithoutImage}
            </div>
          </div>
          <hr />
          <div className='py-4 space-x-4 flex justify-between items-start'>
            <div className='flex space-x-4'>
              <ReactionButton event={event} />
              <ZapButton event={event} />
              {showViewNoteCardButton && <ViewNoteButton event={event} />}
            </div>
            <div className='flex space-x-2'>
              <ViewCopyButton event={event}/>
              <ViewRawButton event={event} />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <small className="text-muted">{createdAt.toLocaleString()}</small>
        </CardFooter>
      </Card>
    </>
  );
}

export default NoteCard;