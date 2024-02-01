import React, { useState, useEffect } from 'react';
import TrendingImage from './TrendingImage';

export function TrendingImages() {
    const [profiles, setProfiles] = useState<any[]>([]);

    useEffect(() => {
        fetch('https://api.nostr.band/v0/trending/images')
            .then(res => res.json())
            .then(data => setProfiles(data.images));
    }, []);

    return (
        <div className="flex flex-col items-center py-6 px-6">
            <h1 className="text-3xl font-bold">Trending Images</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {profiles.map((profile, index) => (
                    // <h1 key={index}>{profile.id}</h1>
                    <TrendingImage eventId={profile.id} pubkey={profile.pubkey} />
                ))}
            </div>
        </div>
    );
}