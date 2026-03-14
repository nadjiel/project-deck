import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Dialog as DialogPrimitive } from "radix-ui";
import { DialogPortal, DialogOverlay } from "@/components/ui/dialog";
import { PropsWithChildren } from "react";

const cardVariants: Variants = {
  hidden: {
    top: "100%",
    rotateY: -360,
    opacity: 0,
  },
  visible: {
    top: "50%",
    rotateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 180,
    },
  },
  exit: {
    top: "100%",
    rotateY: -360,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

type Props = PropsWithChildren & {
  open?: boolean;
};

export function AnimatedDialog(props: Props) {
  const { children, open } = props;
  
  return (
    <DialogPortal forceMount data-slot="dialog-portal">
      <AnimatePresence>
        {
          open && <>
            <DialogOverlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogOverlay>
            <DialogPrimitive.Content
              data-slot="dialog-content"
              asChild
              {...props}
            >
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="fixed top-1/2 left-1/2 -translate-1/2 z-50"
              >
                {children}
              </motion.div>
            </DialogPrimitive.Content>
          </>
        }
      </AnimatePresence>
    </DialogPortal>
  );
}
