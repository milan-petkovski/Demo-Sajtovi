import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Početna", href: "#hero" },
    { label: "Ponude", href: "#ponude" },
    { label: "Destinacije", href: "#destinacije" },
    { label: "O nama", href: "#onama" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="flex items-center gap-2">
          <img src={logo} alt="Karavan International" className="h-12 md:h-14 rounded-full" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-semibold tracking-wide uppercase transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+381631211830"
            className="bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4" />
            Pozovite nas
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground font-semibold py-2 uppercase text-sm"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+381631211830"
              className="bg-gradient-orange text-primary-foreground px-5 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              063 211 830
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
