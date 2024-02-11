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
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ReactionButton({ event }: { event: any }) {
    const { events, isLoading } = useNostrEvents({
        filter: {
            // since: dateToUnix(now.current), // all new events from now
            // since: 0,
            // limit: 100,
            '#e': [event.id],
            kinds: [7],
        },
    });
  
    // filter out all events that also have another e tag with another id
    // this will filter out likes that are made on comments and not on the note itself
    const filteredEvents = events.filter((event) => { return event.tags.filter((tag) => { return tag[0] === '#e' && tag[1] !== event.id }).length === 0 });

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
                {isLoading ? (
                    <Button variant="default"><ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> 💜</Button>
                ) : (
                    <Button variant="default">{filteredEvents.length} 💜</Button>
                )}
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