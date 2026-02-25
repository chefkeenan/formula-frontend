"use client";
import { Form, LogOut, PlusCircle, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function SideNav() {
    const path = usePathname();
    const router = useRouter();
    const [username, setUsername] = useState("User")

    useEffect(()=> {
        const currentUsername = localStorage.getItem("username")

        if (currentUsername) {
            setUsername(currentUsername)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("username")

        toast.success("You have been logged out.");
        router.push("/login");
    }

  return (
    <div className="h-[calc(100vh-5rem)] shadow-md border-gray-200 border bg-gray-50 flex flex-col justify-between">
        <div className="p-4">
            <h2
            className={`flex text-blue1 items-center gap-3 p-3 hover:bg-gray-100 rounded-md mb-4
            ${path == "/dashboard" && "bg-gray-100"}`}>
                <Form />
                My Forms
            </h2>

            <h2
            className={`flex text-blue1 items-center gap-3 p-3 hover:bg-gray-100 rounded-md mb-4
            ${path == "/dashboard/response" && "bg-gray-100"}`}>
                <PlusCircle />
                Create a New Form
            </h2>
        </div>

        <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 p-3 mb-2">
                <User className="text-gray-600" size={20} />
                <span className="font-semibold text-gray-700 truncate">{username}</span>
            </div>
        
        <button 
          onClick={handleLogout}
          className="flex w-full text-red-500 font-medium items-center gap-3 p-3 hover:bg-red-50 rounded-md transition-colors"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>
    </div>
  )
}
