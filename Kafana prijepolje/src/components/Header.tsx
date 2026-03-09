import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpg";

interface HeaderProps {
  onReserveClick: () => void;
}

const Header = ({ onReserveClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-card">
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Kafana Prijepolje Logo" className="h-12 md:h-14 w-auto" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Meni
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Galerija
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Događaji
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Kontakt
            </button>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Button onClick={onReserveClick} variant="colorful" size="lg">
              Rezerviši sto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-in">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Početna
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Meni
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Galerija
            </button>
            <button
              onClick={() => scrollToSection("events")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Događaji
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-primary transition-colors font-medium text-left"
            >
              Kontakt
            </button>
            <Button onClick={onReserveClick} variant="colorful" size="lg" className="w-full">
              Rezerviši sto
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
