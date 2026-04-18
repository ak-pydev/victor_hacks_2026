import { useState } from 'react';
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { supabase } from '@/supabaseClient';

export function CheckInForm({ onBack }: { onBack: () => void }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isNkuStudent, setIsNkuStudent] = useState<boolean | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            full_name: formData.get('full_name'),
            email: formData.get('email'),
            is_nku_student: isNkuStudent,
            tshirt_size: isNkuStudent === false ? formData.get('tshirt_size') : null,
            address_line1: isNkuStudent === false ? formData.get('address_line1') : null,
            address_line2: isNkuStudent === false ? formData.get('address_line2') : null,
            city: isNkuStudent === false ? formData.get('city') : null,
            state: isNkuStudent === false ? formData.get('state') : null,
            zip: isNkuStudent === false ? formData.get('zip') : null,
            country: isNkuStudent === false ? formData.get('country') : null,
        };

        try {
            const { error } = await supabase.from('checkins').insert([data]);
            if (error) throw error;
            setSubmitSuccess(true);
        } catch (error: any) {
            console.error("Check-in error:", error);
            setSubmitError(error.message || "An error occurred during check-in.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-white p-8">
                <div className="bg-viking-charcoal p-12 border-2 border-viking-gold shadow-[0_0_30px_rgba(251,191,36,0.2)] rounded-sm text-center">
                    <h2 className="text-4xl font-heading text-viking-gold mb-4 uppercase tracking-widest">Check-in Complete!</h2>
                    <p className="text-lg text-gray-300 mb-8">Welcome to VictorHacks. Let the raid begin.</p>
                    <Button 
                        onClick={onBack}
                        className="bg-viking-leather hover:bg-viking-charcoal text-white font-bold px-8 py-4 border-2 border-viking-gold uppercase tracking-widest transition-all"
                    >
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <main className="relative flex items-center justify-center min-h-screen bg-[#050505] overflow-x-hidden font-sans p-4">
            <button
                onClick={onBack}
                className="group fixed top-8 left-8 z-50 flex items-center gap-3 text-white uppercase tracking-widest text-xs font-bold hover:text-viking-gold transition-all duration-300 border border-white/10 hover:border-viking-gold/40 px-6 py-3 rounded-full backdrop-blur-xl bg-black/60 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
            >
                <span className="block transition-transform duration-300 group-hover:-translate-x-1">&larr;</span>
                Return to base
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-black/90 backdrop-blur-md border-2 border-viking-gold shadow-[0_0_30px_rgba(251,191,36,0.2)] rounded-sm p-8 md:p-12 relative overflow-hidden"
            >
                {/* Decorative Corner Borders */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-viking-gold z-10"></div>
                <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-viking-gold z-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-viking-gold z-10"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-viking-gold z-10"></div>

                <h2 className="text-3xl md:text-5xl font-heading text-transparent bg-clip-text bg-gradient-to-b from-viking-gold to-yellow-700 mb-8 text-center uppercase tracking-widest drop-shadow-md">
                    Self Check-In
                </h2>
                
                <p className="text-sm text-gray-400 mb-8 text-center border-b border-viking-maroon/50 pb-8">
                    Please confirm your arrival to officially join the hackathon.
                </p>

                <form onSubmit={onSubmit} className="space-y-6 relative z-20">
                    <div className="flex flex-col gap-2 group">
                        <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">Full Name <span className="text-viking-crimson">*</span></label>
                        <input
                            type="text"
                            name="full_name"
                            required
                            placeholder="Ragnar Lothbrok"
                            className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 group">
                        <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">Email Address <span className="text-viking-crimson">*</span></label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="ragnar@valhalla.com"
                            className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                        />
                    </div>

                    <div className="flex flex-col gap-2 group relative">
                        <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">Are you an NKU student? <span className="text-viking-crimson">*</span></label>
                        <select
                            required
                            onChange={(e) => setIsNkuStudent(e.target.value === 'yes' ? true : (e.target.value === 'no' ? false : null))}
                            className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 appearance-none focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                        >
                            <option value="" className="bg-viking-charcoal">Select option...</option>
                            <option value="yes" className="bg-viking-charcoal text-white">Yes, I am an NKU student</option>
                            <option value="no" className="bg-viking-charcoal text-white">No, I am from another institution</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-8 text-viking-gold">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    {isNkuStudent === false && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-6 pt-6 mt-6 border-t border-viking-maroon/50"
                        >
                            <div className="flex flex-col gap-2 group relative">
                                <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">T-Shirt Size <span className="text-viking-crimson">*</span></label>
                                <select
                                    name="tshirt_size"
                                    required
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 appearance-none focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                >
                                    <option value="" className="bg-viking-charcoal">Select size...</option>
                                    <option value="S" className="bg-viking-charcoal text-white">Small</option>
                                    <option value="M" className="bg-viking-charcoal text-white">Medium</option>
                                    <option value="L" className="bg-viking-charcoal text-white">Large</option>
                                    <option value="XL" className="bg-viking-charcoal text-white">X-Large</option>
                                    <option value="XXL" className="bg-viking-charcoal text-white">XX-Large</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-8 text-viking-gold">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                            
                            <h3 className="text-viking-gold font-bold uppercase tracking-widest text-sm pt-4">Shipping Address <span className="text-viking-crimson">*</span></h3>
                            
                            <div className="flex flex-col gap-2 group">
                                <input
                                    type="text"
                                    name="address_line1"
                                    required
                                    placeholder="Address Line 1"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                            </div>
                            
                            <div className="flex flex-col gap-2 group">
                                <input
                                    type="text"
                                    name="address_line2"
                                    placeholder="Address Line 2 (Optional)"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    required
                                    placeholder="City"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                                <input
                                    type="text"
                                    name="state"
                                    required
                                    placeholder="State / Province"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="zip"
                                    required
                                    placeholder="ZIP / Postal Code"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    required
                                    placeholder="Country"
                                    className="w-full bg-viking-leather/40 border-2 border-viking-maroon focus:border-viking-gold text-white p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]"
                                />
                            </div>
                        </motion.div>
                    )}

                    {submitError && <div className="text-red-400 text-center font-bold p-4 border-2 border-red-500/50 bg-red-950/50 rounded-sm shadow-inner">{submitError}</div>}

                    <div className="pt-8">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-viking-crimson hover:bg-red-800 text-white font-heading font-bold text-lg px-8 py-6 rounded-none border-2 border-viking-gold shadow-[0_0_15px_rgba(251,191,36,0.3)] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] disabled:opacity-50"
                        >
                            {isSubmitting ? "Checking In..." : "Complete Check-In"}
                        </Button>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}
