import { IconBrandGithub, IconBrandInstagram, IconBrandDiscord } from "@tabler/icons-react";
import { SiDevpost, SiGoogle } from "react-icons/si";
import logo from "@/assets/logo.svg";
import Galaxy from "./Galaxy";

export function Footer() {
    return (
        <footer className="relative w-full bg-viking-charcoal text-white py-20 overflow-hidden font-sans" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 15%)' }}>
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
                    <div className="flex items-center gap-8 mb-4">
                        <img src={logo} alt="VictorHacks Logo" className="h-32 md:h-56 w-auto object-contain filter drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]" />
                        <span className="text-3xl md:text-8xl font-heading font-black tracking-tight text-white drop-shadow-lg leading-none">VictorHacks</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-viking-maroon to-transparent mb-12" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-gray-500 text-sm font-body">
                    <p className="font-medium tracking-wide">© 2026 VictorHacks. All rights reserved.</p>

                    <p className="font-medium tracking-wide text-viking-gold/80">Made by Aaditya</p>

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
