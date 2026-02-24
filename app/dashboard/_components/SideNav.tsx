"use client";
import { Form, PlusCircle } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React from 'react'

export default function SideNav() {
    const path = usePathname();

  return (
    <div className="h-screen bg-shadow-md border-gray-200 border bg-gray-50">
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
    </div>
  )
}
