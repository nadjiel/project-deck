import { getTranslations } from "next-intl/server";
import { fakerEN, fakerPT_BR, fakerES, fakerFR, fakerJA } from "@faker-js/faker";
import { ContactForm } from "@/feat/contact";

const fakerMap = {
  en: fakerEN,
  pt: fakerPT_BR,
  es: fakerES,
  fr: fakerFR,
  ja: fakerJA,
}

export default async function Contact(
  props: PageProps<"/[locale]/projects/[slug]">
) {
  const { params } = props;

  const { locale } = await params;

  const t = await getTranslations("contact");

  const faker = fakerMap[locale as keyof typeof fakerMap];

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const placeholders = {
    name: `${t("placeholder_example")} ${faker.person.fullName({ firstName, lastName })}`,
    email: `${t("placeholder_example")} ${faker.internet.email({ firstName, lastName }).toLowerCase()}`,
  }

  return (
    <div className="flex-1">
      <ContactForm placeholders={placeholders} />
    </div>
  );
}
