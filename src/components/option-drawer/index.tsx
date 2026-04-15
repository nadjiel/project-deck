import { ChevronDownIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import LocaleButton from "@/components/locale-button";
import type { ComponentProps } from "react";

export default async function OptionDrawer(props: ComponentProps<typeof DrawerTrigger>) {
  const { className, ...rest } = props;
  
  const t = await getTranslations("option_drawer");

  return (
    <Drawer direction="top">
      <DrawerTrigger className={cn(
        `bg-foreground text-background p-2 rounded-b-xl fixed top-0 right-4 cursor-pointer`,
        className
      )} {...rest}>
        <ChevronDownIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("title")}</DrawerTitle>
          <DrawerDescription className="sr-only">Tweak configurations such as sound volume and theme.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <ul>
            <li>Theme</li>
            <li><LocaleButton /></li>
            <li>Mute</li>
            <li>Reduce Motion</li>
          </ul>
        </DrawerFooter>
        <DrawerTrigger className="bg-foreground text-background p-2 rounded-b-xl absolute top-1/1 right-4 cursor-pointer *:rotate-0 data-[state=open]:*:rotate-180">
          <ChevronDownIcon />
        </DrawerTrigger>
      </DrawerContent>
    </Drawer>
  );
}
