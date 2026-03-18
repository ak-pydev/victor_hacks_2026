import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImagePreloader } from "@/hooks/useImagePreloader";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;

const getImagePath = (index: number) => {
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/sequence-2/ezgif-frame-${frameNumber}.jpg`;
};

const scheduleData = [
    { threshold: 0.1, time: "1:30 PM", activity: "Check-in & Registration", location: "Health Innovation Center / Founders Hall", notes: "Badges and swag distribution." },
    { threshold: 0.2, time: "2:30 PM", activity: "Opening Ceremony", location: "Main Auditorium", notes: "Welcome remarks by Person and Person." },
    { threshold: 0.3, time: "3:00 PM", activity: "Team Formation", location: "Common Area", notes: "Networking and finding teammates." },
    { threshold: 0.4, time: "3:30 PM", activity: "Hacking Begins", location: "Hacking Space", notes: "The 24-hour sprint starts." },
    { threshold: 0.5, time: "6:00 PM", activity: "Dinner Service", location: "Cafeteria", notes: "Fuel up for the night." },
    { threshold: 0.6, time: "8:00 PM", activity: "Workshop", location: "Workshop Room 1", notes: "Deep dive with Person on File." },
    { threshold: 0.7, time: "10:00 PM", activity: "Late Night Snack", location: "Hacking Space", notes: "Midnight caffeine and snacks." },
    { threshold: 0.8, time: "11:00 PM", activity: "Mentor Check-in", location: "Health Innovation Center / Founders Hall", notes: "Assistance and guidance available." },
];

export const ScheduleMorph: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { images, isLoaded } = useImagePreloader(FRAME_COUNT, getImagePath);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        if (!isLoaded || images.length === 0 || !canvasRef.current || !containerRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const renderFrame = (index: number) => {
            if (!images[index]) return;
            const img = images[index];

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

        renderFrame(0);
        const frameState = { frame: 0 };

        const trigger = ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                const nextFrame = Math.round(self.progress * (FRAME_COUNT - 1));
                if (frameState.frame !== nextFrame) {
                    frameState.frame = nextFrame;
                    requestAnimationFrame(() => renderFrame(frameState.frame));
                }
            }
        });

        const handleResize = () => renderFrame(frameState.frame);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            trigger.kill();
        };
    }, [isLoaded, images]);

    return (
        <section ref={containerRef} className="relative h-[800vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {!isLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050505]">
                        <div className="text-[#00F0FF] tracking-[0.3em] uppercase text-xs animate-pulse font-mono">
                            Loading Schedule Matrix...
                        </div>
                    </div>
                )}

                {/* Scrubbing Visualizer */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full object-cover"
                    style={{ opacity: isLoaded ? 0.4 : 0, transition: "opacity 0.5s ease", filter: "blur(2px) contrast(1.2)" }}
                />

                <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent pointer-events-none" />

                {/* Scrollytelling Timeline Cards */}
                <div className="relative z-30 w-full h-full max-w-7xl mx-auto px-6 lg:px-24 flex flex-col justify-center pointer-events-none">

                    {/* Fixed Headers */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="absolute top-24 left-6 lg:left-24"
                    >
                        <h2 className="text-sm tracking-[0.4em] text-neutral-500 uppercase font-light">Victor Hacks Timeline</h2>
                        <h3 className="text-3xl lg:text-5xl tracking-[0.2em] uppercase font-bold text-white mt-2">Day 1: Saturday</h3>
                    </motion.div>

                    {/* Event Stack */}
                    <div className="relative w-full max-w-xl">
                        {scheduleData.map((item, index) => {
                            // Calculate opacity based on scroll proximity to the threshold
                            const opacity = useTransform(
                                scrollYProgress,
                                [item.threshold - 0.1, item.threshold, item.threshold + 0.1],
                                [0, 1, 0]
                            );

                            // Calculate horizontal drift for entry
                            const xOffset = useTransform(
                                scrollYProgress,
                                [item.threshold - 0.1, item.threshold],
                                [-50, 0]
                            );

                            return (
                                <motion.div
                                    key={index}
                                    style={{ opacity, x: xOffset }}
                                    className="absolute top-1/2 -translate-y-1/2 w-full left-0 origin-left"
                                >
                                    <div className="border-l-2 border-[#00F0FF] pl-8 py-2 bg-black/40 backdrop-blur-sm shadow-[10px_0_30px_rgba(0,240,255,0.05)]">
                                        <div className="text-xl font-mono text-[#00F0FF] tracking-widest mb-2">{item.time}</div>
                                        <h4 className="text-4xl lg:text-5xl font-bold text-white uppercase tracking-[0.1em] leading-none mb-4">
                                            {item.activity}
                                        </h4>
                                        <div className="flex items-center text-xs lg:text-sm text-neutral-400 uppercase tracking-widest mb-2">
                                            <span className="inline-block w-2 h-2 rounded-full bg-neutral-600 mr-3" />
                                            {item.location}
                                        </div>
                                        <p className="text-neutral-500 tracking-wide mt-4 border-t border-white/10 pt-4">
                                            {item.notes}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
