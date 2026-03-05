import { Heading } from "@/components/ui/typography";

export default function Abilities() {
  return (
    <div className="flex flex-col flex-1 gap-4 items-center">
      <Heading variant="h1">What can I do for you?</Heading>
      <ul className="list-disc">
        <li>Craft distinctive memorable websites</li>
        <li>Conceive thoughtful prototypes and wireframes</li>
        <li>Develop scalable fullstack applications</li>
        <li>Provide translation services</li>
      </ul>
    </div>
  );
}
