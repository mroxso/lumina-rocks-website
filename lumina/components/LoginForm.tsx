declare global {
    interface Window {
        nostr: any;
    }
}

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useRef } from "react"
import { nip19 } from "nostr-tools"
import { getPublicKey, generatePrivateKey } from 'nostr-tools'

export function LoginForm() {

    let publicKey = useRef(null);
    let nsecInput = useRef<HTMLInputElement>(null);

    const handleExtensionLogin = async () => {
        // eslint-disable-next-line
        if (window.nostr !== undefined) {
            publicKey.current = await window.nostr.getPublicKey()
            console.log("Logged in with pubkey: ", publicKey.current);
            if (publicKey.current !== null) {
                localStorage.setItem("pubkey", publicKey.current);
                // window.location.reload();
                window.location.href = `/profile/${nip19.npubEncode(publicKey.current)}`;
            }
        }
    };

    const handleNsecLogin = async () => {
        if (nsecInput.current !== null) {
            try {
                let nsec = nsecInput.current.value;
                if (nsec.startsWith("nsec")) {
                    let decodedNsec = nip19.decode(nsec).data.toString();
                    nsec = decodedNsec;
                }
                let pubkey = getPublicKey(nsec);
    
                localStorage.setItem("nsec", nsec);
                localStorage.setItem("pubkey", pubkey);
                window.location.href = `/profile/${nip19.npubEncode(pubkey)}`;
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <Card className="w-full max-w-xl">
            <CardHeader>
                <CardTitle className="text-2xl">Login to Lumina</CardTitle>
                <CardDescription>
                    Login to your account either with a nostr extension or with your nsec.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Button className="w-full" onClick={handleExtensionLogin}>Sign in with Extension (NIP-07)</Button>
                </div>
                <hr />
                or
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Login with nsec (not recommended)</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                                <Label htmlFor="nsec">nsec</Label>
                                <Input placeholder="nsecabcdefghijklmnopqrstuvwxyz" id="nsec" ref={nsecInput} type="password" />
                                <Button className="w-full" onClick={handleNsecLogin}>Sign in</Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}