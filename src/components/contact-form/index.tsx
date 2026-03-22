"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { email } from "@/config/env";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const ContactSchema = z.object({
  name: z.string().min(3, "Your name should have at least 3 characters"),
  email: z.email("Invalid email address"),
  message: z.string().min(15, "Your message should have at least 15 characters"),
});

type SchemaInput = z.input<typeof ContactSchema>;

type SchemaOutput = z.output<typeof ContactSchema>;

interface ContactData {
  name: string;
  email: string;
  message: string;
}

interface Props {
  defaultValues?: Partial<ContactData>;
  placeholders?: Omit<ContactData, "message">;
  onValid?: () => void;
  onInvalid?: () => void;
}

export default function ContactForm(props: Props) {
  const {
    defaultValues,
    placeholders,
    onValid,
    onInvalid,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaInput, any, SchemaOutput>({
    resolver: zodResolver(ContactSchema),
    defaultValues,
  });

  return (
    <form
      onSubmit={handleSubmit(onValid ?? (() => {}), onInvalid)}
      action={`https://formsubmit.co/${email}`}
      method="POST"
      className="flex flex-col gap-4 max-w-lg mx-auto"
    >
      <div className="flex flex-col gap-4">
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            placeholder={placeholders?.name || "Your name..."}
            {...register("name")}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            placeholder={placeholders?.email || "Your email address..."}
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="message">Message</FieldLabel>
          <Textarea
            id="message"
            placeholder={"What can I do for you?"}
            {...register("message")}
            className="h-32"
          />
          <FieldError>{errors.message?.message}</FieldError>
        </Field>
      </div>

      <Button type="submit" className="">Send</Button>
    </form>
  );
}
