import heroImg from "@/assets/hero-cappadocia.jpg";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Egzotična destinacija"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 hero-overlay" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-primary font-bold text-lg md:text-xl tracking-widest uppercase mb-4 animate-fade-up">
          Karavan International
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          35 Godina Putovanja
          <br />
          <span className="text-gradient-orange">Sa Vama</span>
        </h1>
        <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Daleke destinacije, ekskurzije i krstarenja.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <a
            href="#ponude"
            className="bg-gradient-orange text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Pogledaj ponude
          </a>
          <a
            href="https://wa.me/381631211830"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-foreground/10 transition-colors"
          >
            Pošalji upit
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
