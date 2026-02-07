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

function App() {
  const navItems = [
    { title: "Home", icon: <IconBuildingCastle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "About", icon: <IconFileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#about" },
    { title: "Tracks", icon: <IconMap2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#tracks" },
    { title: "FAQ", icon: <IconHelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#faq" },
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-black text-white selection:bg-rose-500">
      <ParallaxWrapper>
        <Hero />
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
  )
}

export default App
