"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { NostrProvider, useNostr, dateToUnix } from "nostr-react";
import { type Event as NostrEvent, getSignature } from "nostr-tools";

const relayUrls = [
    "wss://relay.damus.io",
    "wss://relay.nostr.band",
];

export default function NewNote() {
    const [content, setContent] = useState('');
    const { publish } = useNostr();

    const handleContentChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setContent(event.target.value);
    }

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        const pubkey = await (window as any).nostr.getPublicKey();

        const tags = content.match(/#[a-z0-9]+/gi);
        const doubleArrayTags = tags ? tags.map(tag => ["t", tag.slice(1)]) : [];

        const finalEvent: NostrEvent<number> = {
            content: content,
            kind: 1,
            tags: doubleArrayTags,
            created_at: dateToUnix(),
            pubkey: pubkey,
            id: '',
            sig: '',
        };

        try {
            const signedEvent = await (window as any).nostr.signEvent(finalEvent);

            publish(signedEvent);

            console.log('Submit button was pressed');
            console.log('Content:', signedEvent);
        } catch (error) {
            console.error('Error signing event:', error);
        }
    }

    return (
        <NostrProvider relayUrls={relayUrls} debug={true}>
            <div className="py-6 px-6">
                <form onSubmit={handleSubmit}>
                    <Textarea id="content" placeholder="Your note comes here" onChange={handleContentChange} />
                    <Button id="submit" type="submit" className="my-2 w-full">Publish</Button>
                </form>
            </div>
        </NostrProvider>
    );
}