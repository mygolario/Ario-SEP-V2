'use client';

import React, { InputHTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function AuthInput({ label, id, className, ...props }: AuthInputProps) {
  return (
    <div className="relative group">
      <input
        id={id}
        {...props}
        className={cn(
          "peer w-full px-4 py-3 rounded-lg border-2 border-slate-200 text-slate-900 placeholder-transparent focus:outline-none focus:border-indigo-600 focus:ring-0 transition-all bg-white",
          className
        )}
        placeholder={label}
      />
      <label
        htmlFor={id}
        className="absolute right-4 -top-2.5 bg-white px-2 text-xs font-medium text-slate-500 transition-all 
                   peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-3.5 peer-placeholder-shown:right-4 
                   peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600 pointer-events-none"
      >
        {label}
      </label>
    </div>
  );
}

export function SubmitButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3.5 rounded-lg transition-all duration-200 shadow-lg shadow-indigo-500/30 flex items-center justify-center",
        pending && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {pending ? (
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
