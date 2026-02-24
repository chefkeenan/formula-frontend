import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button 
      className={`w-full bg-blue1 text-white font-semibold py-2.5 rounded-md hover:bg-blue3 transition-colors mt-2 ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}