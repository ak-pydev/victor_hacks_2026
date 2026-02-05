import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { WobbleCard } from "@/components/ui/wobble-card";
import { motion } from "motion/react";
import runesAi from "@/assets/runes_ai.png";
import greatHall from "@/assets/great_hall.png";
import longshipLaunch from "@/assets/longship_launch.png";

export function About() {
    const runeAi = runesAi; // Fix variable name mismatch

    return (
        <section id="about" className="relative w-full py-20 bg-slate-950 overflow-hidden">
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-heading text-center mb-16 text-transparent bg-clip-text bg-gradient-to-br from-viking-gold to-white drop-shadow-[0_0_15px_rgba(251,191,36,0.3)] uppercase tracking-tight"
                >
                    The Saga Unfolds
                </motion.h2>

                <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[25rem]">
                    {/* 1. The Vision (Large Tile) */}
                    <BentoGridItem
                        className="md:col-span-2 md:row-span-1 p-0 border-transparent bg-transparent shadow-none hover:shadow-none hover:border-transparent "
                        header={
                            <WobbleCard containerClassName="h-full w-full" className="p-0 h-full">
                                <CardSpotlight className="h-full w-full flex flex-col justify-end p-8 border border-viking-crimson/30 bg-slate-950/50 backdrop-blur-sm" color="#f59e0b">
                                    <div className="absolute inset-0 z-0 opacity-30">
                                        <img src={runeAi} alt="Vision" className="w-full h-full object-cover grayscale contrast-125 mix-blend-overlay" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-heading text-viking-gold mb-2 uppercase tracking-wide">The Vision</h3>
                                        <p className="text-slate-300 font-body text-lg leading-relaxed">Forging the Future in the Fires of Tradition.</p>
                                    </div>
                                </CardSpotlight>
                            </WobbleCard>
                        }
                    />

                    {/* 2. The Raiders (Tall/Wide) */}
                    <BentoGridItem
                        className="md:col-span-1 md:row-span-1 p-0 border-transparent bg-transparent shadow-none hover:shadow-none hover:border-transparent"
                        header={
                            <WobbleCard containerClassName="h-full w-full" className="p-0 h-full">
                                <CardSpotlight className="h-full w-full flex flex-col justify-end p-8 border border-viking-crimson/30 bg-slate-950/50 backdrop-blur-sm" color="#991b1b">
                                    <div className="absolute inset-0 z-0 opacity-30">
                                        <img src={longshipLaunch} alt="Raiders" className="w-full h-full object-cover grayscale contrast-125 mix-blend-overlay" />
                                    </div>
                                    <div className="relative z-10">
                                        <h3 className="text-2xl font-heading text-white mb-2 uppercase tracking-wide">The Raiders</h3>
                                        <p className="text-slate-400 font-body text-base">A Global Gathering of 500+ Developers.</p>
                                    </div>
                                </CardSpotlight>
                            </WobbleCard>
                        }
                    />

                    {/* 3. The Bounty (Small Tile) */}
                    <BentoGridItem
                        className="md:col-span-1 md:row-span-1 p-0 border-transparent bg-transparent shadow-none hover:shadow-none hover:border-transparent"
                        header={
                            <WobbleCard containerClassName="h-full w-full" className="p-0 h-full">
                                <CardSpotlight className="h-full w-full flex flex-col justify-center items-center p-8 border border-viking-crimson/30 bg-slate-950/50 backdrop-blur-sm text-center" color="#fbbf24">
                                    <div className="relative z-10">
                                        <h3 className="text-5xl font-heading text-viking-gold mb-2 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">$50k</h3>
                                        <p className="text-slate-300 font-body text-sm uppercase tracking-widest mt-2">Legendary Loot</p>
                                    </div>
                                </CardSpotlight>
                            </WobbleCard>
                        }
                    />

                    {/* 4. The Arena (Standard Tile) */}
                    <BentoGridItem
                        className="md:col-span-2 md:row-span-1 p-0 border-transparent bg-transparent shadow-none hover:shadow-none hover:border-transparent"
                        header={
                            <WobbleCard containerClassName="h-full w-full" className="p-0 h-full">
                                <CardSpotlight className="h-full w-full flex flex-col justify-end p-8 border border-viking-crimson/30 bg-slate-950/50 backdrop-blur-sm" color="#991b1b">
                                    <div className="absolute inset-0 z-0 opacity-40">
                                        <img src={greatHall} alt="Arena" className="w-full h-full object-cover grayscale contrast-125 mix-blend-overlay" />
                                    </div>
                                    <div className="relative z-10 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-2xl font-heading text-white mb-1 uppercase tracking-wide">The Arena</h3>
                                            <p className="text-slate-400 font-body text-base">48 Hours of Non-stop Building.</p>
                                        </div>
                                        <div className="h-12 w-12 rounded-full border border-viking-gold/50 flex items-center justify-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-viking-gold">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h45m-4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </CardSpotlight>
                            </WobbleCard>
                        }
                    />

                </BentoGrid>
            </div>
        </section>
    );
}
