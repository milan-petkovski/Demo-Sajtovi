import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MonthlyOffers from "@/components/MonthlyOffers";
import About from "@/components/About";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MonthlyOffers />
      <About />
      <Contact />
    </div>
  );
};

export default Index;
