import React, { useState, useEffect } from 'react';
import TrendingAccount from '@/components/TrendingAccount';

export function TrendingAccounts() {
    const [profiles, setProfiles] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://api.nostr.band/v0/trending/profiles')
            .then(res => res.json())
            .then(data => setProfiles(data.profiles))
            .then();
    }, []);

    return (
        <div className="flex flex-col items-center py-6 px-6">
            <h1 className="text-3xl font-bold">Trending Accounts</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {profiles.slice(0,4).map((profile, index) => (
                    // <h1 key={index}>{profile.pubkey}</h1>
                    // <TrendingImage key={index} eventId={profile.id} pubkey={profile.pubkey} />
                    <TrendingAccount key={index} pubkey={profile.pubkey} />
                ))}
            </div>
        </div>
    );
}