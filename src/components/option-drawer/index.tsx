import { ChevronDownIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function OptionDrawer() {
  return (
    <Drawer direction="top">
      <DrawerTrigger className="bg-foreground text-background p-2 rounded-b-xl fixed top-0 right-4 cursor-pointer">
        <ChevronDownIcon />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Configurations</DrawerTitle>
          <DrawerDescription className="sr-only">Tweak configurations such as sound volume and theme.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <ul>
            <li>Theme</li>
            <li>Language</li>
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
