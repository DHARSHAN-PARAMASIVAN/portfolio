import { Nav } from "@/components/Nav";
import { Progress } from "@/components/Progress";
import { LiveBackground } from "@/components/LiveBackground";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Work } from "@/components/sections/Work";
import { Experience } from "@/components/sections/Experience";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <LiveBackground />
      <Progress />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Intro />
        <Work />
        <Experience />
        <Capabilities />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
