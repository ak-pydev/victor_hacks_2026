import React from "react";
import { motion } from "framer-motion";

const scheduleData = [
    {
        day: "Day 1: Saturday, April 18",
        events: [
            { time: "1:00 PM", activity: "Organizer Check-in", location: "NKU Health Innovation Center", notes: "" },
            { time: "2:00 PM", activity: "Hacker Check-in", location: "NKU Health Innovation Center", notes: "" },
            { time: "2:00 PM - 3:00 PM", activity: "Hacker Room Set-up. Coding Begins.", location: "NKU Health Innovation Center", notes: "Doors open for participants" },
            { time: "3:00 PM - 3:30 PM", activity: "Session 1, Blue North", location: "", notes: "Presenter: Raniya Digankar" },
            { time: "4:00 PM - 5:00 PM", activity: "Anudeep Bhatina Mentorship Session", location: "", notes: "" },
            { time: "4:00 PM - 5:30 PM", activity: "Lunch/Dinner Serves", location: "", notes: "" },
            { time: "5:00 PM - 6:00 PM", activity: "MLH Session", location: "", notes: "Hosted by MLH representative" },
            { time: "8:00 PM", activity: "Snacks/Energy Drinks", location: "", notes: "" },
        ]
    },
    {
        day: "Day 2: Sunday, April 19",
        events: [
            { time: "8:00 AM", activity: "Coffee, Granola Bars", location: "", notes: "" },
            { time: "9:00 AM", activity: "Pizza Serves (Brunch) / MLH Session 2", location: "", notes: "" },
            { time: "10:00 AM", activity: "Energy Drinks, Snacks", location: "", notes: "" },
            { time: "1:00 PM", activity: "Coding Ends", location: "Online Platform", notes: "All submissions due by this time." },
            { time: "2:30 PM", activity: "Judging Ends", location: "", notes: "Judges deliberate and finalize scores." },
            { time: "3:00 PM", activity: "Results Overview", location: "Main Auditorium", notes: "Awards ceremony and closing remarks." },
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

export const SagaSchedule: React.FC = () => {
    return (
        <section className="relative min-h-screen bg-[#050505] text-white py-24 selection:bg-viking-crimson">
            {/* Background Image Setup */}
            <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />
                <img
                    src="/saga_event_space.png"
                    alt="Event Space"
                    className="w-full h-full object-cover object-center translate-y-20 scale-105"
                />
                <div className="absolute inset-0 bg-black/60 z-10 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 lg:px-24">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] text-white mb-6">
                        Victor Hacks <span className="text-viking-gold font-bold">Run of Show</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl text-lg tracking-wide leading-relaxed">
                        This document outlines the operational schedule for the Victor Hacks Hackathon, taking place from April 18 to April 19.
                    </p>
                    <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-viking-gold/50 to-transparent mt-8" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Main Schedule Column */}
                    <div className="lg:col-span-2 space-y-16">
                        {scheduleData.map((dayData, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h3 className="text-2xl font-bold text-viking-gold uppercase tracking-widest mb-8 border-b border-white/10 pb-4">
                                    {dayData.day}
                                </h3>
                                <div className="space-y-6">
                                    {dayData.events.map((event, eIndex) => (
                                        <div key={eIndex} className="group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 p-6 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-viking-gold/30 transition-all duration-300 rounded-sm">
                                            <div className="md:col-span-3 text-sm font-mono text-viking-gold/80 pt-1 tracking-tight">
                                                {event.time}
                                            </div>
                                            <div className="md:col-span-4">
                                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-viking-gold transition-colors">{event.activity}</h4>
                                                <div className="flex items-center text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-neutral-700 mr-2" />
                                                    {event.location}
                                                </div>
                                            </div>
                                            <div className="md:col-span-5 text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4 md:border-t-0 md:pt-0">
                                                {event.notes}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar / Info Column */}
                    <div className="space-y-12">
                        {/* Contacts */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="p-8 border border-white/10 bg-black/40 backdrop-blur-md"
                        >
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">
                                Important Contacts
                            </h3>
                            <p className="text-sm text-neutral-400 mb-6">
                                Please reach out to the following individuals for support during the event.
                            </p>
                            <ul className="space-y-4">
                                {importantContacts.map((contact, cIndex) => (
                                    <li key={cIndex} className="flex flex-col">
                                        <span className="text-xs text-viking-gold uppercase tracking-wider">{contact.role}</span>
                                        <span className="text-md font-medium text-white">{contact.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Links */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="p-8 border border-white/10 bg-black/40 backdrop-blur-md"
                        >
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest mb-6">
                                Event Links
                            </h3>
                            <ul className="space-y-4">
                                {importantLinks.map((link, lIndex) => (
                                    <li key={lIndex}>
                                        <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">{link.label}</span>
                                        <a href={link.href} className="text-sm text-white hover:text-viking-gold underline decoration-white/30 underline-offset-4 transition-colors">
                                            {link.linkText}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};
