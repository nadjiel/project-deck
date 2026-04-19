import { faker } from "@faker-js/faker";
import { ContactForm } from "@/feat/contact";

export default function Contact() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const placeholders = {
    name: faker.person.fullName({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
  }

  return (
    <div className="flex-1">
      <ContactForm placeholders={placeholders} />
    </div>
  );
}
