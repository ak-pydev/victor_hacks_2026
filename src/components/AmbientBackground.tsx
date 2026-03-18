import React from "react";

export const AmbientBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 z-[-10] w-full h-full pointer-events-none bg-[#050505] overflow-hidden">
            {/* Deep static blackout base */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* Very slow moving, massive radial blur to create "tech-luxury" volumetric depth */}
            <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#00F0FF]/[0.02] blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]" />
            <div className="absolute top-[40%] right-[5%] w-[50vw] h-[50vw] rounded-full bg-viking-gold/[0.015] blur-[150px] mix-blend-screen animate-pulse duration-[15000ms]" />
            <div className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-white/[0.01] blur-[100px] mix-blend-screen animate-pulse duration-[12000ms]" />

            {/* Absolute text-protection layer */}
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>
    );
};
