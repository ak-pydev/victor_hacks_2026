import { IconBrandGithub, IconBrandInstagram, IconBrandDiscord, IconHexagon } from "@tabler/icons-react";
import { SiDevpost, SiGoogle } from "react-icons/si";
import Galaxy from "./Galaxy";

const links = [
    { name: "About", href: "#about" },
    { name: "Tracks", href: "#tracks" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FAQ", href: "#faq" },
    { name: "Rules", href: "#rules" },
    { name: "Code of Conduct", href: "#coc" },
];

export function Footer() {
    return (
        <footer className="relative w-full bg-viking-charcoal text-white py-20 overflow-hidden border-t-4 border-viking-maroon font-sans">
            {/* Background Galaxy Effect */}
            <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen">
                <Galaxy
                    transparent={true}
                    density={1.5}
                    speed={0.5}
                    rotationSpeed={0.05}
                    hueShift={0} // Keep generic or adjust to gold/red if possible
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Logo & Brand */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-viking-crimson rounded-xl border-2 border-viking-gold shadow-[0_0_20px_rgba(251,191,36,0.5)]">
                            <IconHexagon className="w-8 h-8 text-white fill-white" />
                        </div>
                        <span className="text-4xl font-heading font-black tracking-tight text-white drop-shadow-lg">VictorHacks</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="mb-16">
                    <ul className="flex flex-wrap justify-center gap-x-10 gap-y-6 text-center">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href={link.href}
                                    className="text-gray-400 hover:text-viking-gold transition-all duration-200 text-lg font-bold uppercase tracking-widest font-heading hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-viking-maroon to-transparent mb-12 border-t-2 border-dashed border-viking-gold/20" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-gray-500 text-sm font-body">
                    <p className="font-medium tracking-wide">© 2026 VictorHacks LLABC. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-viking-gold hover:scale-110 transition-all duration-300"><IconBrandGithub className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-viking-gold hover:scale-110 transition-all duration-300"><IconBrandInstagram className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-viking-gold hover:scale-110 transition-all duration-300"><IconBrandDiscord className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-viking-gold hover:scale-110 transition-all duration-300"><SiDevpost className="w-6 h-6" /></a>
                        <a href="#" className="hover:text-viking-gold hover:scale-110 transition-all duration-300"><SiGoogle className="w-6 h-6" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
