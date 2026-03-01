"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue1 border-t border-gray-100 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-2 ">Formula</h2>
          <p className="text-white text-sm font-medium">
            The easiest way to build, share, and analyze forms.
          </p>
        </div>
        
        <p className="text-white flex items-center justify-center gap-3 text-sm font-medium">
            Made with <Heart size={16} className="text-red-500 fill-red-500" /> by Keenan
        </p>

      </div>
    </footer>
  );
}