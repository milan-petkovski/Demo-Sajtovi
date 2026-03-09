import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Početna", href: "#" },
    { label: "O nama", href: "#o-nama" },
    { label: "Meni", href: "#meni" },
    { label: "Galerija", href: "#galerija" },
    { label: "Kontakt", href: "#kontakt" }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-foreground/30 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Ćošak Logo" className="h-12 w-auto" />
            <span className={`text-xl font-semibold hidden sm:block transition-colors ${
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            }`}>
              Ćošak Cafe Restoran
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-medium transition-colors ${
                  isScrolled 
                    ? "text-foreground/80 hover:text-primary" 
                    : "text-white/90 hover:text-white drop-shadow-lg"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:block">
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
              onClick={() => window.location.href = 'tel:+381113583389'}
            >
              <Phone className="mr-2 h-4 w-4" />
              Pozovite nas
            </Button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={`lg:hidden backdrop-blur-sm border-t ${
          isScrolled ? "bg-background/95 border-border" : "bg-foreground/30 border-white/20"
        }`}>
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block transition-colors font-medium py-2 ${
                  isScrolled 
                    ? "text-foreground/80 hover:text-primary" 
                    : "text-white hover:text-white/80"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
              onClick={() => {
                window.location.href = 'tel:+381113583389';
                setIsOpen(false);
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              Pozovite nas
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
