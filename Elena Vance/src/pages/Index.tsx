import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Blog } from "@/components/Blog";
import { Shows } from "@/components/Shows";
import { Events } from "@/components/Events";
import { PersonalProject } from "@/components/PersonalProject";
import { Contact } from "@/components/Contact";

const Index = () => {
  return (
    <main id="top" className="min-h-screen bg-background overflow-x-hidden">
      <Nav />
      <Hero />
      <Blog />
      <Shows />
      <Events />
      <PersonalProject />
      <Contact />
    </main>
  );
};

export default Index;
