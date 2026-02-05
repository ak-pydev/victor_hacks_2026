import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useSpring, useTime } from "motion/react";
import { IconBrain, IconCoin, IconServer, IconCompass } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const tracks = [
    {
        id: 1,
        title: "AI & Seidr",
        subtitle: "The Magic of Intelligence",
        icon: <IconBrain className="w-8 h-8 text-cyan-400" />,
        color: "#22d3ee", // Cyan
        description: "Weave spells of logic and data. Build agents, models, and sentient systems.",
        angleOffset: 0,
    },
    {
        id: 2,
        title: "Web3 Voyages",
        subtitle: "Uncharted Ledgers",
        icon: <IconCoin className="w-8 h-8 text-viking-gold" />,
        color: "#fbbf24", // Viking Gold
        description: "Navigate the decentralized seas. Smart contracts, DeFi, and on-chain raiding.",
        angleOffset: (2 * Math.PI) / 3,
    },
    {
        id: 3,
        title: "Infrastructure Raids",
        subtitle: "Forging the Backbone",
        icon: <IconServer className="w-8 h-8 text-viking-crimson" />,
        color: "#991b1b", // Viking Crimson
        description: "Build the ships that carry us. Cloud, DevOps, and scalable backend systems.",
        angleOffset: (4 * Math.PI) / 3,
    },
];

const ORBIT_RADIUS_X = 350;
const ORBIT_RADIUS_Z = 150; // Elliptical orbit depth
const SPEED = 0.15; // Radians per second

export function Tracks() {
    return (
        <section id="tracks" className="relative w-full h-screen bg-viking-charcoal overflow-hidden flex flex-col items-center justify-center perspective-[1000px]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-viking-maroon/30 via-viking-charcoal to-viking-charcoal z-0" />

            <div className="absolute top-24 z-20 text-center">
                <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter drop-shadow-[0_4px_0_rgba(0,0,0,1)] font-heading">
                    Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-viking-crimson to-viking-gold">Path</span>
                </h2>
                <p className="text-viking-gold/80 text-xl font-heading mt-2">
                    The Compass Points to Glory
                </p>
            </div>

            <OrbitalSystem />
        </section>
    );
}

function OrbitalSystem() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement
    const springConfig = { damping: 25, stiffness: 70 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Time for orbit animation
    const time = useTime();
    const [paused, setPaused] = useState(false);


    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-full flex items-center justify-center transform-style-3d cursor-move pb-20"
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative flex items-center justify-center"
            >
                {/* Orbital Plane Visuals */}
                <div className="absolute inset-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-viking-maroon/20 rounded-full [transform:rotateX(70deg)]" />
                <div className="absolute inset-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-viking-crimson/10 rounded-full [transform:rotateX(70deg)]" />

                {/* The Core */}
                <Core />

                {/* Orbiting Runestones */}
                {tracks.map((track) => (
                    <Runestone
                        key={track.id}
                        track={track}
                        time={time}
                        paused={paused}
                        setPaused={setPaused}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function Core() {
    return (
        <div className="relative z-0 [transform-style:preserve-3d]">
            {/* Pulsing Glow */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-viking-gold/20 blur-3xl rounded-full"
            />

            {/* Vegvisir Compass */}
            <div className="relative w-24 h-24 bg-viking-leather border-2 border-viking-gold rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                <IconCompass className="w-16 h-16 text-viking-gold animate-spin-slow opacity-80" />
                <div className="absolute inset-0 border border-viking-gold/50 rounded-full animate-ping opacity-20" />
            </div>

            {/* 3D Vertical Beam */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-96 bg-gradient-to-b from-transparent via-viking-gold/50 to-transparent blur-sm" />
        </div>
    );
}

function Runestone({ track, time, paused, setPaused }: { track: any, time: any, paused: boolean, setPaused: (p: boolean) => void }) {
    // We calculate position manually to handle Z-index properly
    const [pos, setPos] = useState({ x: 0, y: 0, z: 0, scale: 1, zIndex: 0 });

    // Float animation handled by bobOffset

    useEffect(() => {
        const unsubscribe = time.on("change", (latest: number) => {
            if (paused) return; // Don't update position if paused

            // Normalize time to seconds
            const t = latest / 1000;
            const angle = t * SPEED + track.angleOffset;

            const x = Math.cos(angle) * ORBIT_RADIUS_X;
            const z = Math.sin(angle) * ORBIT_RADIUS_Z;

            // Calculate scale based on 'depth' (z position)
            // z ranges from -ORBIT_RADIUS_Z to +ORBIT_RADIUS_Z
            // We want scale to be smaller when far back (-z) and larger when close (+z)
            // Normalized Z (-1 to 1)
            const normZ = z / ORBIT_RADIUS_Z;
            const scale = 0.8 + (normZ + 1) * 0.2; // Ranges 0.8 to 1.2

            // Z-Index: If z > 0 (front), high z-index. If z < 0 (back), low z-index.
            const zIndex = z > 0 ? 20 : 5;

            setPos({ x, y: 0, z, scale, zIndex });
        });
        return unsubscribe;
    }, [time, track.angleOffset, paused]);

    // Bobbing effect
    const [bobOffset, setBobOffset] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setBobOffset(Math.sin(Date.now() / 500) * 10);
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="absolute left-1/2 top-1/2 w-64 -ml-32 -mt-20"
            style={{
                x: pos.x,
                y: pos.y + bobOffset, // Bobbing
                z: pos.z,
                scale: pos.scale,
                zIndex: pos.zIndex,
                transformStyle: "preserve-3d"
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            whileHover={{ scale: pos.scale * 1.1 }}
        >
            <div className={cn(
                "relative flex flex-col items-center p-6 rounded-xl bg-viking-leather border-4 transition-all duration-300 group",
                track.id === 1 ? "border-cyan-500/50 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]" :
                    track.id === 2 ? "border-viking-gold/50 hover:border-viking-gold hover:shadow-[0_0_30px_rgba(251,191,36,0.4)]" :
                        "border-viking-crimson/50 hover:border-viking-crimson hover:shadow-[0_0_30px_rgba(153,27,27,0.4)]"
            )}>
                {/* Floating Label */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-heading tracking-widest text-sm">{track.title}</span>
                </div>

                {/* Rune/Icon (Pulsing) */}
                <div className="mb-4 p-4 rounded-full bg-viking-charcoal border border-white/10 shadow-inner">
                    <motion.div
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {track.icon}
                    </motion.div>
                </div>

                <h3 className="text-xl font-bold text-white font-heading uppercase text-center mb-1 drop-shadow-md">
                    {track.title}
                </h3>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    {track.subtitle}
                </p>
                <div className="w-8 h-1 bg-gray-700 rounded-full mb-3" />
                <p className="text-xs text-gray-400 text-center font-body leading-relaxed">
                    {track.description}
                </p>
            </div>
        </motion.div>
    );
}
