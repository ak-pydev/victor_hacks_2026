import React, { useRef, useEffect } from "react";
import { useScroll, useTransform } from "framer-motion";
import { useImagePreloader } from "@/hooks/useImagePreloader";

const FRAME_COUNT = 120;

const getImagePath = (index: number) => {
    // Because index is 0-based, and frames are 001 to 120
    const frameNumber = String(index + 1).padStart(3, "0");
    return `/sequence-2/ezgif-frame-${frameNumber}.jpg`;
};

export const PlaneMorph: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { images, isLoaded } = useImagePreloader(FRAME_COUNT, getImagePath);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map the scroll progress (0-1) to the exact frame (0-119)
    const currentFrameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    useEffect(() => {
        if (!isLoaded || images.length === 0) return;

        const unsubscribe = currentFrameIndex.onChange((latestValue) => {
            const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(latestValue)));
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");

            if (canvas && ctx && images[frameIndex]) {
                const img = images[frameIndex];

                // Clear and draw image to fill the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Calculate aspect-fill dimensions
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
            }
        });

        // Draw the first frame initially
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const img = images[0];
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
        }

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                // Force redraw
                const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(currentFrameIndex.get())));
                const img = images[frameIndex];
                if (img && ctx) {
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
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        }
    }, [currentFrameIndex, images, isLoaded]);

    return (
        <section ref={containerRef} className="relative h-[400vh] bg-[#050505]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                {!isLoaded && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#050505]">
                        <div className="text-white tracking-widest uppercase text-sm animate-pulse font-sans">
                            Loading Structural Matrix...
                        </div>
                    </div>
                )}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-10 w-full h-full object-cover"
                />

            </div>
        </section>
    );
};
