import React from 'react';
import { useProfile } from "nostr-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import { ReloadIcon } from '@radix-ui/react-icons';
import NIP05  from '@/components/nip05';

interface ProfileInfoCardProps {
  pubkey: string;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ pubkey }) => {
  const { data: userData } = useProfile({
    pubkey,
  });

  const title = userData?.username || userData?.display_name || userData?.name || userData?.npub;
  const description = userData?.about?.replace(/(?:\r\n|\r|\n)/g, '<br>');
  const nip05 = userData?.nip05
  return (
    <>
      <div className='py-6'>
        {description ? (
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
              </CardDescription>
            </CardHeader>
            <CardContent><div className='pt-6 break-words' dangerouslySetInnerHTML={{ __html: description }} ></div></CardContent>
          </Card>
        ) : (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] rounded-xl" />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileInfoCard;