"use client";

import ReelFeed from "@/components/ReelFeed"

export default function ReelPage() {
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
    <div className="py-6 px-6">
      <ReelFeed />
    </div>
  );
}