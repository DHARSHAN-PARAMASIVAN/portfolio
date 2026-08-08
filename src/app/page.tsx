import { Nav } from "@/components/Nav";
import { Progress } from "@/components/Progress";
import { LiveBackground } from "@/components/LiveBackground";
import { LabCursor } from "@/components/LabCursor";
import { CommandPalette } from "@/components/CommandPalette";
import { StatusBar } from "@/components/StatusBar";
import { ToastHost } from "@/components/Toast";
import { MatrixRain } from "@/components/MatrixRain";
import { GlitchFX } from "@/components/GlitchFX";
import { BootSequence } from "@/components/BootSequence";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { OpsFeed } from "@/components/sections/OpsFeed";
import { Work } from "@/components/sections/Work";
import { HackerTerminal } from "@/components/sections/HackerTerminal";
import { Experience } from "@/components/sections/Experience";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <BootSequence />
      <LiveBackground />
      <MatrixRain />
      <GlitchFX />
      <LabCursor />
      <CommandPalette />
      <ToastHost />
      <Progress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Intro />
        <OpsFeed />
        <Work />
        <HackerTerminal />
        <Experience />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
      <StatusBar />
    </>
  );
}
