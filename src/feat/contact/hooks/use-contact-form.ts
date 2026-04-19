"use client";

import { useTranslations } from "next-intl";
import { z } from "zod";

/**
 * A hook that defines a localized `Schema` for the contact form.
 * 
 * @returns An object with a `zod` schema for validating the contact form.
 */
export default function useContactForm() {
  const t = useTranslations("contact_form");

  const Schema = z.object({
    name: z.string().min(3, t("name_error_min")),
    email: z.email(t("email_error")),
    message: z.string().min(15, t("message_error_min")),
  });

  return { Schema };
}
