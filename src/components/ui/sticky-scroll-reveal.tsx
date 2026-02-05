"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <motion.div
      className="relative flex justify-center space-x-10 rounded-md p-10"
      ref={ref}
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20 mb-40">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  color: activeCard === index ? "#fbbf24" : "#7f1d1d", // Viking Gold vs Faded Crimson
                }}
                className="text-3xl font-bold font-heading uppercase tracking-widest"
              >
                {item.title}
              </motion.h2>
              <div className="mt-8">
                {activeCard === index ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-xl font-body text-slate-300 leading-relaxed max-w-sm"
                  >
                    {item.description}
                  </motion.p>
                ) : (
                  <p className="text-xl font-body text-[#7f1d1d] leading-relaxed max-w-sm blur-[1px]">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        className={cn(
          "sticky top-20 hidden h-80 w-[30rem] overflow-hidden rounded-xl bg-transparent lg:block",
          contentClassName,
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, scale: 0.9, filter: "sepia(1) contrast(1.5)" }}
            animate={{ opacity: 1, scale: 1, filter: "sepia(0.5) contrast(1.2)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "sepia(1)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="w-full h-full"
          >
            {content[activeCard].content ?? null}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
