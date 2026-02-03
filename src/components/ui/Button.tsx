import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  const variants = {
    primary: "bg-[#6B9080] text-white hover:bg-[#557568] shadow-lg shadow-[#6B9080]/30 border-transparent",
    secondary: "bg-[#A4C3B2] text-white hover:bg-[#8DAF9C] border-transparent",
    outline: "bg-transparent border-2 border-[#6B9080] text-[#6B9080] hover:bg-[#6B9080]/10"
  };

  return (
    <button 
      className={cn(
        "px-6 py-3 rounded-xl font-semibold transition-all duration-300 active:scale-95 flex items-center gap-2 border",
        variants[variant],
        className
      )} 
      {...props} 
    />
  );
}
