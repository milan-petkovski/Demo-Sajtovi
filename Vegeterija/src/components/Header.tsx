import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#o-nama', label: 'O nama' },
    { href: '#meni', label: 'Meni' },
    { href: '#galerija', label: 'Galerija' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
isScrolled
  ? 'bg-natural-green/80 backdrop-blur-sm shadow-soft'
  : 'bg-transparent'


    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Vegeterija" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">Vegeterija</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-white/80 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Button 
              variant="outline" 
              size="sm"
              className="border-white text-natural-green hover:bg-white hover:text-natural-green"
              onClick={() => window.open('tel:+381234567890')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Pozovi
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="absolute left-0 right-0 top-full bg-white shadow-lg rounded-b-lg mx-4">
              <div className="grid grid-cols-2">
                <div className="bg-natural-green p-4 rounded-bl-lg"></div>
                <div className="bg-white p-4 rounded-br-lg">
                  <div className="space-y-2">
                    {navItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left px-2 py-2 text-foreground hover:text-natural-green transition-colors duration-200"
                      >
                        {item.label}
                      </button>
                    ))}
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-2 border-natural-green text-natural-green hover:bg-natural-green hover:text-white"
                      onClick={() => window.open('tel:+381234567890')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Pozovi
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;