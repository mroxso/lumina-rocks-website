import React, { useMemo } from 'react';
import { useProfile } from "nostr-react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import NIP05 from '@/components/nip05';
import { nip19 } from "nostr-tools";
import Link from 'next/link';

interface ProfileInfoCardProps {
  pubkey: string;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = React.memo(({ pubkey }) => {
  const { data: userData, isLoading } = useProfile({ pubkey });

  const npubShortened = useMemo(() => {
    let encoded = nip19.npubEncode(pubkey);
    let parts = encoded.split('npub');
    return 'npub' + parts[1].slice(0, 4) + ':' + parts[1].slice(-3);
  }, [pubkey]);

  const title = userData?.username ?? userData?.display_name ?? userData?.name ?? userData?.npub ?? npubShortened;
  const description = userData?.about?.replace(/(?:\r\n|\r|\n)/g, '<br>');
  const nip05 = userData?.nip05;

  return (
    <div className='py-6'>
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
          <div>
            <NIP05 nip05={nip05?.toString() ?? ''} pubkey={pubkey} />
            <div className='py-6'>
              <Link href={`/dashboard/${pubkey}`}>View Statistics</Link>
            </div>
            <hr />
          </div>
        </CardHeader>
        <CardContent>
          <div className='break-words' dangerouslySetInnerHTML={{ __html: description ?? '' }} />
        </CardContent>
      </Card>
    </div>
  );
});

ProfileInfoCard.displayName = 'ProfileInfoCard';

export default ProfileInfoCard;