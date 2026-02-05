import { Hero } from "@/components/Hero"
import { ParallaxWrapper } from "@/components/ParallaxWrapper";
import { About } from "@/components/About"
import { Sponsors } from "@/components/Sponsors"
import { Tracks } from "@/components/Tracks"
import { FAQ } from "@/components/FAQ"
import { Prizes } from "@/components/Prizes"
import { FloatingDock } from "@/components/ui/floating-dock"
import {
  IconHome,
  IconTrophy,
  IconUsers,
  IconInfoCircle,
  IconHelpCircle,
  IconGift
} from "@tabler/icons-react";

import { Footer } from "@/components/Footer"

function App() {
  const navItems = [
    { title: "Home", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "About", icon: <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#about" },
    { title: "Tracks", icon: <IconTrophy className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#tracks" },
    { title: "Prizes", icon: <IconGift className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#prizes" },
    { title: "Sponsors", icon: <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#sponsors" },
    { title: "FAQ", icon: <IconHelpCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#faq" },
  ];

  return (
    <main className="min-h-screen bg-viking-charcoal text-white relative font-sans">
      <ParallaxWrapper>
        <Hero />
        <About />
      </ParallaxWrapper>
      <Tracks />
      <Prizes />
      <Sponsors />
      <FAQ />
      <Footer />
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50">
        <FloatingDock
          items={navItems}
          desktopClassName="bg-viking-charcoal/80 backdrop-blur-md border border-viking-maroon hover:border-viking-crimson hover:shadow-[0_0_15px_rgba(153,27,27,0.5)] transition-all duration-300"
        />
      </div>
    </main>
  )
}

export default App
