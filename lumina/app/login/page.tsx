'use client';

import Head from "next/head";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
    return (
        <>
            <div className="w-screen pt-10 flex items-center justify-center">
                <LoginForm />
            </div>
        </>
    );
}
