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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Restoran Vizija" className="h-12 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('pocetna')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToSection('o-nama')}
              className="text-foreground hover:text-primary transition-colors"
            >
              O nama
            </button>
            <button
              onClick={() => scrollToSection('meni')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Meni
            </button>
            <button
              onClick={() => scrollToSection('galerija')}
              className="text-foreground hover:text-primary transition-colors"
            >
              Galerija
            </button>
            <button
              onClick={() => scrollToSection('rezervacije')}
              className="btn-gold"
            >
              Rezervacije
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card border border-border rounded-lg mt-2 p-4 space-y-3">
            <button
              onClick={() => scrollToSection('pocetna')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToSection('o-nama')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              O nama
            </button>
            <button
              onClick={() => scrollToSection('meni')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Meni
            </button>
            <button
              onClick={() => scrollToSection('galerija')}
              className="block w-full text-left text-foreground hover:text-primary transition-colors"
            >
              Galerija
            </button>
            <button
              onClick={() => scrollToSection('rezervacije')}
              className="btn-gold w-full text-center"
            >
              Rezervacije
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;