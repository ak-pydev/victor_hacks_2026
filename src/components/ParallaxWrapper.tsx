import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export const ParallaxWrapper = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Background parallax movement
    // Move y from 0% to 50% as the container scrolls full height
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

    // Opacity fade out towards the end if needed, or keep it consistent
    const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {/* Parallax Background Layer Container - Clips the background but not the main flow */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <motion.div
                    style={{ y: backgroundY, opacity }}
                    className="absolute inset-0 w-full h-[150%]"
                >
                    {/* Deep Space Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-viking-charcoal via-viking-maroon/20 to-viking-charcoal" />

                    {/* Stars / Dust Texture */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40 mix-blend-screen" />

                    {/* Optional: Radial Glows */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-viking-crimson/10 rounded-full blur-3xl opacity-50" />
                </motion.div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
