interface BooleanToggleProps {
  value: boolean;
}

export function BooleanToggle({ value }: BooleanToggleProps) {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input type="checkbox" defaultChecked={value} className="peer sr-only" />
      <div className="h-5 w-9 rounded-full bg-surface-8 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-canvas after:shadow-sm after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-4" />
    </label>
  );
}
