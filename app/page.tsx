import { getDB } from "@/lib/store";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Partnerships from "@/components/Partnerships";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export default function Home() {
  const db = getDB();

  return (
    <>
      <Nav brand={db.content.brandName} />
      <main>
        <Hero content={db.content} />
        <Marquee items={db.skills.map((s) => s.name)} />
        <About content={db.content} />
        <Experience
          experience={db.experience}
          education={db.education}
          title={db.content.experienceTitle}
        />
        <Projects projects={db.projects} title={db.content.projectsTitle} body={db.content.projectsBody} />
        <Skills skills={db.skills} title={db.content.skillsTitle} body={db.content.skillsBody} />
        <Partnerships />
        <Contact content={db.content} />
      </main>
      <Footer content={db.content} />
    </>
  );
}
