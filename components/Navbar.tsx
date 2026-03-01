"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, [pathname])

    const isAuth = pathname === "/login" || pathname === "/register";
    const isDashboard = pathname.startsWith("/dashboard");
    const isForm = pathname.startsWith("/forms")
    const isEditForm = pathname.startsWith("/forms/e")

    if (isAuth) {
    return null;
  }

  return (
    <nav className={`bg-white shadow-sm  ${isDashboard ? 'fixed top-0 w-full z-50' : ''} ${isForm ? 'hidden' : ''}`}>
        <div className="mx-auto py-5 px-8 flex justify-between items-center">
            <Link href="/" className="flex items-center">
                <Image src={"/logo.svg"} width={40} height={40} alt="logo" />
                <h1 className="mx-2 text-2xl font-bold text-blue1">Formula</h1>
            </Link>
        <div className="flex items-center gap-4">
          
          {isLoggedIn ? (
          <Link href="/dashboard" className={`${isDashboard ? "hidden" : ""} bg-blue1 text-white px-6 py-2.5 rounded font-semibold hover:bg-blue3 transition-colors text-sm`}>
            Dashboard
          </Link>
          ) : (
          <Link href="/login" className="bg-blue1 text-white px-6 py-2.5 rounded font-semibold hover:bg-blue3 transition-colors text-sm">
            Login
          </Link> 
          )}
        </div>
        </div>

    </nav> 
  )
}
