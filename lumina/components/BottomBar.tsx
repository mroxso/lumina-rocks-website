"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mwaJmHMv0vd
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { BellIcon, GlobeIcon, HomeIcon, RowsIcon, UploadIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { FormEvent, JSX, SVGProps, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useRouter, usePathname } from 'next/navigation'
import { SearchIcon } from "lucide-react";
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
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { finalizeEvent,  Event as NostrEvent } from "nostr-tools";
import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { useNostr } from "nostr-react";

export default function BottomBar() {

  if(typeof window === 'undefined') return null;

  const router = useRouter();
  const { publish } = useNostr();
  const [pubkey, setPubkey] = useState<null | string>(null);
  const { createHash } = require('crypto');
  const loginType = window.localStorage.getItem('loginType');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const desc = formData.get('description') as string;
    const file = formData.get('file') as File;

    const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
      });
    };

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const hashBuffer = createHash('sha256').update(Buffer.from(arrayBuffer)).digest();
      const sha256 = hashBuffer.toString('hex');

      const unixNow = () => Math.floor(Date.now() / 1000);
      const newExpirationValue = () => (unixNow() + 60 * 5).toString();

      const pubkey = window.localStorage.getItem('pubkey');
      const createdAt = Math.floor(Date.now() / 1000);

      let authEvent = {
        kind: 24242,
        content: desc,
        created_at: createdAt,
        tags: [
          ['t', 'upload'],
          ['x', sha256],
          ['expiration', newExpirationValue()],
        ],
      };

      console.log(authEvent);

      let authEventSigned = {};
      if (loginType === 'extension') {
        authEventSigned = await window.nostr.signEvent(authEvent);
      } else if (loginType === 'amber') {
        // TODO: Sign event with amber
        alert('Signing with Amber is not implemented yet, sorry!');
      } else if (loginType === 'raw_nsec') {
        if (typeof window !== 'undefined') {
          let nsecStr = null;
          nsecStr = window.localStorage.getItem('nsec');
          if (nsecStr != null) {
            authEventSigned = finalizeEvent(authEvent, hexToBytes(nsecStr));
          }
        }
      }
      console.log(authEventSigned);

      await fetch('https://media.lumina.rocks/upload', {
        method: 'PUT',
        body: file,
        headers: { authorization: 'Nostr ' + btoa(JSON.stringify(authEventSigned)) },
      }).then(async (res) => {
        if (res.ok) {
          // alert(await res.text());
          let responseText = await res.text();
          let responseJson = JSON.parse(responseText);
          // alert(responseJson.url);

          // TODO: Create and publish note
          let event = {
            kind: 1,
            content: responseJson.url + ' ' + desc,
            created_at: createdAt,
            tags: [],
          };

          let signedEvent: NostrEvent | null = null;
          
          if (loginType === 'extension') {
            signedEvent = await window.nostr.signEvent(event);
          } else if (loginType === 'amber') {
            // TODO: Sign event with amber
            alert('Signing with Amber is not implemented yet, sorry!');
          } else if (loginType === 'raw_nsec') {
            if (typeof window !== 'undefined') {
              let nsecStr = null;
              nsecStr = window.localStorage.getItem('nsec');
              if (nsecStr != null) {
                signedEvent = finalizeEvent(event, hexToBytes(nsecStr));
              }
            }
          }
          if (signedEvent) {
            console.log("final Event: ")
            console.log(signedEvent)
            publish(signedEvent);
          }
        } else {
          alert(await res.text());
        }
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  }

  useEffect(() => {
    return setPubkey(window.localStorage.getItem('pubkey') ?? null);
  }, []);

  const pathname = usePathname();
  const isActive = (path: string, currentPath: string) => currentPath === path ? 'text-purple-500' : '';

  return (
    <nav className="fixed inset-x-0 bottom-0 h-14 flex flex-row shrink-0 items-center justify-between border-t bg-background/90 shadow-up-4 z-50 backdrop-blur">
      <Link className={`flex flex-col items-center justify-center w-full text-xs gap-1 px-4 ${isActive('/', pathname)}`} href="/">
        <HomeIcon className={`h-6 w-6`} />
        <span className="sr-only">Home</span>
      </Link>
      {pubkey && (
        <Link className={`flex flex-col items-center justify-center w-full text-xs gap-1 px-4 ${isActive('/feed', pathname)}`} href="/feed">
          <RowsIcon className={`h-6 w-6`} />
          <span className="sr-only">Follower Feed</span>
        </Link>
      )}
      {pubkey && window.localStorage.getItem('loginType') != 'readOnly_npub' && (
        <div className={`flex flex-col items-center justify-center w-full text-xs gap-1 px-4`}>
          <Drawer>
            <DrawerTrigger>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-purple-500">
                <UploadIcon className={`h-6 w-6 text-white`} />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Upload</DrawerTitle>
                <DrawerDescription>Post something</DrawerDescription>
                <div>
                  <form className="space-y-4" onSubmit={onSubmit}>
                    <Textarea name="description" rows={6} placeholder="Your description" id="description" className="w-full"></Textarea>
                    <input name="file" id="fie" type="file" accept="image/*" className="w-full" />
                    <Button type="submit" className="w-full button">Upload</Button>
                  </form>
                </div>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      )}
      <Link className={`flex flex-col items-center justify-center w-full text-xs gap-1 px-4 ${isActive('/search', pathname)}`} href="/search">
        <SearchIcon className={`h-6 w-6`} />
        <span className="sr-only">Search</span>
      </Link>
      {pubkey && (
        <Link className={`flex flex-col items-center justify-center w-full text-xs gap-1 px-4 ${isActive('/notifications', pathname)}`} href="/notifications">
          <BellIcon className={`h-6 w-6`} />
          <span className="sr-only">Notifications</span>
        </Link>
      )}
    </nav>
  )
}