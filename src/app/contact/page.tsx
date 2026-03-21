import { faker } from "@faker-js/faker";
import ContactForm from "@/components/contact-form";

export default function Contact() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const placeholders = {
    name: faker.person.fullName({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
  }

  return (
    <div className="bg-red-950 flex-1">
      <ContactForm placeholders={placeholders} />
    </div>
  );
}
