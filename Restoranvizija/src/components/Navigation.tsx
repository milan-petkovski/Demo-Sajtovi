import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-md border-b border-border h-16 md:h-20">
      <div className="container-custom h-full flex items-center justify-between">
        {/* Logo Container */}
        <div className="flex items-center h-full py-2">
          <img 
            src={logo} 
            alt="Restoran Vizija" 
            className="h-full w-auto max-h-[40px] md:max-h-[50px] object-contain block" 
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('pocetna')} className="text-foreground hover:text-primary transition-colors">Početna</button>
          <button onClick={() => scrollToSection('o-nama')} className="text-foreground hover:text-primary transition-colors">O nama</button>
          <button onClick={() => scrollToSection('meni')} className="text-foreground hover:text-primary transition-colors">Meni</button>
          <button onClick={() => scrollToSection('galerija')} className="text-foreground hover:text-primary transition-colors">Galerija</button>
          <button onClick={() => scrollToSection('rezervacije')} className="btn-gold">Rezervacije</button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center h-full">
          <button
            className="text-foreground p-2 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Absolute positioned below the fixed bar */}
      <div 
        className={`md:hidden absolute left-0 right-0 bg-card/98 backdrop-blur-xl border-b border-border shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'top-[64px] md:top-[80px] opacity-100 max-h-[500px]' : 'top-[-500px] opacity-0 max-h-0'
        }`}
      >
        <div className="container-custom py-6 space-y-4">
          <button onClick={() => scrollToSection('pocetna')} className="block w-full text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border/50">Početna</button>
          <button onClick={() => scrollToSection('o-nama')} className="block w-full text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border/50">O nama</button>
          <button onClick={() => scrollToSection('meni')} className="block w-full text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border/50">Meni</button>
          <button onClick={() => scrollToSection('galerija')} className="block w-full text-left text-lg font-medium text-foreground hover:text-primary py-2 border-b border-border/50">Galerija</button>
          <div className="pt-2">
            <button onClick={() => scrollToSection('rezervacije')} className="btn-gold w-full text-center">Rezervacije</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
