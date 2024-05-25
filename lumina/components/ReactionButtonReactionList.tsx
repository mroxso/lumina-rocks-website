import { useNostr, dateToUnix, useNostrEvents } from "nostr-react";

import {
    type Event as NostrEvent,
    getEventHash,
    getPublicKey,
    finalizeEvent,
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
import { ScrollArea } from "@/components/ui/scroll-area"
import ReactionButtonReactionListItem from "./ReactionButtonReactionListItem";

export default function ReactionButtonReactionList({ filteredEvents }: { filteredEvents: any }) {
    return (
        <ScrollArea className="p-4 h-[50vh]">
            {filteredEvents.map((event: any) => (
                <ReactionButtonReactionListItem key={event.id} event={event} />
            ))}
        </ScrollArea>
    );
}