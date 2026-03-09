import { Phone, MapPin, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const links = [
    { label: "O nama", href: "#o-nama" },
    { label: "Meniji", href: "#meniji" },
    { label: "Galerija", href: "#galerija" },
    { label: "Kontakt", href: "#kontakt" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo + Location */}
        <div className="flex items-center gap-3">
          <a href="#" className="font-display text-xl gradient-gold-text font-bold">
            Ketering Karović
          </a>
          <span className="hidden sm:flex items-center gap-1 text-muted-foreground font-body text-xs tracking-wide">
            <MapPin className="w-3 h-3 text-gold-light" /> Beograd
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-gold-light transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Phone + mobile menu */}
        <div className="flex items-center gap-3">
          <a
            href="tel:066073007"
            className="flex items-center gap-1.5 font-body text-xs tracking-wide text-gold-light hover:text-gold transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>066 073 007</span>
          </a>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden p-1">
              <Menu className="w-5 h-5 text-foreground" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-background border-border w-64">
              <SheetTitle className="sr-only">Navigacija</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-1.5 text-muted-foreground font-body text-sm">
                  <MapPin className="w-4 h-4 text-gold-light" /> Beograd
                </div>
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-body text-sm tracking-[0.15em] uppercase text-muted-foreground hover:text-gold-light transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
