interface TextInputProps {
  value: string;
}

export function TextInput({ value }: TextInputProps) {
  return (
    <input
      type="text"
      defaultValue={value}
      className="block w-full rounded-md border border-default bg-canvas px-3 py-2 text-sm text-strong placeholder:text-ghost focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
    />
  );
}
