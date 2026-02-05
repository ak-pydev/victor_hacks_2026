import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const faqData = [
    {
        question: "Is Victor Hacks free to attend?",
        answer: "Yes! Food will be provided for the duration of the event. We will also have swag and prizes!"
    },
    {
        question: "Where is the event? Is it in person or virtual? Where can I park?",
        answer: (
            <>
                The event is located in the Griffin Hall at Northern Kentucky University.
                <br /><br />
                You can park in the Kenton Garage which you can see on this <a href="https://map.nku.edu/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">campus parking site</a>.
            </>
        )
    },
    {
        question: "Who can attend? What if I don't have any experience? Do I have to be 18?",
        answer: (
            <>
                This event is open to any students. It is beginner friendly, with workshops to help you learn during the event, and mentors available to help you as you work on your project.
                <br /><br />
                Attendees must be at least 13 years old due to child privacy laws. If under 18, you will need to fill out a liability form from the university to participate.
            </>
        )
    },
    {
        question: "What is the team size limit?",
        answer: "Teams should be between 1 and 4 people. We will have a team building activity right after opening ceremony if you'd like to find team members!"
    },
    {
        question: "Are there travel reimbursements?",
        answer: "We are not able to provide travel reimbursements at this time."
    },
    {
        question: "What should I bring?",
        answer: "Your laptop, charger, headphones, deodorant, and a pillow/blanket."
    },
    {
        question: "When can we start working on our project? Can I work on a previous project?",
        answer: (
            <>
                You cannot start until after opening ceremony. You may come up with ideas, but are not allowed to start coding. You cannot work on a previous project, but can use frameworks if you clearly credit them in your readme and differentiate what you made vs what you used.
            </>
        )
    },
    {
        question: "How many challenges can I apply for?",
        answer: "As many as you want!"
    },
    {
        question: "Do I have to stay overnight?",
        answer: "No, you can leave and come back if you would prefer."
    },
    {
        question: "What kind of activities will there be?",
        answer: "We will post the schedule closer to the event. There will be workshops and activities to take a break and meet other hackers and our wonderful sponsors."
    },
    {
        question: "What is a hackathon?",
        answer: "A hackathon is an event where students \"hack\" together and create an app, website, game, etc. in 24-48 hours. There will be no malicious \"hacking\"."
    },
    {
        question: "Will hardware be available?",
        answer: "We do not have hardware available, but you are welcome to bring your own. Due to building fire codes, soldering kits are not allowed in the venue."
    },
    {
        question: "Are you sending out acceptances? Is there a deadline to apply? Is there a waitlist?",
        answer: (
            <>
                We will send out acceptances 7 days before the event. If you need earlier confirmation to book travel, please reach out to our team at <a href="mailto:contact@victorhacks.com" className="text-blue-400 hover:underline">contact@victorhacks.com</a>. Applications will close once we reach the maximum amount of hackers we can support, but we will open a waitlist on the day of the event for any local hackers who want to fill the spots of any accepted hackers who do not end up attending.
            </>
        )
    },
    {
        question: "How do I sign up to be a mentor/judge/volunteer?",
        answer: (
            <>
                You can sign up here - <a href="#" className="text-blue-400 hover:underline">LINK</a>
            </>
        )
    },
    {
        question: "I have a different question!",
        answer: (
            <>
                Email us at <a href="mailto:contact@victorhacks.com" className="text-blue-400 hover:underline">contact@victorhacks.com</a>!
            </>
        )
    }
];

const AccordionItem = ({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}) => {
    return (
        <div className={cn(
            "border-2 rounded-xl overflow-hidden backdrop-blur-md transition-all duration-300",
            isOpen
                ? "bg-viking-charcoal border-viking-crimson shadow-[0_0_15px_rgba(153,27,27,0.3)]"
                : "bg-viking-charcoal/60 border-viking-maroon hover:border-viking-crimson/50"
        )}>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-6 text-left group"
            >
                <span className={cn(
                    "text-lg font-bold font-heading uppercase tracking-wider transition-colors",
                    isOpen ? "text-viking-gold" : "text-gray-300 group-hover:text-white"
                )}>
                    {question}
                </span>
                <div className={cn(
                    "p-2 rounded-lg border-2 transition-all duration-300",
                    isOpen
                        ? "bg-viking-crimson border-viking-gold text-white rotate-180"
                        : "bg-black/40 border-viking-maroon text-gray-400 group-hover:border-viking-crimson group-hover:text-white"
                )}>
                    <IconPlus size={20} className={cn("transition-transform duration-300", isOpen && "rotate-45")} />
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <div className="p-6 pt-0 text-gray-300 text-base leading-relaxed font-body border-t border-viking-maroon/30">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="w-full py-24 bg-viking-leather relative overflow-hidden font-sans">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-20 pointer-events-none mix-blend-overlay" />

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <h2 className="text-5xl md:text-7xl font-black text-center mb-16 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400 font-heading uppercase drop-shadow-[0_4px_0_rgba(0,0,0,1)]">
                    Frequently Asked Questions
                </h2>
                <div className="grid gap-4">
                    {faqData.map((item, index) => (
                        <AccordionItem
                            key={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
