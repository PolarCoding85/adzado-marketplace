// components/formatted-tax-id-input.tsx

import React from 'react';
import { Input } from "@/components/ui/input";

interface FormattedTaxIdInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function FormattedTaxIdInput({ 
  value, 
  onChange, 
  placeholder = "XX-XXXXXXX",
  className 
}: FormattedTaxIdInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-digits
    let digits = e.target.value.replace(/\D/g, '');
    
    // Limit to 9 digits
    digits = digits.substring(0, 9);
    
    // Add hyphen after first two digits if we have more than 2 digits
    if (digits.length > 2) {
      digits = `${digits.substring(0, 2)}-${digits.substring(2)}`;
    }
    
    onChange(digits);
  };

  return (
    <Input
      type="text"
      value={value || ""}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
      maxLength={10} // 9 digits + 1 hyphen
    />
  );
}