import React from "react";
import Link from "next/link";
import { ChevronLeft, LinkIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function EditorNavbar({ onSave, id }: { onSave: () => void; id: string }) {

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 w-full fixed top-0 z-50">
      <div className="mx-auto py-4.5 px-8 flex justify-between items-center">
        <Link href="/dashboard" className="p-2 text-blue1 font-bold rounded-md hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2">
                <ChevronLeft size={20} className="text-blue1" />
                <h2 className="text-xl">Dashboard</h2>
            </div>
        </Link>
        <div className="flex gap-6">
          
        <button
          onClick={() => {
            const fullLink = `${window.location.origin}/forms/${id}`;
            navigator.clipboard.writeText(fullLink)
            .then(() => toast.success("Form link copied to clipboard"))
            .catch(() => toast.error("Failed to copy link."));
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <LinkIcon size={18} />
          <span className="hidden md:inline">Share</span>
        </button>
        
        <button
          onClick={() => {window.open(`/forms/${id}`, "_blank")}}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
          <span className="hidden md:inline">View Form</span>
        </button>
        <button onClick={onSave} className="flex items-center gap-2 px-6 py-3 text-sm font-medium bg-blue1 text-white hover:bg-blue3 rounded-lg transition-colors">
          Save
        </button>
        </div>
      </div>
    </nav>
  );
}