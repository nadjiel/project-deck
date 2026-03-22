"use client";

import { LayoutGridIcon, GalleryHorizontalEndIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLayout } from "@/hooks/use-layout";

export default function ProjectLayoutButton() {
  const { layout, setLayout } = useLayout(["grid", "deck"]);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setLayout(!layout || layout === "deck" ? "grid" : undefined) }
      className="cursor-pointer"
    >
      {
        !layout || layout === "deck"
          ? <div><LayoutGridIcon /><span className="sr-only">Choose grid layout</span></div>
          : <div><GalleryHorizontalEndIcon /><span className="sr-only">Choose card layout</span></div>
      }
    </Button>
  );
}
