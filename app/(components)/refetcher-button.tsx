"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

export default function RefetcherButton({className, children}: {className?: string, children: React.ReactNode}) {
     const router = useRouter();

    const refresh = () => {
        console.log("touched refresh")
    router.refresh()
  }

    return (
    <button className={className} onClick={refresh}> 
        {children}
    </button>
  )
}
