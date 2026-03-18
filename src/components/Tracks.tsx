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
                            title: "Odin’s Insight",
                            label: "Most Technically Impressive",
                            description: "Celebrates the most complex \"Seidr\" (magic) implementations, deep neural networks, or raw engineering power.",
                            icon: <IconBrain className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        },
                        {
                            title: "The Merchant’s Voyage",
                            label: "Best Business Plan",
                            description: "For the project with the most scalable model and a clear market \"raiding\" strategy.",
                            icon: <IconCurrencyDollar className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        },
                        {
                            title: "The Midgard Shield",
                            label: "Best Social Impact",
                            description: "Dedicated to solutions that protect the community, environment, or solve humanitarian challenges.",
                            icon: <IconHeart className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        },
                        {
                            title: "The Bifröst Bridge (Featherless.ai)",
                            label: "Generative AI & LLMs",
                            description: "Content: Conference access for all participants for one month.\n\nPrize Sponsorship:\n1st Prize: Featherless Scale Plan worth $300\n2nd Prize: Featherless Scale Plan worth $150\n3rd Prize: Featherless Scale Plan worth $75",
                            icon: undefined,
                            logo: (
                                <img src={FeatherlessLogo} alt="Featherless Logo" className="w-72 mx-auto mb-4 object-contain opacity-90" />
                            ),
                            textAutoHide: false,
                            descriptionClassName: "text-base",
                            colSpan: 2,
                            className: "md:col-span-2"
                        },
                        {
                            title: "The Valkyrie’s Choice",
                            label: "People's Choice",
                            description: "The project that earns the most favor from the collective \"shield-wall\" of attendees.",
                            icon: <IconChartBar className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        },
                        {
                            title: "Ragnarök’s Chaos",
                            label: "Surprise Track",
                            description: "A hidden track revealed mid-competition to challenge raiders with a sudden technical pivot.",
                            icon: <IconSoup className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        },
                        {
                            title: "Voice of the Gods",
                            label: "Best with ElevenLabs",
                            description: "For all attendees:\n• 1 month free of our Creator tier (normally $22/month)\n\nFor the overall winning team:\n• Each member receives 3 months of our Pro tier ($99/month)\n\nFor the \"Best Project Built with ElevenLabs\":\n• Each team member receives 6 months of our Scale tier ($330/month)",
                            icon: undefined,
                            logo: (
                                <img src={ElevenLabsLogo} alt="ElevenLabs Logo" className="w-72 mx-auto mb-4 object-contain opacity-90" />
                            ),
                            textAutoHide: false,
                            descriptionClassName: "text-sm",
                            colSpan: 2,
                            className: "md:col-span-2 elevenlabs-card"
                        }
                    ]}
                />

            </div>
        </section>
    );
}
