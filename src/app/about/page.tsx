import { Heading, Paragraph } from "@/components/ui/typography";
import CameraRoll from "@/components/camera-roll";

export default function About() {
  return (
    <div className="flex flex-col flex-1 gap-4 items-center">
      <CameraRoll />
      <span className="flex flex-col gap-2 text-center">
        <Heading variant="h1">Hello! I'm Daniel!</Heading>
        <Heading level={1} variant="h2">Fullstack Developer</Heading>
        <Paragraph className="max-w-sm mt-2">
          I'm a fullstack web developer dedicated to bringing value to users
          through fun, empathetic designs.
          I'm also a developer tool creator and an open-source enthusiast.
        </Paragraph>
      </span>
    </div>
  );
}
