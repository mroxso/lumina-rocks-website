declare global {
    interface Window {
        nostr: any;
    }
}

"use client";

import { Button } from "@/components/ui/button";
import { Share1Icon } from "@radix-ui/react-icons";
import React, { useRef } from 'react';
import { Event as NostrEvent, nip19 } from "nostr-tools";

export default function LoginButton() {

    let publicKey = useRef(null);

    const handleLogin = async () => {
        // eslint-disable-next-line
        if (window.nostr !== undefined) {
            publicKey.current = await window.nostr.getPublicKey()
            console.log("Logged in with pubkey: ", publicKey.current);
            if (publicKey.current !== null) {
                localStorage.setItem("pubkey", publicKey.current);
                window.location.reload();
            }
        }
    };

    return (
        <Button onClick={handleLogin}>Login</Button>
    );
}