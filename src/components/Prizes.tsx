
import { FocusCards } from "@/components/ui/focus-cards";
import { Vortex } from "@/components/ui/vortex";
import spoilsImage from "@/assets/spoils.png";
import greatHallImage from "@/assets/great_hall.png";
import longshipLaunchImage from "@/assets/longship_launch.png";
import runesAiImage from "@/assets/runes_ai.png";
import heroImage from "@/assets/hero_image.jpg";

export function Prizes() {
    const cards = [
        {
            title: "1st Place - Crown of Odin ($2,000)",
            src: spoilsImage,
        },
        {
            title: "2nd Place - Silver Axe ($1,000)",
            src: greatHallImage,
        },
        {
            title: "3rd Place - Bronze Shield ($500)",
            src: longshipLaunchImage,
        },
        {
            title: "Best UI Design",
            src: runesAiImage,
        },
        {
            title: "Best Use of AI",
            src: runesAiImage,
        },
        {
            title: "Best Mobile App",
            src: heroImage,
        },
    ];

    return (
        <section id="prizes" className="relative w-full py-24 bg-viking-charcoal overflow-hidden font-sans">
            {/* Background Vortex */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <Vortex
                    backgroundColor="transparent"
                    rangeY={800}
                    particleCount={500}
                    baseHue={45} // Gold-ish hue
                    className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
                >
                    {/* Content is wrapped by Vortex to be inside it, or we can just have it as absolute background if Vortex supports children properly as a container */}
                </Vortex>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tight bg-gradient-to-b from-viking-gold to-yellow-700 bg-clip-text text-transparent font-heading drop-shadow-[0_4px_0_rgba(0,0,0,1)] uppercase">
                        The Rewards of Valor
                    </h2>
                    <p className="mt-4 text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto font-body uppercase tracking-widest">
                        Treasures from the vault of Asgard await those worthy of victory.
                    </p>
                </div>

                {/* Prizes Grid */}
                <FocusCards cards={cards} />

            </div>
        </section>
    );
}
