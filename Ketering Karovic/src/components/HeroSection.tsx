import { useEffect, useState } from "react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] ease-out"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: loaded ? "scale(1)" : "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-background/70" />
      <div
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="mb-6">
          <div className="w-24 h-[1px] gradient-gold mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-wide gradient-gold-text mb-4">
            Ketering Karović
          </h1>
          <div className="w-24 h-[1px] gradient-gold mx-auto mt-8" />
        </div>
        <p className="font-elegant text-xl md:text-2xl lg:text-3xl text-foreground/80 mb-12 italic tracking-wide">
          Tim profesionalnih kuvara za vaše najvažnije trenutke.
        </p>
        <a
          href="#kontakt"
          className="inline-block gradient-gold text-primary-foreground font-body font-semibold text-sm md:text-base tracking-widest uppercase px-10 py-4 hover:opacity-90 transition-opacity duration-300"
        >
          Zatražite ponudu
        </a>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gold-light opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
