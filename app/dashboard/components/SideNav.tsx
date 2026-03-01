"use client";
import Button from '@/components/FormulaButton';
import { Form, LogOut, PlusCircle, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

interface SideNavProps {
  onCreateForm?: () => void;
}

export default function SideNav({ onCreateForm }: SideNavProps) {
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
      router.push("/");
  }

  const handleCreateForm = () => {
    if (onCreateForm) {
      onCreateForm();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="h-[calc(100vh-5rem)] shadow-md border-gray-200 border bg-white flex flex-col justify-between">
        <div className="p-4">
            
            <div className='border-b border-gray-200 mb-3'>
            <Button onClick={handleCreateForm}
            className={`w-full flex text-blue1 items-center gap-3 p-3 rounded-md mb-4
            ${path == "/dashboard/response" && "bg-gray-100"}`}>
                <PlusCircle />
                Create a New Form
            </Button>
            </div>

            <h2
            className={`border-t border-gray-200 flex text-blue1 items-center gap-3 p-3 hover:bg-gray-100 rounded-md mb-4
            ${path == "/dashboard" && "bg-gray-100"}`}>
                <Form />
                My Forms
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
