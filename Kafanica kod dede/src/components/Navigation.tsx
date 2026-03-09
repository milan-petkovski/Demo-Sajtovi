import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.jpg';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Kafanica kod Dede" className="w-12 h-12 object-cover rounded-lg" />
            <div className="text-xl font-serif font-semibold text-accent">
              Kafanica kod Dede
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              Početna
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              O nama
            </button>
            <button 
              onClick={() => scrollToSection('menu')}
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              Meni
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              Galerija
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-accent hover:text-primary transition-colors font-medium"
            >
              Kontakt
            </button>
            <Button 
              onClick={() => scrollToSection('reservation')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-warm"
            >
              Rezerviši sto
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;