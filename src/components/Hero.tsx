

import { useState, useEffect } from "react";
import heroImage from "@/assets/hero_image.jpg";
import { Button } from "@/components/ui/button";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { motion } from "motion/react";

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

export function Hero() {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative flex flex-col items-center justify-center min-h-screen bg-transparent overflow-hidden font-sans">
            {/* Background removed for ParallaxWrapper */}

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

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-6xl md:text-9xl font-heading text-transparent bg-clip-text bg-gradient-to-b from-viking-gold to-yellow-600 drop-shadow-[0_4px_0_rgba(0,0,0,1)] filter"
                            >
                                VICTOR HACKS
                            </motion.h1>
                            <h2 className="text-2xl md:text-4xl font-bold text-white mt-2 tracking-[0.2em] font-body uppercase text-shadow-sm">
                                The Spoils of Victory
                            </h2>

                            <div className="flex gap-6 mt-10">
                                <Button className="bg-viking-crimson hover:bg-red-800 text-white font-bold text-lg px-8 py-6 rounded-none border-2 border-viking-gold shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-transform active:translate-y-1 active:shadow-none uppercase tracking-widest">
                                    Join the Raid
                                </Button>
                                <Button variant="outline" className="bg-transparent text-viking-gold border-2 border-viking-gold hover:bg-viking-gold/10 font-bold text-lg px-8 py-6 rounded-none uppercase tracking-widest">
                                    Saga Details
                                </Button>
                            </div>
                        </div>
                    }
                >
                    <img
                        src={heroImage}
                        alt="hero"
                        className="mx-auto rounded-none object-cover h-full object-left-top w-full border-4 border-viking-gold/50"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </section>
    );
}

const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-viking-leather border-2 border-viking-gold p-3 min-w-[80px] shadow-[4px_4px_0px_0px_#000]">
        <span className="text-3xl font-heading text-white">{String(value).padStart(2, '0')}</span>
        <span className="text-[10px] font-bold text-viking-gold tracking-widest">{label}</span>
    </div>
);


