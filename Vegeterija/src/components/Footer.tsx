import React from 'react';
import { Phone, Mail, MapPin, Instagram, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-natural-green text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={logo} alt="Vegeterija" className="h-10 w-10" />
              <span className="text-2xl font-bold">Vegeterija</span>
            </div>
            <p className="text-white/90 leading-relaxed mb-4">
              Zdrava veganska i vegetarijanska hrana pripremljena sa ljubavlju. 
              Otkrijte ukuse prirode u svakom zalogaju.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/vegeterija/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Brzi linkovi</h3>
            <ul className="space-y-2">
              {[
                { label: 'O nama', href: '#o-nama' },
                { label: 'Meni', href: '#meni' },
                { label: 'Galerija', href: '#galerija' },
                { label: 'Kontakt', href: '#kontakt' }
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(link.href);
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-white/80" />
                <a 
                  href="tel:+381112345678"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  +381 11 234 5678
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-white/80" />
                <a 
                  href="mailto:info@vegeterija.rs"
                  className="text-white/80 hover:text-white transition-colors duration-200"
                >
                  info@vegeterija.rs
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-white/80" />
                <span className="text-white/80">Sinđelićeva 8, Belgrade, Serbia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours */}
        <div className="border-t border-white/20 pt-8 mb-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h4 className="font-semibold mb-2">Ponedeljak - Petak</h4>
              <p className="text-white/80">08:30 - 17:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Subota</h4>
              <p className="text-white/80">10:00 - 17:00</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Nedelja</h4>
              <p className="text-white/80">Zatvoreno</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/80 flex items-center justify-center">
            © {currentYear} Vegeterija. Sva prava zadržana. Napravljeno sa{' '}
            <Heart className="h-4 w-4 mx-1 text-red-400" />
            za ljubitelje zdrave hrane.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;