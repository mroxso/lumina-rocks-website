"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useProfile } from "nostr-react"
import Link from "next/link"

export function AvatarDropdown() {

  let pubkey = window.localStorage.getItem('pubkey');
  let src = "https://robohash.org/" + (pubkey);

  if (pubkey !== null) {
    const { data: userData } = useProfile({
      pubkey,
    });
    src = userData?.picture || "https://robohash.org/" + pubkey;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button> */}
        <Avatar>
          <AvatarImage src={src} />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href={`/profile/${pubkey}`}>
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { window.localStorage.removeItem('pubkey'); window.location.reload() }}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
