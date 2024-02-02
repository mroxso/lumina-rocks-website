import { useNostr, dateToUnix, useNostrEvents } from "nostr-react";

import {
    type Event as NostrEvent,
    getEventHash,
    getPublicKey,
    getSignature,
} from "nostr-tools";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export default function ReactionButton({ event } : { event: any }) {
    const { events } = useNostrEvents({
        filter: {
            // since: dateToUnix(now.current), // all new events from now
            // since: 0,
            // limit: 100,
            '#e': [event.id],
            kinds: [7],
        },
    });

    // const { publish } = useNostr();

    // const onPost = async () => {
    //     const privKey = prompt("Paste your private key:");

    //     if (!privKey) {
    //         alert("no private key provided");
    //         return;
    //     }

    //     const message = prompt("Enter the message you want to send:");

    //     if (!message) {
    //         alert("no message provided");
    //         return;
    //     }

    //     const event: NostrEvent = {
    //         content: message,
    //         kind: 1,
    //         tags: [],
    //         created_at: dateToUnix(),
    //         pubkey: getPublicKey(privKey),
    //         id: "",
    //         sig: ""
    //     };

    //     event.id = getEventHash(event);
    //     event.sig = getSignature(event, privKey);

    //     publish(event);
    // };

    return (
        <Drawer>
            <DrawerTrigger>
                {/* <Button variant="default" onClick={onPost}>{events.length} Reactions</Button> */}
                <Button variant="default">{events.length} Reactions</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Reacting is coming soon!</DrawerTitle>
                    <DrawerDescription>Sorry, but this feature is not implemented yet. Please try again later.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                    <DrawerClose>
                        <Button>Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>

        // <Button variant="default" onClick={onPost}>{events.length} Reactions</Button>
    );
}