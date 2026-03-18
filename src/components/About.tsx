import gdgBanner from "@/assets/gdg_assets/gdg-buildwithai.png";
import elevenLabsLogo from "@/assets/sponsors/elevenlabs.svg";
import featherLessLogo from "@/assets/sponsors/featherless-full-dark.svg";
import dscClubLogo from "@/assets/sponsors/dsc_club_logo.png";
import githubLogo from "@/assets/sponsors/github-logo.svg";
import googleLogo from "@/assets/sponsors/google.svg";
import mlhLogo from "@/assets/sponsors/mlhlogo.svg";
import pureButtonsLogo from "@/assets/sponsors/purebuttons.svg";

export function About() {
    return (
        <section id="about" className="relative w-full py-24 px-6 md:px-12 bg-black text-white overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Content */}
                <div className="text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-viking-ice drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                        The Saga of VictorHacks
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl text-neutral-300 leading-relaxed font-body">
                        <p>
                            VictorHacks is a 24-hour in-person student hackathon at Northern Kentucky University, taking place on April 18-19 at the <a href="https://share.google/OGmpkhPEjDGdEnqKE" target="_blank" rel="noopener noreferrer" className="text-viking-gold hover:text-viking-ice transition-colors underline decoration-viking-gold/30 underline-offset-4">Health Innovation Center / Founders Hall</a>.
                            We invite you to join a shield-wall of motivated students for a legendary weekend of code, community, and innovation!
                        </p>
                        <p>
                            You don't have to be a computer science major or an expert to attend; like any great raid, we need a diverse crew.
                            It is a journey for students of all skill levels to build, learn, and conquer together.
                        </p>
                    </div>
                </div>

                {/* Banner Image */}
                <div className="w-full flex justify-center mb-8 mt-12 rounded-lg overflow-hidden">
                    <img
                        src={gdgBanner}
                        alt="Google Developer Groups Build with AI Banner"
                        className="w-full max-w-4xl h-auto object-contain"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Sponsors Section */}
                <div className="w-full flex flex-col items-center justify-center mt-12 pt-12 border-t border-white/10">
                    <h3 className="text-xl md:text-2xl font-bold font-heading text-neutral-500 tracking-[0.2em] uppercase mb-12">
                        Supported By
                    </h3>
                    <div className="flex flex-col items-center justify-center gap-12 w-full mt-4">
                        <div className="opacity-70 hover:opacity-100 transition-opacity duration-500">
                            <img src={googleLogo} alt="Google" className="h-24 md:h-32 w-auto object-contain" />
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-70 hover:opacity-100 transition-opacity duration-500 mt-4">
                            <img src={elevenLabsLogo} alt="ElevenLabs" className="h-16 md:h-24 w-auto object-contain filter brightness-0 invert" />
                            <img src={featherLessLogo} alt="Featherless.ai" className="h-10 md:h-14 w-auto object-contain filter brightness-0 invert" />
                            <img src={dscClubLogo} alt="Developer Student Clubs" className="h-12 md:h-16 w-auto object-contain" />
                            <img src={githubLogo} alt="GitHub" className="h-10 md:h-14 w-auto object-contain filter brightness-0 invert" />
                            <img src={mlhLogo} alt="MLH" className="h-14 md:h-20 w-auto object-contain filter brightness-0 invert" />
                            <img src={pureButtonsLogo} alt="PureButtons" className="h-10 md:h-14 w-auto object-contain filter brightness-0 invert" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
