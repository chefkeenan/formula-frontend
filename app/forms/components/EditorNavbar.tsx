import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/FormulaButton"; 

export default function EditorNavbar({ onSave }: { onSave: () => void }) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 w-full fixed top-0 z-50">
      <div className="mx-auto py-3.5 px-8 flex justify-between items-center">
        <Link href="/dashboard" className="p-2 text-blue1 font-bold rounded-md hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2">
                <ChevronLeft size={20} className="text-blue1" />
                <h2 className="text-lg">Dashboard</h2>
            </div>
        </Link>

        <Button onClick={onSave} className="w-auto mt-0 px-6 py-1 flex items-center gap-2">
          Save
        </Button>
      </div>
    </nav>
  );
}