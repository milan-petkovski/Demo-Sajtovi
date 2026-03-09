import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo and About */}
          <div>
            <img src={logo} alt="Kafana Prijepolje Logo" className="h-16 w-auto mb-4" />
            <p className="text-background/80 mb-4">
              Domaća atmosfera u srcu grada. Dođite i doživite tradiciju i gostoprimstvo.
            </p>
            <a
              href="https://www.instagram.com/kafana_prijepolje"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Instagram size={20} className="text-cyan" />
              <span className="text-cyan">@kafana_prijepolje</span>
            </a>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3 text-background/80">
              <p className="flex items-start gap-2">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>Prijepolje, Srbija</span>
              </p>
              <p className="flex items-start gap-2">
                <Phone size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>[broj telefona]</span>
              </p>
              <a
                href="https://maps.app.goo.gl/n89mtHP36jjj9xEV7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors inline-block"
              >
                Pogledaj na mapi →
              </a>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-xl font-display font-semibold mb-4">Radno vreme</h3>
            <div className="space-y-2 text-background/80">
              <p className="flex items-start gap-2">
                <Clock size={20} className="text-primary mt-1 flex-shrink-0" />
                <span>
                  Ponedeljak - Petak<br />
                  10:00 - 00:00
                </span>
              </p>
              <p className="flex items-start gap-2 pl-7">
                <span>
                  Subota - Nedelja<br />
                  10:00 - 01:00
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© {currentYear} Kafana Prijepolje. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
