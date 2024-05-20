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

export function CreateProfileForm() {

    let npub = ""
    let nsec = ""
    if (typeof window !== 'undefined') {
        npub = nip19.npubEncode(window.localStorage.getItem("pubkey") || '');
        nsec = nip19.nsecEncode(hexToBytes(window.localStorage.getItem("nsec") || ''));
    }
    function handleProfileUpdate() {
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const bio = (document.getElementById('bio') as HTMLInputElement).value;

        let event = finalizeEvent({
            kind: 0,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: `{name: ${username}, about: ${bio}}`,
        }, nip19.decode(nsec).data);

        let isGood = verifyEvent(event);

        console.log('isGood: ' + isGood);
        console.log(event);
        if (isGood) {
            // TODO: Publish signed event to relays
        }
    }

    return (
        <div className="w-full max-w-full">
            <div className="py-4">
                <div>
                    <Label>Your npub (Public Key):</Label>
                    <Input type="text" placeholder="nsec1.." value={npub} readOnly />
                </div>
                <div className='py-4'>
                    <Label>Your Username</Label>
                    <Input type="text" id="username" placeholder="Satoshi" />
                </div>
                <div className='py-4'>
                    <Label>Your Bio</Label>
                    {/* <Input type="text" id="bio" placeholder="Type something about you.." /> */}
                    <Textarea id="bio" placeholder="Type something about you.." />
                </div>
                <Button variant={'default'} type="submit" className='w-full' onClick={handleProfileUpdate}>Submit</Button>
            </div>
        </div>
    )
}