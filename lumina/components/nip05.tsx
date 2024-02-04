import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import React from 'react';

interface NIP05Props {
    nip05: string;
    pubkey: string;
}

let isLoading = true
let isValid = false

const NIP05: React.FC<NIP05Props> = ({ nip05, pubkey }) => {

    let name = nip05.split('@')[0]
    let domain = nip05.split('@')[1]

    // check if nip05 is valid
    let response = fetch(`https://${domain}/.well-known/nostr.json?name=${name}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.names[name])
            if (data.names[name] === pubkey) {
                isValid = true
            } else {
                isValid = false
            }
            isLoading = false
        })

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {nip05}
                {isLoading ? <ReloadIcon className="mx-2 h-4 w-4 animate-spin" /> : isValid ? <CheckIcon className="mx-2 h-4 w-4" /> : <span className="mx-2 text-red-500">❌</span>}
            </div>
        </>
    );
}

export default NIP05;