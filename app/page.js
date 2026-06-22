import HeroReveal from "@/components/hero/HeroReveal";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Connect from "@/components/sections/Connect";
import TypingHero from "@/components/hero/TypingHero";

export default function Home() {
  return (
    <>
      <div style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "85% auto",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-y",
      }} />

      <TypingHero />

      <main style={{ position: "relative", zIndex: 2 }}>
        <HeroReveal />
        <Experience />
        <Projects />
        <Skills />
        <Connect />
      </main>
    </>
  );
}