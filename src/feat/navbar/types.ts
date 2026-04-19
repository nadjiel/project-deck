import type { ReactNode } from "react";

export interface LinkData {
  
  /**
   * An `href` to define the address of the link.
   */
  href: string;
  
  /**
   * An `icon` to illustrate the link.
   */
  icon: ReactNode;
}
