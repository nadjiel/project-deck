import { LoaderCircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function Loader(props: ComponentProps<typeof LoaderCircleIcon>) {
  const { className, ...rest } = props;

  return <LoaderCircleIcon
    size={64}
    className={cn("animate-spin", className)}
    {...rest}
  />
}
