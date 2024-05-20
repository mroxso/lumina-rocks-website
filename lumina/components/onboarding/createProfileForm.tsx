'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { nip19 } from "nostr-tools"
import { Label } from "../ui/label"
import { Textarea } from "@/components/ui/textarea"
import { finalizeEvent, verifyEvent } from 'nostr-tools/pure'
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { useNostr, useProfile } from 'nostr-react';

export function CreateProfileForm() {

    const { publish } = useNostr();

    let npub = ''
    let nsec: Uint8Array;

    if (typeof window !== 'undefined') {
        const pubkey = window.localStorage.getItem("pubkey");
        const nsecHex = window.localStorage.getItem("nsec");

        if (pubkey && pubkey.length > 0) {
            npub = nip19.npubEncode(pubkey);
        }

        if (nsecHex && nsecHex.length > 0) {
            nsec = hexToBytes(nsecHex);
        }
    }

    const { data: userData } = useProfile({
        pubkey: npub ? nip19.decode(npub).data.toString() : '',
    });

    async function handleProfileUpdate() {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const bio = (document.getElementById('bio') as HTMLInputElement).value;

        if (nsec) {
            let event = finalizeEvent({
                kind: 0,
                created_at: Math.floor(Date.now() / 1000),
                tags: [],
                content: `{name: '${username}', about: '${bio}'}`,
            }, nsec);

            let isGood = verifyEvent(event);

            console.log('isGood: ' + isGood);
            console.log(event);
            if (isGood) {
                publish(event);
                window.location.href = `/profile/${npub}`;
            }
        }
    }

    return (
        <div className="w-full max-w-full">
            <div className="py-4">
                <div>
                    <Label>Your npub (Public Key):</Label>
                    <Input type="text" placeholder="npub1.." value={npub} readOnly />
                </div>
                <div className='py-4'>
                    <Label>Your Username</Label>
                    <Input type="text" id="username" placeholder="Satoshi" value={userData?.username} />
                </div>
                <div className='py-4'>
                    <Label>Your Bio</Label>
                    {/* <Input type="text" id="bio" placeholder="Type something about you.." /> */}
                    <Textarea id="bio" placeholder="Type something about you.." value={userData?.about} />
                </div>
                <Button variant={'default'} type="submit" className='w-full' onClick={handleProfileUpdate}>Submit</Button>
            </div>
        </div>
    )
}