import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { nip19 } from "nostr-tools"
import { Label } from "../ui/label"
import { bytesToHex, hexToBytes } from '@noble/hashes/utils' 

export function CreateSecretKeyForm() {
    const [nsec, setNsec] = useState('');
    const [npub, setNpub] = useState('');

    const regenerateKey = () => {
        let sk = generateSecretKey(); // `sk` is a Uint8Array
        let pk = getPublicKey(sk); // `pk` is a hex string
        let newNpub = nip19.npubEncode(pk); // `npub` is a string
        let newNsec = nip19.nsecEncode(sk); // `nsec` is a string

        setNsec(newNsec);
        setNpub(newNpub);
    }

    // Schlüssel generieren, wenn die Komponente zum ersten Mal gerendert wird
    useEffect(() => {
        regenerateKey();
    }, []);

    return (
        <div className="w-full max-w-full">
            <div className="py-4">
                <div className='py-4'>
                    <Label>Your nsec (Secret Key)</Label>
                    <Input type="text" placeholder="nsec1.." value={nsec} />
                </div>
                <Button variant={'secondary'} type="submit" className='w-full' onClick={regenerateKey}>Regenerate</Button>
            </div>
            <div>
                <Label>Your npub (Public Key):</Label>
                <Input type="text" placeholder="nsec1.." value={npub} />
                <Button className="w-full mt-4" onClick={() => {
                    localStorage.setItem('nsec', bytesToHex(nip19.decode(nsec).data as Uint8Array));
                    window.location.href = '/onboarding/createProfile';
                }}>Next</Button>
            </div>
        </div>
    )
}