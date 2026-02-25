import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, className, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
      <input
        className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className || ""} ${error ? "border-red-500" : ""}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}