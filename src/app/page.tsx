import { Nav } from "@/components/Nav";
import { Progress } from "@/components/Progress";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { OnBuild } from "@/components/sections/OnBuild";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { OnVerify } from "@/components/sections/OnVerify";
import { OnSecurity } from "@/components/sections/OnSecurity";
import { Journey } from "@/components/sections/Journey";
import { OffTheCode } from "@/components/sections/OffTheCode";
import { SkillsWall } from "@/components/sections/SkillsWall";
import { Statement } from "@/components/sections/Statement";
import { Contact } from "@/components/sections/Contact";
import { FinalScreen } from "@/components/sections/FinalScreen";
import { Footer } from "@/components/sections/Footer";

export default function HomePage() {
  return (
    <>
      <Progress />
      <Nav />
      <main>
        <Hero />
        <Intro />
        <OnBuild />
        <FeaturedProject />
        <ProjectGallery />
        <OnVerify />
        <OnSecurity />
        <Journey />
        <OffTheCode />
        <SkillsWall />
        <Statement />
        <Contact />
        <FinalScreen />
      </main>
      <Footer />
    </>
  );
}
