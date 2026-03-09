import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import heroImage from "@/assets/garden-day.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/50 to-foreground/70" />
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-white mb-6 font-bold">
          Ćošak Cafe Restoran
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
          Čarobna bašta u srcu grada
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-glow"
            onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Posetite nas
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-foreground px-8 py-6 text-lg backdrop-blur-sm shadow-lg"
            onClick={() => window.location.href = 'tel:+381113583389'}
          >
            <Phone className="mr-2 h-5 w-5" />
            Pozovite nas
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
