import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export default function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full mb-4">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
      <textarea className={`border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y placeholder-gray-400 text-sm ${className || ''}`}
        {...props}
      />
    </div>
  );
}