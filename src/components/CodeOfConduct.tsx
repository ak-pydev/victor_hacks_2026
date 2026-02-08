import { Button } from "@/components/ui/button";
import { IconArrowLeft } from "@tabler/icons-react";

export function CodeOfConduct({ onBack }: { onBack: () => void }) {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16 font-sans selection:bg-rose-500">
            <div className="max-w-4xl mx-auto">
                <Button
                    onClick={onBack}
                    variant="ghost"
                    className="mb-8 pl-0 text-viking-gold hover:text-white hover:bg-transparent transition-colors group"
                >
                    <IconArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    Back to the Realm
                </Button>

                <h1 className="text-4xl md:text-5xl font-heading text-viking-gold mb-8 drop-shadow-sm">Event Code of Conduct & Anti-Harassment Policy</h1>

                <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                    <p>
                        <strong>GDG on Campus Northern Kentucky University / Community Group</strong> is dedicated to providing a harassment-free and inclusive event experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. We do not tolerate harassment of event participants in any form. GDG Northern Kentucky University / Community Group takes violations of our policy seriously and will respond appropriately.
                    </p>

                    <p>All participants of GDG Northern Kentucky University / Community Group events must abide by the following policy:</p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Be excellent to each other.</h2>
                    <p>
                        We want the event to be an excellent experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. Treat everyone with respect. Participate while acknowledging that everyone deserves to be here -- and each of us has the right to enjoy our experience without fear of harassment, discrimination, or condescension, whether blatant or via micro-aggressions. Jokes shouldn’t demean others. <span className="italic">Consider what you are saying and how it would feel if it were said to or about you.</span>
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Speak up if you see or hear something.</h2>
                    <p>
                        Harassment is not tolerated, and you are empowered to politely engage when you or others are disrespected. The person making you feel uncomfortable may not be aware of what they are doing, and politely bringing their behavior to their attention is encouraged. If a participant engages in harassing or uncomfortable behavior, the event organizers may take any action they deem appropriate, including warning or expelling the offender from the event with no refund. If you are being harassed or feel uncomfortable, notice that someone else is being harassed, or have any other concerns, please contact a member of the event staff immediately.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Harassment is not tolerated.</h2>
                    <p>
                        Harassment includes, but is not limited to: verbal language that reinforces social structures of domination related to gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category; sexual imagery in public spaces; deliberate intimidation; stalking; following; harassing photography or recording; sustained disruption of talks or other events; offensive verbal language; inappropriate physical contact; and unwelcome sexual attention. Participants asked to stop any harassing behavior are expected to comply immediately.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Practice saying "Yes and" to each other.</h2>
                    <p>
                        It’s a theatre improv technique to build on each other’s ideas. We all benefit when we create together.
                    </p>

                    <div className="bg-viking-leather/20 border-l-4 border-viking-gold p-6 my-8 rounded-r-lg">
                        <p>
                            This policy extends to talks, forums, workshops, codelabs, social media, parties, hallway conversations, all attendees, partners, sponsors, volunteers, event staff, etc. You catch our drift. GDG Northern Kentucky University / Community Group reserves the right to refuse admittance to, or remove any person from, any GDG Northern Kentucky University / Community Group hosted event (including future GDG Northern Kentucky University / Community Group events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with this policy, and the terms and conditions herein. If a participant engages in harassing or uncomfortable behavior, the event organizers may take any action they deem appropriate, including warning or expelling the offender from the event with no refund.
                        </p>
                    </div>

                    <p>
                        Our event staff can usually be identified by special badges/attire. Our zero tolerance policy means that we will look into and review every allegation of violation of our Event Community Guidelines and Anti-Harassment Policy and respond appropriately. Please note, while we take all concerns raised seriously, we will use our discretion as to determining when and how to follow up on reported incidents, and may decline to take any further action and/or may direct the participant to other resources for resolution.
                    </p>

                    <p>
                        Event staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing discomfort or harassment to feel safe for the duration of the event. We value your attendance.
                    </p>

                    <p>
                        Exhibiting partners, sponsors or vendor booths, or similar activities are also subject to this policy. In particular, exhibitors should not use sexualized images, activities, or other material. Booth staff (including volunteers) should not use sexualized clothing/uniforms/costumes, or otherwise create a sexualized environment. Participants and exhibiting partners or sponsors disobeying this policy will be notified and are expected to stop any offending behavior immediately.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">Why this policy is important</h2>
                    <p>
                        Harassment at events and in online communities is unfortunately common. Creating an official policy aims to improve this by making it clear that harassment of anyone for any reason is not acceptable within our events and communities. This policy may prevent harassment by clearly defining expectations for behavior, aims to provide reassurance, and encourages people who have had bad experiences at other events to participate in this one.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-8 mb-4">License and attribution</h2>
                    <p className="text-sm text-gray-400">
                        This policy is licensed under the Creative Commons Zero license.
                        <br /><br />
                        This policy is based on and influenced by several other community policies including: Ohio LinuxFest Anti-Harassment policy, Con Anti-Harassment Project, Geek Feminism Wiki (created by the Ada Initiative), ConfCodeofConduct.com, JSconf, Rust, Diversity in Python, and Write/Speak/Code.
                    </p>
                </div>
            </div>
        </div>
    );
}
