import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/75 to-foreground/85" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-primary-foreground mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
            <span className="text-sm font-medium">Novi Sad, Srbija</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Profesionalna Ugostiteljska Oprema & Rashladne Vitrine
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Najveći izbor nove i polovne opreme u Novom Sadu. Garancija kvaliteta uz profesionalnu podršku.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {['Uvoz iz Nemačke', 'Garancija & Servis', 'Dostava po Srbiji'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-primary-foreground/90">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" className="w-full sm:w-auto">
              Pogledaj Ponudu
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
              Kontaktirajte nas
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50 animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
