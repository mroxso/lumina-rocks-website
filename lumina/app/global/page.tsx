"use client";

import GlobalFeed from "@/components/GlobalFeed";
import { NostrProvider } from "nostr-react";

const relayUrls = [
  "wss://relay.damus.io",
  "wss://relay.nostr.band",
];

export default function Home() {
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    // </main>
    // <NavigationMenu>
    //   <NavigationMenuList>
    //     <NavigationMenuItem>
    //       <Link href="/" legacyBehavior passHref>
    //         <NavigationMenuLink className={navigationMenuTriggerStyle()}>
    //           Home
    //         </NavigationMenuLink>
    //       </Link>
    //     </NavigationMenuItem>
    //   </NavigationMenuList>
    // </NavigationMenu>
    <NostrProvider relayUrls={relayUrls} debug={true}>
      <div className="py-6 px-6">
        <GlobalFeed />
      </div>
    </NostrProvider>
  );
}
