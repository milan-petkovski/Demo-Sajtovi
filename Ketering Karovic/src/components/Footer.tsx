import { Phone, Instagram, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 px-4 border-t border-border bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl gradient-gold-text font-bold mb-3">Ketering Karović</p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Premium ketering servis za vaše najvažnije trenutke. Kvalitet, elegancija i pouzdanost.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-light mb-4">Navigacija</p>
            <div className="flex flex-col gap-2">
              {["O nama", "Meniji", "Galerija", "Kontakt"].map((label) => (
                <a
                  key={label}
                  href={`#${label === "O nama" ? "o-nama" : label.toLowerCase()}`}
                  className="font-body text-sm text-muted-foreground hover:text-gold-light transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-gold-light mb-4">Kontakt</p>
            <div className="flex flex-col gap-3">
              <a href="tel:066073007" className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold-light transition-colors">
                <Phone className="w-3.5 h-3.5" /> 066 073 007
              </a>
              <a
                href="https://instagram.com/ketering_karovic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold-light transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" /> @ketering_karovic
              </a>
              <div className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" /> Beograd, Srbija
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ketering Karović. Sva prava zadržana.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Napravio{" "}
            <a
              href="https://milanwebportal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light hover:text-gold transition-colors duration-300"
            >
              milanwebportal.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
