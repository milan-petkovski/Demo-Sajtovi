import { Instagram, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-coffee text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src="/logo.jpg" 
                alt="Chicota Mazz Logo"
                className="w-10 h-10 rounded-full"
              />
              <h3 className="text-2xl font-serif font-bold text-golden">
                Chicota Mazz
              </h3>
            </div>
            <p className="text-cream/80 leading-relaxed max-w-md">
              Autentični restoran sa tradicionalnim receptima i toplom atmosferom. 
              Pridružite nam se za nezaboravno kulinarska iskustvo u srcu Beograda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-golden mb-4">Brzi linkovi</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-cream/80 hover:text-golden transition-colors"
                >
                  Početna
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-cream/80 hover:text-golden transition-colors"
                >
                  Meni
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-cream/80 hover:text-golden transition-colors"
                >
                  O nama
                </button>
              </li>
              <li>
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-cream/80 hover:text-golden transition-colors"
                >
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-golden mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-golden" />
                <span className="text-cream/80 text-sm">Dobračina 11, Beograd</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-golden" />
                <span className="text-cream/80 text-sm">+381 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="w-4 h-4 text-golden" />
                <a 
                  href="https://www.instagram.com/chicotamazz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream/80 hover:text-golden transition-colors text-sm"
                >
                  @chicotamazz
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-cream/20 mt-8 pt-8 text-center">
          <p className="text-cream/60 text-sm">
            © 2025 Chicota Mazz. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;