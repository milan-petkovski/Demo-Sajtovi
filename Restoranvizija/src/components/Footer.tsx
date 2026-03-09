import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/logo.jpg';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom section-padding">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <img src={logo} alt="Restoran Vizija" className="h-10 w-auto" />
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Restoran gde se susreću izuzetan ukus, elegantna atmosfera i nezaboravno iskustvo. 
              Vaša destinacija za posebne trenutke.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/restoran_vizija" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Brzi linkovi</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('pocetna')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Početna
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('o-nama')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  O nama
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('meni')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Meni
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('galerija')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Galerija
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('rezervacije')}
                  className="text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  Rezervacije
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>86H4+Q5, Bogovađa</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+381 11 123 4567</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@vizija.rs</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-bold text-lg mb-6">Radno vreme</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Pon-Čet</span>
                <span className="font-semibold">12:00-00:00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Pet-Sub</span>
                <span className="font-semibold">12:00-01:00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Nedelja</span>
                <span className="font-semibold">12:00-23:00</span>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={() => scrollToSection('rezervacije')}
                className="btn-gold text-sm"
              >
                Rezervišite sto
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2025 Restoran Vizija. Sva prava zadržana.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Privatnost
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Uslovi korišćenja
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;