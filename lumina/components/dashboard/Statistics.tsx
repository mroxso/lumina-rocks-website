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
            <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-2 p-6'>
                {/* <h1>{title}</h1> */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-normal">Total Followers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{followers.length}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-base font-normal">Total Following</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{following.length > 0 ? following[0]?.tags.length : "n/a"}</div>
                        {/* <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p> */}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default ProfileInfoCard;