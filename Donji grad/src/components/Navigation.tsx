import { useState } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Početna", href: "#home" },
    { name: "Meni", href: "#menu" },
    { name: "Galerija", href: "#gallery" },
    { name: "O nama", href: "#about" },
    { name: "Kontakt", href: "#contact" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Restoran Donji Grad" className="h-12 w-12 rounded-full" />
            <div>
              <h1 className="font-serif font-bold text-lg text-primary">Donji Grad</h1>
              <p className="text-xs text-muted-foreground">Restoran</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>011 123 456</span>
            </div>
            <Button variant="default" size="sm">
              Rezervacija
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-foreground hover:text-accent hover:bg-muted transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2 border-t border-border mt-2">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <Phone className="h-4 w-4" />
                  <span>011 123 456</span>
                </div>
                <Button variant="default" size="sm" className="w-full">
                  Rezervacija
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;