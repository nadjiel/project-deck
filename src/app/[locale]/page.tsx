import { useTranslations } from "next-intl";
import { Heading, Paragraph } from "@/components/ui/typography";
import CameraRoll from "@/components/camera-roll";

export default function About() {
  const t = useTranslations("Index");

  return (
    <div className="flex flex-col flex-1 gap-4 items-center">
      <CameraRoll />
      <span className="flex flex-col gap-2 text-center cursor-default select-none">
        <Heading variant="h1">{t("greeting")}</Heading>
        <Heading level={1} variant="h2">{t("subtitle")}</Heading>
        <Paragraph className="max-w-sm mt-2">{t("description")}</Paragraph>
      </span>
    </div>
  );
}
