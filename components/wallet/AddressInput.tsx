"use client";

import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type AddressInputProps = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  helperText?: string;
  disabled?: boolean;
};

export function AddressInput({
  value,
  onChange,
  onSubmit,
  helperText,
  disabled,
}: AddressInputProps) {
  return (
    <Field className="max-w-sm">
      <Input
        id="wallet-input"
        type="text"
        placeholder="Enter wallet address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        disabled={disabled}
        className="bg-background!text-xs! md:text-sm!"
      />
      <FieldDescription className="text-center">{helperText}</FieldDescription>
    </Field>
  );
}
