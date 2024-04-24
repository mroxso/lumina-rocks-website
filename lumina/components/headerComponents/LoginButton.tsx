"use client";

import { Button } from "@/components/ui/button";
import React, { useRef } from 'react';
import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href={"/login"}>
            <Button>Sign In</Button>
        </Link>
    );
}