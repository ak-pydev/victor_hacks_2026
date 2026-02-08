import MagicBento from "@/components/MagicBento";
import { Vortex } from "@/components/ui/vortex";
import {
    IconBrain,
    IconChartBar,
    IconCurrencyDollar,
    IconHeart,
    IconRocket,
    IconSoup,
    IconVolume,
} from "@tabler/icons-react";

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
                    Pick Your Path
                </h2>

                <MagicBento
                    items={[
                        {
                            title: "Odin’s Insight",
                            label: "Most Technically Impressive",
                            description: "Celebrates the most complex \"Seidr\" (magic) implementations, deep neural networks, or raw engineering power.",
                            icon: <IconBrain className="h-6 w-6" />,
                        },
                        {
                            title: "The Merchant’s Voyage",
                            label: "Best Business Plan",
                            description: "For the project with the most scalable model and a clear market \"raiding\" strategy.",
                            icon: <IconCurrencyDollar className="h-6 w-6" />,
                            className: "md:col-span-1"
                        },
                        {
                            title: "The Midgard Shield",
                            label: "Best Social Impact",
                            description: "Dedicated to solutions that protect the community, environment, or solve humanitarian challenges.",
                            icon: <IconHeart className="h-6 w-6" />,
                        },

                        {
                            title: "The Bifröst Bridge",
                            label: "Generative AI & LLMs",
                            description: "New Track. Focuses on using Gen AI to bridge the gap between human intent and machine execution—think AI agents, fine-tuned models.",
                            icon: <IconRocket className="h-6 w-6" />,
                        },
                        {
                            title: "The Valkyrie’s Choice",
                            label: "People's Choice",
                            description: "The project that earns the most favor from the collective \"shield-wall\" of attendees.",
                            icon: <IconChartBar className="h-6 w-6" />,
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
                            description: "Most innovative use of ElevenLabs' voice AI technology to bring applications to life.",
                            icon: <IconVolume className="h-6 w-6" />,
                            colSpan: 1,
                            className: "md:col-span-1"
                        }
                    ]}
                />
            </div>
        </section>
    );
}
