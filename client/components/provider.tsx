'use client'
import { SessionProvider } from "next-auth/react";
import { Props } from "next/script";


const Providers = ({children}: Props) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Providers