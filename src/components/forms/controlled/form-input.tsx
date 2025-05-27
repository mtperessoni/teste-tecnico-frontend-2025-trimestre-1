import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";

type Normalizer = {
  input?: (value: string) => string;
  output?: (value: string) => string;
};

type FormInputControllerProps = {
  name: string;
  label: string;
  error?: string;
  normalizer?: Normalizer;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function CInput({
  name,
  label,
  error: customError,
  normalizer,
  ...props
}: FormInputControllerProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const formError = errors[name]?.message as string | undefined;
  const error = customError || formError;

  return (
    <div className="space-y-1.5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foreground my-2"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Input
            id={name}
            {...field}
            {...props}
            onChange={(e) => {
              const rawValue = e.target.value;
              const normalizedValue = normalizer?.input
                ? normalizer.input(rawValue)
                : rawValue;
              e.target.value = normalizedValue;

              if (props.onChange) {
                props.onChange(e);
              }
              field.onChange(e);
            }}
            onBlur={(e) => {
              const rawValue = e.target.value;
              const normalizedValue = normalizer?.input
                ? normalizer.input(rawValue)
                : rawValue;
              e.target.value = normalizedValue;

              if (props.onBlur) {
                props.onBlur(e);
              }
              field.onBlur();
            }}
            value={
              normalizer?.output
                ? normalizer.output(field.value ?? "")
                : field.value ?? ""
            }
            className={cn(
              "w-full rounded-md border px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              error
                ? "border-red-500 focus-visible:ring-red-500"
                : "border-input hover:border-input/80",
              props.className
            )}
          />
        )}
      />
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
}
