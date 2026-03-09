import { Facebook, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Ćošak Cafe Restoran</h3>
            <p className="text-background/80 leading-relaxed">
              Čarobna bašta u srcu grada. Vaše omiljeno mesto za opuštanje.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Kontakt</h4>
            <div className="space-y-2 text-background/80">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <div className="flex flex-col gap-1">
                  <a href="tel:+381113583389" className="hover:text-background transition-colors">
                    011 3583389
                  </a>
                  <a href="tel:+381649888876" className="hover:text-background transition-colors">
                    064 9888876
                  </a>
                </div>
              </div>
              <p className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@cosakcafe.rs" className="hover:text-background transition-colors">
                  info@cosakcafe.rs
                </a>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Pratite nas</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} Ćošak Cafe Restoran. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
