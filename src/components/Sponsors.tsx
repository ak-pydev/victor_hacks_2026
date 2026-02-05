import { motion } from "motion/react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Lightning from "./ui/Lightning";

const sponsors = [
    {
        tier: "Alpha",
        items: [
            { name: "Sponsor 1", logo: "https://via.placeholder.com/150/ffffff/000000?text=Alpha+1" },
            { name: "Sponsor 2", logo: "https://via.placeholder.com/150/ffffff/000000?text=Alpha+2" },
        ]
    },
    {
        tier: "Beta",
        items: [
            { name: "Sponsor 3", logo: "https://via.placeholder.com/150/ffffff/000000?text=Beta+1" },
            { name: "Sponsor 4", logo: "https://via.placeholder.com/150/ffffff/000000?text=Beta+2" },
            { name: "Sponsor 5", logo: "https://via.placeholder.com/150/ffffff/000000?text=Beta+3" },
        ]
    },
    {
        tier: "Gamma",
        items: [
            { name: "Sponsor 6", logo: "https://via.placeholder.com/150/ffffff/000000?text=Gamma+1" },
            { name: "Sponsor 7", logo: "https://via.placeholder.com/150/ffffff/000000?text=Gamma+2" },
            { name: "Sponsor 8", logo: "https://via.placeholder.com/150/ffffff/000000?text=Gamma+3" },
            { name: "Sponsor 9", logo: "https://via.placeholder.com/150/ffffff/000000?text=Gamma+4" },
        ]
    }
];

export function Sponsors() {
    return (
        <section id="sponsors" className="relative w-full bg-neutral-950 py-24 px-4 overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-40">
                <Lightning hue={200} speed={0.5} intensity={1.5} size={0.8} />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 mb-4">
                        The Treasury
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Our campaign is fueled by the generosity of these powerful allies.
                    </p>
                </motion.div>

                <div className="flex flex-col gap-12">
                    {sponsors.map((tier, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="flex flex-col items-center gap-8"
                        >
                            <h3 className="text-xl md:text-2xl font-semibold text-neutral-500 uppercase tracking-widest">
                                {tier.tier} Tier
                            </h3>
                            <div className="flex flex-row items-center justify-center w-full">
                                <AnimatedTooltip
                                    items={tier.items.map((item, i) => ({
                                        id: i,
                                        name: item.name,
                                        designation: tier.tier,
                                        image: item.logo,
                                    }))}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
