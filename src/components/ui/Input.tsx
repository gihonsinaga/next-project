import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <div className="w-full">
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
