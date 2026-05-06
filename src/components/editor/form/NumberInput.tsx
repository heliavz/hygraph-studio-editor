interface NumberInputProps {
  value: number | undefined;
}

export function NumberInput({ value }: NumberInputProps) {
  return (
    <input
      type="number"
      defaultValue={value ?? ""}
      className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
