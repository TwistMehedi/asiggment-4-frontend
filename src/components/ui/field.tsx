// client/components/ui/field.tsx
import React from "react";

export function Field({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}

export function FieldGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function FieldLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm font-medium" {...props} />;
}

export function FieldError({ children }: { children: React.ReactNode }) {
  return <span className="text-xs text-red-500">{children}</span>;
}

export function FieldDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-gray-500">{children}</p>;
}
