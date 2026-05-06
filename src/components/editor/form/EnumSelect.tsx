import { ChevronDown } from "lucide-react";

interface EnumSelectProps {
  value: string;
  options: readonly string[];
}

export function EnumSelect({ value, options }: EnumSelectProps) {
  return (
    <div className="relative">
      <select
        defaultValue={value}
        className="block w-full appearance-none rounded-md border border-default bg-canvas px-3 py-2 pr-9 text-sm text-strong focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
