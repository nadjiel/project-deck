import { Input } from "@/components/ui/input";

export default function ContactForm() {
  return (
    <form action="https://formsubmit.co/your@email.com" method="POST">
      <Input type="text" name="name" required />
      <Input type="email" name="email" required />
      <button type="submit">Send</button>
    </form>
  );
}
