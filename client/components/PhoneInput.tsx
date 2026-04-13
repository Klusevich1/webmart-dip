"use client";

import {
  belarusPhonePlaceholder,
  formatBelarusPhone,
} from "@/lib/phoneMask";

interface PhoneInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  className?: string;
}

export default function PhoneInput({
  id,
  name,
  value,
  onChange,
  required,
  className = "",
}: PhoneInputProps) {
  return (
    <input
      id={id}
      name={name}
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      value={value}
      onChange={(e) => onChange(formatBelarusPhone(e.target.value))}
      required={required}
      placeholder={belarusPhonePlaceholder()}
      className={className}
    />
  );
}
