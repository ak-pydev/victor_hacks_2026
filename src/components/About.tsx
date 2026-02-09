export function About() {
    return (
        <section id="about" className="relative w-full py-24 px-6 md:px-12 bg-black text-white overflow-hidden">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Banner Image */}
                <div className="w-full mb-8 rounded-lg overflow-hidden border-2 border-viking-gold/30 shadow-[0_0_30px_rgba(251,191,36,0.2)]">
                    <img
                        src="https://lmklpxjnzhxnlusoxzhl.supabase.co/storage/v1/object/public/images/banner.png"
                        alt="Victor Hacks Banner"
                        className="w-full h-auto"
                    />
                </div>

                {/* Content */}
                <div className="text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading text-viking-ice drop-shadow-[0_0_15px_rgba(0,210,255,0.5)]">
                        The Saga of VictorHacks
                    </h2>
                    <div className="space-y-6 text-lg md:text-xl text-neutral-300 leading-relaxed font-body">
                        <p>
                            VictorHacks is a 24-hour in-person student hackathon at Northern Kentucky University.
                            We invite you to join a shield-wall of motivated students for a legendary weekend of code, community, and innovation!
                        </p>
                        <p>
                            You don't have to be a computer science major or an expert to attend; like any great raid, we need a diverse crew.
                            It is a journey for students of all skill levels to build, learn, and conquer together.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
