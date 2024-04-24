
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNostrEvents } from 'nostr-react';

interface FollowButtonProps {
    pubkey: string;
    userPubkey: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ pubkey, userPubkey }) => {
    const [isFollowing, setIsFollowing] = useState(false);

    // TODO: Implement follow loading from nostr
    // const { events } = useNostrEvents({
    //     filter: {
    //         kinds: [3],
    //         authors: [userPubkey],
    //         limit: 1,
    //     },
    // });
    
    // let followingPubkeys = events.flatMap((event) => event.tags.map(tag => tag[1])).slice(0, 50);
    // if(followingPubkeys.includes(pubkey)) {
    //     setIsFollowing(true);
    // }

    const handleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <Button className='w-full' onClick={handleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    );
};

export default FollowButton;