import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogPortal, DialogOverlay, DialogContent } from "@/components/ui/dialog";

const cardVariants = {
  hidden: {
    y: "100%",
    rotateY: -368,
    opacity: 0,
  },
  visible: {
    y: 0,
    rotateY: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 180,
    },
  },
  exit: {
    y: "100%",
    rotateY: -368,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export function AnimatedDialog({children, open}) {
  return (
    <DialogPortal forceMount>
      <AnimatePresence>
        {open && (
          <>
            <DialogOverlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            </DialogOverlay>

            <DialogContent>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ perspective: 1000, transformOrigin: "center center" }}
                className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
              >
                {children}
              </motion.div>
            </DialogContent>
          </>
        )}
      </AnimatePresence>
    </DialogPortal>
  );
}
