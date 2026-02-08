import { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient";
import { RegistrationForm } from "@/components/RegistrationForm";
import { Hero } from "@/components/Hero";
import { ParallaxWrapper } from "@/components/ParallaxWrapper";
import { FAQ } from "@/components/FAQ"
import { FloatingDock } from "@/components/ui/floating-dock"
import {
  IconBuildingCastle,
  IconFileText,
  IconMap2,
  IconHelpCircle,
} from "@tabler/icons-react";

import { Footer } from "@/components/Footer"
import { About } from "@/components/About";
import { Tracks } from "@/components/Tracks";
import { SmoothScrollLayout } from "@/components/SmoothScrollLayout";

function App() {
  const [session, setSession] = useState<any>(null);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) checkRegistration(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) checkRegistration(session.user.id);
      else {
        setIsRegistered(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkRegistration = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (data) setIsRegistered(true);
  };

  const navItems = [
    { title: "Home", icon: <IconBuildingCastle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "About", icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#about" },
    { title: "Tracks", icon: <IconMap2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#tracks" },
    { title: "FAQ", icon: <IconHelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#faq" },
  ];

  if (session && !isRegistered) {
    return (
      <SmoothScrollLayout>
        <main className="relative w-full overflow-x-hidden bg-black text-white selection:bg-rose-500 min-h-screen">
          <RegistrationForm session={session} onComplete={() => setIsRegistered(true)} />
          <div className="fixed right-4 bottom-4 z-50">
            <button
              onClick={() => supabase.auth.signOut()}
              className="bg-viking-crimson text-white px-4 py-2 text-sm font-bold uppercase tracking-wider border border-viking-gold hover:bg-red-800 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </main>
      </SmoothScrollLayout>
    )
  }

  return (
    <SmoothScrollLayout>
      <main className="relative w-full overflow-x-hidden bg-black text-white selection:bg-rose-500">
        <ParallaxWrapper>
          <Hero session={session} isRegistered={isRegistered} />
        </ParallaxWrapper>
        <About />
        <Tracks />
        <FAQ />
        <Footer />
        <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
          <FloatingDock
            items={navItems}
            desktopClassName="bg-viking-charcoal/80 backdrop-blur-md border border-viking-maroon hover:border-viking-crimson hover:shadow-[0_0_15px_rgba(153,27,27,0.5)] transition-all duration-300"
          />
        </div>
      </main >
    </SmoothScrollLayout>
  )
}

export default App
