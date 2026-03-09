import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-md border-b border-golden/20 shadow-elegant">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src="/logo.jpg" 
            alt="Chicota Mazz Logo"
            className="w-12 h-12 rounded-full shadow-warm"
          />
          <h1 className="text-2xl font-serif font-bold text-coffee">
            Chicota Mazz
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-coffee hover:text-golden transition-colors font-medium"
          >
            Početna
          </button>
          <button
            onClick={() => scrollToSection('menu')}
            className="text-coffee hover:text-golden transition-colors font-medium"
          >
            Meni
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-coffee hover:text-golden transition-colors font-medium"
          >
            O nama
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-coffee hover:text-golden transition-colors font-medium"
          >
            Kontakt
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-coffee hover:text-golden transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-warm-white border-b border-golden/20 shadow-elegant">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-coffee hover:text-golden transition-colors font-medium py-2"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToSection('menu')}
              className="block w-full text-left text-coffee hover:text-golden transition-colors font-medium py-2"
            >
              Meni
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left text-coffee hover:text-golden transition-colors font-medium py-2"
            >
              O nama
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="block w-full text-left text-coffee hover:text-golden transition-colors font-medium py-2"
            >
              Kontakt
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;