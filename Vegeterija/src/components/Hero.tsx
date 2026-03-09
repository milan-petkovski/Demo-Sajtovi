import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import heroFood from '@/assets/hero-food.jpg';

const Hero = () => {
  const scrollToMenu = () => {
    const menuSection = document.querySelector('#meni');
    menuSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0">
        <img 
          src={heroFood} 
          alt="Sveža veganska i vegetarijanska hrana" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-natural-green/80 via-natural-green/60 to-transparent"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in leading-tight">
          Vegeterija
        </h1>
        <p className="text-xl md:text-2xl mb-8 animate-slide-up font-light">
          Zdrava veganska i vegetarijanska hrana
        </p>
        <p className="text-lg md:text-xl mb-12 opacity-90 max-w-2xl mx-auto animate-slide-up">
          Otkrijte ukuse prirode u svakom zalogaju. Pripremamo svežu, lokalnu i organsku hranu 
          koja hrani telo i dušu.
        </p>
        
        <div className="flex justify-center animate-slide-up">
          <Button 
            size="lg"
            onClick={scrollToMenu}
            className="bg-white text-natural-green hover:bg-white/90 px-8 py-3 text-lg font-semibold shadow-button"
          >
            Pogledaj meni
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <ArrowDown className="h-6 w-6 text-white opacity-70" />
      </div>
    </section>
  );
};

export default Hero;