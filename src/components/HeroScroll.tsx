import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImagePreloader } from "@/hooks/useImagePreloader";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

const getImagePath = (index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/sequence-1/ezgif-frame-${frameNumber}.jpg`;
};

export const HeroScroll: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { images, isLoaded } = useImagePreloader(FRAME_COUNT, getImagePath);

    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Render function: Draws a specific frame ensuring aspect-fill
        const renderFrame = (index: number) => {
            if (!images[index]) return;
            const img = images[index];

            // Resize internal canvas to display size
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Draw initial frame
        renderFrame(0);

        // Define a state object for GSAP to tween
        const frameState = { frame: 0 };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true, // Smooth, exact syncing to scroll position
            onUpdate: (self) => {
                // Determine the current integer frame
                const nextFrame = Math.round(self.progress * (FRAME_COUNT - 1));
                if (frameState.frame !== nextFrame) {
                    frameState.frame = nextFrame;
                    // Only request drawing if the frame actually changes
                    requestAnimationFrame(() => renderFrame(frameState.frame));
                }
            }
        });

        // Keep canvas responsive without re-initializing ScrollTrigger
        const handleResize = () => renderFrame(frameState.frame);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            trigger.kill();
        };
    }, [isLoaded, images]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505] font-sans">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {/* Loader */}
                {!isLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050505]">
                        <div className="text-white tracking-[0.3em] uppercase text-xs animate-pulse font-light">
                            Initializing Sequence [01]
                        </div>
                    </div>
                )}

                {/* Scrubbing Visualizer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full object-cover"
                    style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.5s ease" }}
                />

                {/* Gradient vignette for true dark luxury aesthetics */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/40 pointer-events-none" />

                {/* Final Frame Typography Reveal */}
                <div className="relative z-30 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ margin: "-100% 0px -100px 0px" }} // Triggers near the very end of the sticky section
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="text-center"
                    >
                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-light text-white uppercase tracking-[0.25em] leading-none mb-6 text-shadow-xl font-heading">
                            VICTOR HACKS
                        </h1>
                        <p className="text-sm md:text-xl text-viking-gold tracking-[0.4em] uppercase font-bold">
                            04.11 — 04.12
                        </p>
                        <div className="h-[1px] w-24 bg-white/30 mx-auto mt-8 mb-6" />
                        <p className="text-xs md:text-sm text-neutral-400 tracking-[0.2em] uppercase font-light">
                            The Nexus of Innovation
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
