import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-primary border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <img src={logo} alt="Restaurant Logo" className="h-12" />
          
          <nav className="hidden md:flex gap-8">
            <button onClick={() => scrollToSection("hero")} className="text-primary-foreground hover:text-accent transition-colors">
              Početna
            </button>
            <button onClick={() => scrollToSection("menu")} className="text-primary-foreground hover:text-accent transition-colors">
              Jelovnik
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-primary-foreground hover:text-accent transition-colors">
              Galerija
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-primary-foreground hover:text-accent transition-colors">
              Kontakt
            </button>
          </nav>

          <button 
            className="md:hidden text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection("hero")} className="text-primary-foreground hover:text-accent transition-colors text-left">
              Početna
            </button>
            <button onClick={() => scrollToSection("menu")} className="text-primary-foreground hover:text-accent transition-colors text-left">
              Jelovnik
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-primary-foreground hover:text-accent transition-colors text-left">
              Galerija
            </button>
            <button onClick={() => scrollToSection("contact")} className="text-primary-foreground hover:text-accent transition-colors text-left">
              Kontakt
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
