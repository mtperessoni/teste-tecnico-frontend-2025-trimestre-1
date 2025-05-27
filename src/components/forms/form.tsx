"use client";

import * as React from "react";
import {
  useForm,
  UseFormProps,
  FieldValues,
  FormProvider,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<T extends FieldValues>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit" | "children"
  > {
  schema: z.ZodType<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  onSubmit: (data: T) => void;
  children: React.ReactNode; // agora recebe ReactNode direto
}

export function CForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
