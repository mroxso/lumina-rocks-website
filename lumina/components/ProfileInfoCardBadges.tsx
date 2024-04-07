import React, { useMemo } from 'react';
import { useProfile, useNostrEvents } from "nostr-react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AvatarImage } from '@radix-ui/react-avatar';
import { Avatar } from '@/components/ui/avatar';
import NIP05 from '@/components/nip05';
import { nip19 } from "nostr-tools";
import Link from 'next/link';

interface ProfileInfoCardBadgesProps {
  pubkey: string;
}

const ProfileInfoCardBadges: React.FC<ProfileInfoCardBadgesProps> = React.memo(({ pubkey }) => {
  // const { data: userData, isLoading } = useProfile({ pubkey });

  const { events: badgesRaw } = useNostrEvents({
    filter: {
      kinds: [30008],
      authors: [pubkey],
      limit: 1,
    },
  });

  let badgesIds = badgesRaw.map((badge) => {
    return badge.tags
      .filter((tag) => tag[0] === 'e')
      .map((tag) => tag[1]);
  }).flat();

  // let { events: badges } = useNostrEvents({
  //   filter: {
  //     ids: badgesIds.flat(),
  //     kinds: [30009],
  //   },
  // });

  // console.log(badges)

  const npubShortened = useMemo(() => {
    let encoded = nip19.npubEncode(pubkey);
    let parts = encoded.split('npub');
    return 'npub' + parts[1].slice(0, 4) + ':' + parts[1].slice(-3);
  }, [pubkey]);

  return (
    <div className='py-6'>
      {/* <div>
        {badges.map((badge, index) => (

          <p key={index}>{badge.content}</p>
        ))}
      </div> */}
      {badgesIds.map((badge, index) => (
        <div>
          <p>{badge}</p>
        </div>
      ))
      }
      {/* {badgesRaw.map((badge, index) => (
        badge.tags.map((tag, tagIndex) => (
          <div>
            {tag[0] === 'e' && <p>{tag[1]}</p>}
          </div>
        ))
      ))} */}
    </div>
  );
});

ProfileInfoCardBadges.displayName = 'ProfileInfoCardBadges';

export default ProfileInfoCardBadges;