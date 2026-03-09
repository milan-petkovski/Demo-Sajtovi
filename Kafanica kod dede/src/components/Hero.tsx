import React from 'react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-image.jpg';

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 leading-tight">
          Dobrodošli u<br />
          <span className="text-accent bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
            Kafanicu kod Dede
          </span>
        </h1>
        
        <div className="text-2xl md:text-3xl text-white mb-6 leading-relaxed">
          🎼 Kafana sa dušom
        </div>
        
        <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
          Domaća jela, dedina rakija i miris detinjstva.<br />
          Gde se susreću tradicija i savremeni komfor.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg"
            onClick={() => scrollToSection('menu')}
            className="bg-primary hover:bg-primary/90 text-white shadow-warm text-lg px-8 py-6 font-semibold"
          >
            Pogledaj meni
          </Button>
          <Button 
            size="lg" 
            onClick={() => scrollToSection('reservation')}
            className="bg-primary/80 hover:bg-primary text-white backdrop-blur-sm text-lg px-8 py-6 font-semibold border-none"
          >
            Rezerviši sto
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;