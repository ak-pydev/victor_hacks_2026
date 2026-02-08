import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/supabaseClient';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

// --- Zod Schema ---
const formSchema = z.object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 16, { message: "You must be at least 16 years old." }),
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address"),
    school: z.string().min(1, "School is required"),
    level_of_study: z.string().min(1, "Level of study is required"),
    country_of_residence: z.string().min(1, "Country is required"),
    linkedin_url: z.string().url("Invalid LinkedIn URL").min(1, "LinkedIn URL is required"),

    // Demographics
    dietary_restrictions: z.string().optional(),
    underrepresented_group: z.string().min(1, "Required"),
    gender: z.string().min(1, "Required"),
    pronouns: z.string().min(1, "Required"),
    race_ethnicity: z.string().min(1, "Required"),
    sexual_orientation: z.string().min(1, "Required"),

    // Logistics
    tshirt_size: z.string().optional(),
    shipping_address_line1: z.string().optional(),
    shipping_address_line2: z.string().optional(),
    shipping_city: z.string().optional(),
    shipping_state: z.string().optional(),
    shipping_country: z.string().optional(),
    shipping_pincode: z.string().optional(),
    major: z.string().optional(),

    // Compliance Checkboxes
    gdg_code_of_conduct: z.boolean().refine(val => val === true, { message: "You must agree to the GDG Code of Conduct" }),
    victor_hacks_rules: z.boolean().refine(val => val === true, { message: "You must agree to the Victor Hacks Rules" }),
    mlh_code_of_conduct: z.boolean().refine(val => val === true, { message: "You must agree to the MLH Code of Conduct" }),
});

type FormData = z.infer<typeof formSchema>;

export function RegistrationForm({ session, onComplete }: { session: any, onComplete: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const steps = [
        { id: 'identity', title: 'Identity', fields: ['first_name', 'last_name', 'age', 'phone', 'email'] },
        { id: 'origin', title: 'Origin', fields: ['school', 'level_of_study', 'country_of_residence', 'major', 'linkedin_url'] },
        { id: 'demographics', title: 'Demographics', fields: ['gender', 'pronouns', 'race_ethnicity', 'sexual_orientation', 'underrepresented_group'] },
        { id: 'logistics', title: 'Logistics', fields: ['tshirt_size', 'dietary_restrictions', 'shipping_address_line1', 'shipping_address_line2', 'shipping_city', 'shipping_state', 'shipping_country', 'shipping_pincode'] },
        { id: 'compliance', title: 'Agreements', fields: ['gdg_code_of_conduct', 'victor_hacks_rules', 'mlh_code_of_conduct'] }
    ];

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: session?.user?.email || "",
        }
    });

    const next = async () => {
        const fields = steps[currentStep].fields;
        const output = await trigger(fields as any, { shouldFocus: true });
        if (!output) return;

        if (currentStep < steps.length - 1) {
            setCurrentStep(step => step + 1);
        } else {
            handleSubmit(onSubmit)();
        }
    };

    const back = () => {
        if (currentStep > 0) {
            setCurrentStep(step => step - 1);
        }
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitError(null);

        try {
            const { error } = await supabase
                .from('profiles')
                .insert([
                    {
                        id: session.user.id,
                        ...data,
                        updated_at: new Date(),
                    },
                ]);

            if (error) throw error;
            setSubmitSuccess(true);

            // Redirect after 2 seconds
            setTimeout(() => {
                onComplete();
            }, 2000);

        } catch (error: any) {
            console.error("Submission error:", error);
            setSubmitError(error.message || "An error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-white p-8 bg-viking-charcoal rounded-lg border-2 border-viking-gold">
                <h2 className="text-4xl font-heading text-viking-gold mb-4">Registration Complete!</h2>
                <p className="text-lg">Welcome to the raid properly, warrior. Check your email for further instructions.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto p-4 md:p-12 bg-black/90 backdrop-blur-md border-2 border-viking-gold shadow-[0_0_30px_rgba(251,191,36,0.2)] rounded-sm my-10 md:my-20 relative overflow-hidden"
        >
            {/* Decorative Corner Borders */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-viking-gold z-10"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-viking-gold z-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-viking-gold z-10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-viking-gold z-10"></div>

            <h2 className="text-3xl md:text-6xl font-heading text-transparent bg-clip-text bg-gradient-to-b from-viking-gold to-yellow-700 mb-8 text-center uppercase tracking-widest drop-shadow-md">Hacker Registration</h2>

            {/* Stepper Progress */}
            <div className="flex justify-between mb-12 relative z-20 px-2">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-col items-center flex-1">
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 mb-2 transition-all duration-300 ${index <= currentStep ? 'bg-viking-gold border-viking-gold text-black shadow-[0_0_10px_rgba(251,191,36,0.5)]' : 'bg-transparent border-gray-600 text-gray-500'}`}>
                            <span className="font-bold">{index + 1}</span>
                        </div>
                        <div className={`text-[10px] md:text-xs uppercase tracking-wider font-bold text-center hidden sm:block ${index <= currentStep ? 'text-viking-gold' : 'text-gray-600'}`}>
                            {step.title}
                        </div>
                    </div>
                ))}
            </div>

            <form className="space-y-12 font-sans text-gray-300 relative z-20">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Section title="Identity">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="First Name" error={errors.first_name} registration={register("first_name")} />
                                    <Input label="Last Name" error={errors.last_name} registration={register("last_name")} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="Age" type="number" error={errors.age} registration={register("age")} />
                                    <Input label="Phone Number" type="tel" error={errors.phone} registration={register("phone")} />
                                </div>
                                <Input label="Email" type="email" error={errors.email} registration={register("email")} readOnly />
                            </Section>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Section title="Origin & Education">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="School" error={errors.school} registration={register("school")} />
                                    <Select label="Level of Study" error={errors.level_of_study} registration={register("level_of_study")} options={[
                                        "Less than Secondary / High School", "Secondary / High School", "Undergraduate University (2 year)", "Undergraduate University (3+ year)", "Graduate University", "Code School / Bootcamp", "Other Vocational", "Post Doctorate", "Other", "Not a student", "Prefer not to answer"
                                    ]} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="Country of Residence" error={errors.country_of_residence} registration={register("country_of_residence")} />
                                    <Select label="Major / Field of Study" error={errors.major} registration={register("major")} options={[
                                        "Computer science/engineering", "Another engineering discipline", "Information systems/IT", "Natural science", "Math/Statistics", "Web dev/design", "Business", "Humanities", "Social science", "Fine arts", "Health science", "Other", "Undecided", "Prefer not to answer"
                                    ]} />
                                </div>
                                <Input label="LinkedIn URL" type="url" error={errors.linkedin_url} registration={register("linkedin_url")} />
                            </Section>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Section title="Demographics">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Select label="Gender" error={errors.gender} registration={register("gender")} options={["Man", "Woman", "Non-Binary", "Prefer to self-describe", "Prefer Not to Answer"]} />
                                    <Select label="Pronouns" error={errors.pronouns} registration={register("pronouns")} options={["She/Her", "He/Him", "They/Them", "She/They", "He/They", "Prefer Not to Answer", "Other"]} />
                                </div>
                                <Select label="Race / Ethnicity" error={errors.race_ethnicity} registration={register("race_ethnicity")} options={[
                                    "Asian Indian", "Black or African", "Chinese", "Filipino", "Hispanic / Latino / Spanish Origin", "Japanese", "Korean", "Middle Eastern", "Native American / Alaskan Native", "Native Hawaiian", "Samoan", "Vietnamese", "White", "Other Asian", "Other Pacific Islander", "Prefer Not to Answer"
                                ]} />
                                <Select label="Sexual Orientation" error={errors.sexual_orientation} registration={register("sexual_orientation")} options={["Heterosexual/Straight", "Gay/Lesbian", "Bisexual", "Different identity", "Prefer Not to Answer"]} />
                                <Select label="Underrepresented Group?" error={errors.underrepresented_group} registration={register("underrepresented_group")} options={["Yes", "No", "Unsure"]} />

                            </Section>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Section title="Logistics">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input label="T-shirt Size" error={errors.tshirt_size} registration={register("tshirt_size")} placeholder="e.g. M, L, XL" />
                                    <Select label="Dietary Restrictions" error={errors.dietary_restrictions} registration={register("dietary_restrictions")} options={["None", "Vegetarian", "Vegan", "Celiac Disease", "Allergies", "Kosher", "Halal"]} />
                                </div>

                                <h4 className="text-xl font-heading text-viking-gold mt-6 mb-4 border-b border-viking-maroon pb-2 inline-block">Shipping Address (Optional for Prizes/Swag)</h4>
                                <Input label="Address Line 1" error={errors.shipping_address_line1} registration={register("shipping_address_line1")} />
                                <Input label="Address Line 2" error={errors.shipping_address_line2} registration={register("shipping_address_line2")} />
                                <div className="grid grid-cols-2 gap-8">
                                    <Input label="City" error={errors.shipping_city} registration={register("shipping_city")} />
                                    <Input label="State" error={errors.shipping_state} registration={register("shipping_state")} />
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <Input label="Country" error={errors.shipping_country} registration={register("shipping_country")} />
                                    <Input label="Pincode/Zip" error={errors.shipping_pincode} registration={register("shipping_pincode")} />
                                </div>
                            </Section>
                        </motion.div>
                    )}

                    {currentStep === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                            <Section title="Review & Agreements">
                                <p className="text-sm text-gray-400 mb-6 italic border-l-2 border-viking-gold/50 pl-4 py-2 bg-viking-leather/20">
                                    Before you can join the raid, you must agree to the following codes of conduct and rules.
                                </p>

                                <Checkbox
                                    label={<span>I have read and agree to the <a href="https://developers.google.com/community-guidelines" target="_blank" rel="noreferrer" className="text-viking-gold hover:text-white underline transition-colors">GDG Code of Conduct</a>.</span>}
                                    error={errors.gdg_code_of_conduct}
                                    registration={register("gdg_code_of_conduct")}
                                />

                                <Checkbox
                                    label={<span>I have read and agree to the <a href="#" className="text-viking-gold hover:text-white underline transition-colors">Victor Hacks Rules</a>.</span>}
                                    error={errors.victor_hacks_rules}
                                    registration={register("victor_hacks_rules")}
                                />

                                <Checkbox
                                    label={<span>I have read and agree to the <a href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md" target="_blank" rel="noreferrer" className="text-viking-gold hover:text-white underline transition-colors">MLH Code of Conduct</a>.</span>}
                                    error={errors.mlh_code_of_conduct}
                                    registration={register("mlh_code_of_conduct")}
                                />
                            </Section>
                        </motion.div>
                    )}
                </AnimatePresence>


                {submitError && <div className="text-red-400 text-center font-bold p-4 border-2 border-red-500/50 bg-red-950/50 rounded-sm shadow-inner">{submitError}</div>}

                <div className="flex justify-between pt-8 border-t border-viking-maroon/30">
                    {currentStep > 0 ? (
                        <Button
                            type="button"
                            onClick={back}
                            className="bg-transparent border-2 border-gray-500 text-gray-300 hover:border-viking-gold hover:text-viking-gold font-heading px-6 py-4 md:px-8 md:py-6 rounded-none uppercase tracking-widest transition-all"
                        >
                            Back
                        </Button>
                    ) : <div></div>}

                    <Button
                        disabled={isSubmitting}
                        type="button"
                        onClick={next}
                        className="ml-auto bg-viking-crimson hover:bg-red-800 text-white font-heading font-bold text-lg md:text-xl px-8 py-4 md:px-12 md:py-6 rounded-none border-2 border-viking-gold shadow-[0_0_15px_rgba(251,191,36,0.3)] uppercase tracking-[0.2em] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(251,191,36,0.6)] disabled:opacity-50"
                    >
                        {isSubmitting ? "Scribing..." : (currentStep === steps.length - 1 ? "Inscribe" : "Next")}
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}

// --- Helper Components ---

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="border-b border-viking-maroon/50 pb-10 last:border-0">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-viking-gold mb-6 md:mb-8 tracking-wide border-l-4 border-viking-crimson pl-4 drop-shadow-sm">{title}</h3>
            <div className="space-y-6">
                {children}
            </div>
        </div>
    )
}

function Input({ label, type = "text", error, registration, placeholder, readOnly }: any) {
    return (
        <div className="flex flex-col gap-2 group">
            <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">{label} {error && <span className="text-viking-crimson">*</span>}</label>
            <input
                type={type}
                {...registration}
                placeholder={placeholder}
                readOnly={readOnly}
                className={`w-full bg-viking-leather/40 border-2 ${error ? 'border-viking-crimson' : 'border-viking-maroon focus:border-viking-gold'} text-white p-3 md:p-4 rounded-none outline-none transition-all duration-300 placeholder:text-gray-600 focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]`}
            />
            {error && <span className="text-viking-crimson text-xs font-bold tracking-wide">{error.message}</span>}
        </div>
    )
}

function Select({ label, options, error, registration }: any) {
    return (
        <div className="flex flex-col gap-2 group">
            <label className="text-sm font-bold text-viking-gold uppercase tracking-widest transition-colors group-focus-within:text-white">{label} {error && <span className="text-viking-crimson">*</span>}</label>
            <div className="relative">
                <select
                    {...registration}
                    className={`w-full bg-viking-leather/40 border-2 ${error ? 'border-viking-crimson' : 'border-viking-maroon focus:border-viking-gold'} text-white p-4 rounded-none outline-none transition-all duration-300 appearance-none focus:bg-viking-leather/60 focus:shadow-[0_0_10px_rgba(251,191,36,0.1)]`}
                >
                    <option value="" className="bg-viking-charcoal">Select option...</option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt} className="bg-viking-charcoal text-white">{opt}</option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-viking-gold">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
            {error && <span className="text-viking-crimson text-xs font-bold tracking-wide">{error.message}</span>}
        </div>
    )
}

function Checkbox({ label, error, registration }: any) {
    return (
        <div className="flex items-start gap-4 p-4 bg-viking-leather/20 border border-viking-maroon/30 hover:border-viking-gold/30 transition-colors">
            <input type="checkbox" {...registration} className="mt-1 w-6 h-6 accent-viking-gold bg-black border-2 border-viking-gold rounded-none cursor-pointer" />
            <div className="flex flex-col gap-1">
                <label className="text-sm text-gray-300 leading-relaxed max-w-prose">{label}</label>
                {error && <span className="text-viking-crimson text-xs font-bold tracking-wide">{error.message}</span>}
            </div>
        </div>
    )
}
