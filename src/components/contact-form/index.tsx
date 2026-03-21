"use client";

import { useForm } from "react-hook-form";
import { email } from "@/config/env";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ContactData {
  name: string;
  email: string;
}

interface Props {
  placeholders?: ContactData;
}

export default function ContactForm(props: Props) {
  const { placeholders } = props;

  const { register } = useForm();

  return (
    <form action={`https://formsubmit.co/${email}`} method="POST">
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Input
          id="name"
          placeholder={placeholders?.name || "Your name..."}
          {...register("name")}
        />
        <FieldError>Error</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          placeholder={placeholders?.email || "Your email address..."}
          {...register("email")}
        />
        <FieldError>Error</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="message">Message</FieldLabel>
        <Textarea
          id="message"
          placeholder={"What can I do for you?"}
          {...register("message")}
        />
        <FieldError>Error</FieldError>
      </Field>

      <Button type="submit">Send</Button>
    </form>
  );
}
