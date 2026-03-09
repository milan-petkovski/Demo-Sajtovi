import { Leaf, Phone, Mail, MapPin, ExternalLink, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Leaf className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">Eco Coolers</span>
                <span className="text-xs text-primary-foreground/60 leading-tight">Profesionalna Oprema</span>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Vaš pouzdani partner za profesionalnu ugostiteljsku opremu. 
              Kvalitetna oprema iz Nemačke i Austrije.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-primary-foreground/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.kupujemprodajem.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-lg bg-primary-foreground/10 hover:bg-primary/20 flex items-center gap-2 transition-colors text-sm font-medium"
              >
                KupujemProdajem
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Brzi Linkovi</h4>
            <ul className="space-y-3">
              {['Početna', 'Kategorije', 'Proizvodi', 'O Nama', 'Kontakt'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Kategorije</h4>
            <ul className="space-y-3">
              {['Rashladne Vitrine', 'Konvektomati', 'Inox Stolovi', 'Pekarska Oprema', 'Mašine za Pranje'].map((cat) => (
                <li key={cat}>
                  <a
                    href="#categories"
                    className="text-primary-foreground/70 hover:text-primary transition-colors text-sm"
                  >
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-6">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:062447147"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/50">Telefon</div>
                    <div className="text-sm font-medium text-primary-foreground">062 447 147</div>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ecocoolers.rs"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/50">Email</div>
                    <div className="text-sm font-medium text-primary-foreground">info@ecocoolers.rs</div>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary-foreground/50">Adresa</div>
                    <div className="text-sm font-medium text-primary-foreground">Novi Sad, Srbija</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50">
              © 2026 Eco Coolers. Sva prava zadržana.
            </p>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/50">
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Uslovi korišćenja
              </a>
              <a href="#" className="hover:text-primary-foreground transition-colors">
                Politika privatnosti
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
