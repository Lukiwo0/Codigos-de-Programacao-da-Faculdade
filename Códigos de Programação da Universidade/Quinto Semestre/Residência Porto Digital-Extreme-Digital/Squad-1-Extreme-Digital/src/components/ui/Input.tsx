import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-[var(--surface)] border ${error ? 'border-red-500' : 'border-[var(--surface-border)]'} rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--primary)] transition-colors ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500 animate-fade-in">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
