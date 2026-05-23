import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

import { site } from "@/content/site";
import { skills } from "@/content/skills";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";
import { certifications } from "@/content/certifications";
import { education } from "@/content/education";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero site={site} />
        <About skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Certifications items={certifications} />
        <Education items={education} />
        <Contact site={site} />
      </main>
      <Footer />
    </>
  );
}
