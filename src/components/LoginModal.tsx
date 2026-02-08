import { motion, AnimatePresence } from "motion/react";
import { IconBrandGithub, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabaseClient";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: window.location.origin
            }
        });
        if (error) console.error('Error logging in:', error.message);
    };



    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-md bg-viking-charcoal border-2 border-viking-gold shadow-[0_0_50px_rgba(251,191,36,0.3)] p-6 md:p-12 overflow-hidden"
                    >
                        {/* Decorative Corner Borders */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-viking-gold z-10"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-viking-gold z-10"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-viking-gold z-10"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-viking-gold z-10"></div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-gray-500 hover:text-viking-gold transition-colors z-20"
                        >
                            <IconX size={24} />
                        </button>

                        <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                            <h2 className="text-2xl md:text-3xl font-heading text-viking-gold uppercase tracking-widest drop-shadow-sm">
                                Gate of Valhalla
                            </h2>

                            <p className="text-gray-300 font-sans leading-relaxed">
                                Join the ranks of Victor Hacks. Sign in to register, manage your team, and view exclusive saga details.
                            </p>

                            <div className="w-full pt-4 space-y-3">
                                <Button
                                    onClick={handleLogin}
                                    className="w-full bg-viking-gold hover:bg-yellow-600 text-black font-bold text-lg py-6 border-none shadow-lg hover:shadow-xl transition-all uppercase tracking-wider flex items-center justify-center gap-3 group"
                                >
                                    <IconBrandGithub className="text-black" size={24} />
                                    <span>Sign in with GitHub</span>
                                </Button>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-600"></div>
                                    <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
                                    <div className="flex-grow border-t border-gray-600"></div>
                                </div>

                                <Button
                                    onClick={() => window.open("https://forms.gle/Hov5ENWDtUceqJp59", "_blank")}
                                    variant="outline"
                                    className="w-full bg-transparent text-gray-300 border border-gray-600 hover:border-viking-gold hover:text-viking-gold font-semibold text-lg py-6 uppercase tracking-wider flex items-center justify-center gap-3 transition-all"
                                >
                                    <span>Become a Mentor</span>
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 italic mt-4">
                                By entering, you agree to abide by the codes of this realm.
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
