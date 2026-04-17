import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useImagePreloader } from "@/hooks/useImagePreloader";
import { SmoothScrollLayout } from "./SmoothScrollLayout";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 120;
const getSeq1Path = (index: number) => `/sequence-1/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;
const getSeq2Path = (index: number) => `/sequence-2/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

const scheduleData = [
    {
        day: "Day 1: Saturday, April 18",
        events: [
            { time: "1:30 PM", activity: "Check-in & Registration", location: "Health Innovation Center / Founders Hall", notes: "Attendees pick up badges, swag, and event materials." },
            { time: "2:30 PM", activity: "Opening Ceremony", location: "Main Auditorium", notes: "Welcome remarks by Person and Person." },
            { time: "3:00 PM", activity: "Team Formation & Networking", location: "Common Area", notes: "Facilitated activities." },
            { time: "3:30 PM", activity: "Hacking Begins", location: "Hacking Space", notes: "The 24-hour hacking period starts." },
            { time: "6:00 PM", activity: "Dinner Service", location: "Cafeteria", notes: "Provided meal." },
            { time: "8:00 PM", activity: "Workshop: Person", location: "Workshop Room 1", notes: "Topic: File" },
            { time: "10:00 PM", activity: "Late Night Snack", location: "Hacking Space", notes: "Light refreshments." },
            { time: "11:00 PM", activity: "Mentor Check-in", location: "Health Innovation Center / Founders Hall", notes: "Mentors circulate." },
        ]
    },
    {
        day: "Day 2: Sunday, April 19",
        events: [
            { time: "8:00 AM", activity: "Breakfast Service", location: "Cafeteria", notes: "Provided meal." },
            { time: "10:00 AM", activity: "Final Q&A Session", location: "Workshop Room 2", notes: "Last chance for technical questions." },
            { time: "11:30 AM", activity: "Hacking Ends", location: "Online Platform", notes: "Submit to Devpost." },
            { time: "11:30 AM", activity: "Judging Period", location: "Assigned Areas", notes: "Review submissions and interviews." },
            { time: "1:00 PM", activity: "Lunch Service", location: "Cafeteria", notes: "Provided meal." },
            { time: "2:00 PM", activity: "Closing Ceremony", location: "Main Auditorium", notes: "Keynote, awards, and remarks. Ends by 3:00 PM." },
        ]
    }
];

const importantContacts = [
    { role: "Lead Organizer", name: "Aaditya Khanal" },
    { role: "Volunteer Coordinator", name: "Gaurab Baral" },
    { role: "Technical Support", name: "Person" },
];

const importantLinks = [
    { label: "Directions", linkText: "Google Maps", href: "https://share.google/OGmpkhPEjDGdEnqKE" },
    { label: "Official Communication Channel", linkText: "File", href: "#" },
    { label: "Hackathon Rules", linkText: "File", href: "#" },
    { label: "Mentor Sign-up", linkText: "Calendar event", href: "#" },
];

export const SagaDetails: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const seq1 = useImagePreloader(FRAME_COUNT, getSeq1Path);
    const seq2 = useImagePreloader(FRAME_COUNT, getSeq2Path);

    const isLoaded = seq1.isLoaded && seq2.isLoaded;

    const isBlurred = new Date() < new Date("2026-04-11T00:00:00");

    useEffect(() => {
        if (!isLoaded || !seq1.images.length || !seq2.images.length || !canvasRef.current || !mainRef.current || !heroRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        // Calculate transition threshold based on DOM absolute heights
        // The hero section is 150vh. We want sequence-1 to finish exactly when Hero scrolls out.
        // The rest of the page covers sequence-2.
        const calculateThreshold = () => {
            if (!heroRef.current || !mainRef.current) return 0.4;
            // The point where Hero finishes scrolling (about 1.5 viewport heights) out of total scroll height
            const totalScrollable = mainRef.current.scrollHeight - window.innerHeight;
            if (totalScrollable <= 0) return 0.5;
            const heroScrollDistance = window.innerHeight * 1.5;
            return Math.min(0.8, heroScrollDistance / totalScrollable); // cap at 0.8 just in case
        };

        const renderFrame = (progress: number) => {
            const threshold = calculateThreshold();
            let img: HTMLImageElement;

            if (progress < threshold) {
                // Sequence 1 mapping
                const localP = progress / threshold;
                const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(localP * FRAME_COUNT)));
                img = seq1.images[frame];
            } else {
                // Sequence 2 mapping
                const localP = (progress - threshold) / (1 - threshold);
                const frame = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(localP * FRAME_COUNT)));
                img = seq2.images[frame];
            }

            if (!img) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

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

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        renderFrame(0);
        let currentProgress = 0;

        const trigger = ScrollTrigger.create({
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
                currentProgress = self.progress;
                requestAnimationFrame(() => renderFrame(currentProgress));
            }
        });

        const handleResize = () => {
            renderFrame(currentProgress);
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            trigger.kill();
        };
    }, [isLoaded, seq1.images, seq2.images]);

    return (
        <SmoothScrollLayout>
            <main ref={mainRef} className={`relative w-full ${isBlurred ? 'h-screen overflow-hidden' : 'overflow-x-hidden'} bg-[#050505] text-white selection:bg-[#00F0FF]`}>

                {isBlurred && (
                    <div className="fixed inset-0 z-[40] bg-black/40 backdrop-blur-xl flex flex-col items-center justify-center">
                        <div className="text-center p-8 border border-white/10 bg-[#050505]/60 shadow-[0_4px_24px_rgba(0,0,0,0.8)] rounded-sm">
                            <h2 className="text-2xl md:text-5xl font-light text-white uppercase tracking-[0.25em] mb-6 font-heading text-shadow-lg">Classified Information</h2>
                            <p className="text-[#00F0FF] tracking-[0.3em] uppercase text-xs md:text-sm font-bold animate-pulse">Decodes on April 11, 2026</p>
                        </div>
                    </div>
                )}

                {/* GLOBAL FIXED CANVAS */}
                <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
                    {!isLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-30">
                            <span className="text-[#00F0FF] text-xs font-mono uppercase tracking-[0.3em] animate-pulse">Initializing Interface...</span>
                        </div>
                    )}
                    <canvas
                        ref={canvasRef}
                        className="w-full h-full object-cover transition-opacity duration-1000"
                        style={{ opacity: isLoaded ? 1 : 0, filter: "brightness(1.5) contrast(1.1)" }}
                    />
                    {/* Persistent Vignette to guarantee text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/20" />

                    {/* Ambient Glow */}
                    <div className="absolute top-[30%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#00F0FF]/[0.02] blur-[100px] pointer-events-none" />
                </div>

                {/* Back button */}
                <button
                    onClick={onBack}
                    className="group fixed top-8 left-8 z-50 flex items-center gap-3 text-white uppercase tracking-widest text-xs font-bold hover:text-[#00F0FF] transition-all duration-300 font-sans border border-white/10 hover:border-[#00F0FF]/40 px-6 py-3 rounded-full backdrop-blur-xl bg-[#050505]/60 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                >
                    <span className="block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                    Return to base
                </button>

                {/* SCROLLING CONTENT LAYER */}
                <div className="relative z-10">

                    {/* Hero Section (Introduction) */}
                    <section ref={heroRef} className="relative h-[200vh]">
                        <div className="sticky top-0 h-screen flex flex-col items-center justify-center pointer-events-none">
                            <div className="text-center mt-32">
                                <h1 className="text-4xl md:text-6xl lg:text-8xl font-light text-white uppercase tracking-[0.25em] leading-none mb-6 text-shadow-xl font-heading">
                                    WELCOME TITANS
                                </h1>
                                <p className="text-xs md:text-xl text-[#00F0FF] tracking-[0.4em] uppercase font-bold text-shadow-md">
                                    04.18 — 04.19
                                </p>
                                <div className="h-[1px] w-24 bg-white/30 mx-auto mt-8 mb-10" />
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="animate-bounce text-[#00F0FF] opacity-60">
                                        ↓
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Schedule Section (Seamless flow directly after Hero) */}
                    <section className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24">
                        <div className="max-w-7xl mx-auto">

                            <div className="mb-24 text-center md:text-left">
                                <h2 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] text-white mb-6">
                                    Event <span className="text-[#00F0FF] font-bold">Timeline</span>
                                </h2>
                                <div className="h-[1px] w-full max-w-sm bg-gradient-to-r from-[#00F0FF]/50 to-transparent mt-8" />
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 lg:gap-24">

                                {/* Timeline Flow */}
                                <div className="xl:col-span-2 space-y-24">
                                    {scheduleData.map((dayData, index) => (
                                        <div key={index}>
                                            <h3 className="text-2xl font-bold text-[#00F0FF] uppercase tracking-widest mb-10 border-b border-white/10 pb-4 sticky top-6 backdrop-blur-md bg-[#050505]/30 z-20">
                                                {dayData.day}
                                            </h3>
                                            <div className="space-y-4">
                                                {dayData.events.map((event, eIndex) => (
                                                    <motion.div
                                                        initial={{ opacity: 0.3, x: -20, filter: "grayscale(100%)" }}
                                                        whileInView={{ opacity: 1, x: 0, filter: "grayscale(0%)" }}
                                                        viewport={{ margin: "-20% 0px -20% 0px" }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                        key={eIndex}
                                                        className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 md:p-8 bg-[#050505]/40 backdrop-blur-md border border-white/5 hover:bg-[#050505]/80 hover:border-[#00F0FF]/30 transition-all duration-500 rounded-sm shadow-[inset_0_1px_rgba(255,255,255,0.02)]"
                                                    >
                                                        {/* Animated Hover highlight bar */}
                                                        <div className="absolute left-0 top-1/2 bottom-1/2 w-1 bg-[#00F0FF] opacity-0 group-hover:top-0 group-hover:bottom-0 group-hover:opacity-100 transition-all duration-500 ease-out shadow-[0_0_10px_#00F0FF]" />

                                                        <div className="md:col-span-3 text-lg font-mono text-[#00F0FF]/80 tracking-tight flex items-center">
                                                            {event.time}
                                                        </div>
                                                        <div className="md:col-span-4 flex flex-col justify-center">
                                                            <h4 className="text-xl font-bold text-white mb-2 group-hover:text-[#00F0FF] transition-colors tracking-wide">{event.activity}</h4>
                                                            <div className="flex items-center text-xs text-neutral-500 uppercase tracking-widest font-semibold">
                                                                <span className="inline-block w-1.5 h-1.5 rounded-sm bg-neutral-600 mr-3 group-hover:bg-[#00F0FF] transition-colors" />
                                                                {event.location}
                                                            </div>
                                                        </div>
                                                        <div className="md:col-span-5 text-sm md:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4 md:border-t-0 md:pt-0 flex items-center tracking-wide group-hover:text-neutral-300 transition-colors">
                                                            {event.notes}
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Sidebar info floats as user scrolls */}
                                <div className="space-y-12">
                                    <div className="sticky top-32 space-y-8">

                                        {/* Contacts */}
                                        <div className="p-8 border border-white/10 bg-gradient-to-br from-[#050505]/80 to-black/90 backdrop-blur-xl hover:border-[#00F0FF]/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] rounded-sm">
                                            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                                                Important Contacts
                                            </h3>
                                            <ul className="space-y-6">
                                                {importantContacts.map((contact, cIndex) => (
                                                    <li key={cIndex} className="flex flex-col group/item transition-all">
                                                        <span className="text-[10px] text-[#00F0FF]/70 uppercase tracking-widest font-bold mb-1 group-hover/item:text-[#00F0FF] transition-colors">{contact.role}</span>
                                                        <span className="text-sm font-medium text-neutral-300 tracking-wide group-hover/item:text-white transition-colors">{contact.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Links */}
                                        <div className="p-8 border border-white/10 bg-gradient-to-br from-[#050505]/80 to-black/90 backdrop-blur-xl hover:border-[#00F0FF]/30 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_40px_rgba(0,0,0,0.5)] rounded-sm">
                                            <h3 className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-8 border-b border-white/10 pb-4">
                                                Event Links
                                            </h3>
                                            <ul className="space-y-6">
                                                {importantLinks.map((link, lIndex) => (
                                                    <li key={lIndex} className="group/item">
                                                        <span className="block text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2 group-hover/item:text-[#00F0FF]/70 transition-colors">{link.label}</span>
                                                        <a href={link.href} className="text-sm text-neutral-300 hover:text-white tracking-wide transition-colors flex items-center gap-2">
                                                            {link.linkText}
                                                            <span className="text-[#00F0FF] opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">&rarr;</span>
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </SmoothScrollLayout>
    );
};
