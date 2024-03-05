import React from 'react';
import { useNostrEvents, useProfile } from "nostr-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import NIP05 from '@/components/nip05';

interface ProfileInfoCardProps {
  pubkey: string;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ pubkey }) => {
  const { data: userData, isLoading } = useProfile({
    pubkey,
  });

  const { events: followers } = useNostrEvents({
    filter: {
      kinds: [3],
      '#p': [pubkey],
    },
  });

  const { events: following } = useNostrEvents({
    filter: {
      kinds: [3],
      authors: [pubkey],
    },
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub || pubkey;
  const description = userData?.about?.replace(/(?:\r\n|\r|\n)/g, '<br>');
  const nip05 = userData?.nip05
  return (
    <>
      <div className='py-6'>
        {!isLoading ? (
          <Card>
            <CardHeader>
              <CardTitle>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar className='mr-2'>
                    <AvatarImage src={userData?.picture} alt={title} />
                  </Avatar>
                  {title}
                </div>
              </CardTitle>
              <CardDescription>
                <NIP05 nip05={nip05?.toString() ?? ''} pubkey={pubkey} />
                <div className=''>
                  <div className='py-6'>
                    Followers: {followers.length} | Following: {following.length > 0 ? following[0]?.tags.length : "n/a"}
                    </div>
                  <hr />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='pt-6 break-words' dangerouslySetInnerHTML={{ __html: description ?? '' }} >
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col space-y-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar className='mr-2'>
                      <AvatarImage src={userData?.picture} alt={title} />
                    </Avatar>
                    {title}
                  </div>
                </CardTitle>
                <CardDescription>
                  {/* <NIP05 nip05={nip05?.toString() ?? ''} pubkey={pubkey} /> */}
                </CardDescription>
              </CardHeader>
              <CardContent><div className='pt-6 break-words'></div></CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileInfoCard;