import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <MenuSection />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
