import MagicBento from "@/components/MagicBento";
import { Vortex } from "@/components/ui/vortex";
import {
    IconBrain,
    IconChartBar,
    IconCurrencyDollar,
    IconHeart,
    IconSoup,
} from "@tabler/icons-react";
import ElevenLabsLogo from "@/assets/sponsors/elevenlabs.svg?url";
import FeatherlessLogo from "@/assets/sponsors/featherless-full-dark.svg?url";

export function Tracks() {
    return (
        <section id="tracks" className="relative w-full min-h-screen overflow-hidden bg-black">
            <div className="absolute inset-0 w-full h-full">
                <Vortex
                    backgroundColor="black"
                    rangeY={800}
                    particleCount={500}
                    baseHue={200}
                    containerClassName="w-full h-full"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full py-20 px-4 md:px-10">
                <h2 className="text-4xl md:text-6xl font-bold font-heading text-center mb-16 text-viking-gold drop-shadow-[0_0_15px_rgba(255,165,0,0.5)]">
                    Choose your Track
                </h2>

                <MagicBento
                    items={[
                        {
                            title: "Best MVP: Blue North",
                            label: "Blue North Sponsor Prize",
                            description: "Awarded to the best Minimum Viable Product built during the hackathon.",
                            icon: <IconBrain className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1 lg:col-span-1"
                        },
                        {
                            title: "Best Overall Project",
                            label: "Grand Prize",
                            description: "The most outstanding project of VictorHacks 2026.",
                            icon: <IconChartBar className="h-6 w-6" />,
                            colSpan: 2,
                            className: "md:col-span-1 lg:col-span-2"
                        },
                        {
                            title: "The Bifröst Bridge (Featherless.ai)",
                            label: "Generative AI & LLMs",
                            description: "Content: Conference access for all participants for one month.\n\nPrize Sponsorship:\n1st Prize: Featherless Scale Plan worth $300\n2nd Prize: Featherless Scale Plan worth $150\n3rd Prize: Featherless Scale Plan worth $75",
                            icon: undefined,
                            logo: (
                                <img src={FeatherlessLogo} alt="Featherless Logo" className="w-48 md:w-72 mx-auto mb-4 object-contain opacity-90" />
                            ),
                            textAutoHide: false,
                            descriptionClassName: "text-base",
                            colSpan: 2,
                            className: "md:col-span-2 lg:col-span-2"
                        },
                        {
                            title: "Voice of the Gods",
                            label: "Best with ElevenLabs",
                            description: "For all attendees:\n• 1 month free of our Creator tier (normally $22/month)\n\nFor the overall winning team:\n• Each member receives 3 months of our Pro tier ($99/month)\n\nFor the \"Best Project Built with ElevenLabs\":\n• Each team member receives 6 months of our Scale tier ($330/month)",
                            icon: undefined,
                            logo: (
                                <img src={ElevenLabsLogo} alt="ElevenLabs Logo" className="w-48 md:w-72 mx-auto mb-4 object-contain opacity-90" />
                            ),
                            textAutoHide: false,
                            descriptionClassName: "text-sm",
                            colSpan: 1,
                            className: "md:col-span-2 lg:col-span-1 elevenlabs-card"
                        }
                    ]}
                />

            </div>
        </section>
    );
}
