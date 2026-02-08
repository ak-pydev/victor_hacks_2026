

import { useState, useEffect } from "react";
import heroImage from "@/assets/hero_image.jpg";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from "motion/react";
import { LoginModal } from "@/components/LoginModal";

const TARGET_DATE = new Date("2026-04-12T00:00:00");

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const calculateTimeLeft = (): TimeLeft => {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

export function Hero({ session, isRegistered }: { session: any, isRegistered: boolean }) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSagaDetails = () => {
        if (!session) {
            setIsLoginModalOpen(true);
        } else if (isRegistered) {
            setIsComingSoonOpen(true);
        } else {
            // Should theoretically be handled by App.tsx redirection, but safe fallback
            window.location.reload();
        }
    }

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden font-sans">
            {/* Background removed for ParallaxWrapper */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
            <ComingSoonModal isOpen={isComingSoonOpen} onClose={() => setIsComingSoonOpen(false)} />

            <div className="relative z-10 w-full">
                <ContainerScroll
                    titleComponent={
                        <div className="flex flex-col items-center justify-center p-4">
                            {/* Countdown */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-4 mb-8"
                            >
                                <TimeBlock value={timeLeft.days} label="DAYS" />
                                <TimeBlock value={timeLeft.hours} label="HRS" />
                                <TimeBlock value={timeLeft.minutes} label="MINS" />
                                <TimeBlock value={timeLeft.seconds} label="SECS" />
                            </motion.div>

                            <HeroTitle />

                            <h2 className="text-xl md:text-4xl font-bold text-white mt-2 tracking-[0.2em] font-body uppercase text-shadow-sm text-center">
                                The Spoils of Victory
                            </h2>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mt-10 w-full px-4">
                                {!isRegistered && (
                                    <Button
                                        onClick={() => setIsLoginModalOpen(true)}
                                        className="bg-viking-crimson hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-none border-2 border-viking-gold shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-transform active:translate-y-1 active:shadow-none uppercase tracking-widest w-full md:w-auto"
                                    >
                                        Join the Raid
                                    </Button>
                                )}
                                <Button
                                    onClick={() => window.open("https://forms.gle/2agGa7yhTyyroLNs7", "_blank")}
                                    className="bg-viking-leather hover:bg-viking-charcoal text-white font-bold text-lg px-8 py-6 rounded-none border-2 border-viking-gold shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-transform active:translate-y-1 active:shadow-none uppercase tracking-widest w-full md:w-auto"
                                >
                                    Become an Ally
                                </Button>
                                <Button
                                    onClick={handleSagaDetails}
                                    variant="outline"
                                    className="bg-transparent text-viking-gold border-2 border-viking-gold hover:bg-viking-gold/10 font-bold text-lg px-8 py-6 rounded-none uppercase tracking-widest w-full md:w-auto"
                                >
                                    {session && isRegistered ? "Enter Saga" : "Saga Details"}
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <img
                        src={heroImage}
                        alt="hero"
                        className="mx-auto rounded-none object-cover h-full object-center md:object-left-top w-full border-4 border-viking-gold/50"
                        draggable={false}
                        fetchPriority="high"
                    />
                </ContainerScroll>
            </div >
        </section >
    );
}

function ComingSoonModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-viking-charcoal border-2 border-viking-gold shadow-[0_0_50px_rgba(251,191,36,0.3)] p-8 text-center"
                    >
                        {/* Decorative Corner Borders */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-viking-gold z-10"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-viking-gold z-10"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-viking-gold z-10"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-viking-gold z-10"></div>

                        <h3 className="text-3xl font-heading text-viking-gold uppercase mb-4 drop-shadow-sm">Prepare Yourself</h3>
                        <p className="text-white text-lg font-sans mb-6 leading-relaxed">
                            The battle is on the way! Sharpen your axes and ready your mind. The saga will begin shortly.
                        </p>
                        <Button
                            onClick={onClose}
                            className="bg-viking-crimson hover:bg-red-800 text-white font-bold uppercase tracking-widest border border-viking-gold"
                        >
                            Acknowledge
                        </Button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-viking-leather border-2 border-viking-gold p-2 md:p-3 min-w-[60px] md:min-w-[80px] shadow-[4px_4px_0px_0px_#000]">
        <span className="text-2xl md:text-3xl font-heading text-white">{String(value).padStart(2, '0')}</span>
        <span className="text-[8px] md:text-[10px] font-bold text-viking-gold tracking-widest">{label}</span>
    </div>
);


const HeroTitle = () => {
    const { scrollY } = useScroll();
    const shadowY = useTransform(scrollY, [0, 500], [4, 20]);
    const shadowBlur = useTransform(scrollY, [0, 500], [0, 10]);

    return (
        <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
                textShadow: useMotionTemplate`0px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.8)`,
                willChange: "transform, opacity"
            }}
            className="text-4xl md:text-6xl lg:text-9xl font-heading text-transparent bg-clip-text bg-gradient-to-b from-viking-gold to-yellow-600 filter text-center leading-tight"
        >
            VICTOR HACKS
        </motion.h1>
    );
};
