import { Phone, MapPin, Clock, Instagram, Facebook, Mail } from "lucide-react";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Restoran Donji Grad" className="h-12 w-12 rounded-full" />
              <div>
                <h3 className="font-serif font-bold text-xl">Restoran Donji Grad</h3>
                <p className="text-sm opacity-80">Tradicija u svakom zalogaju</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed max-w-md">
              Več više od 30 godina, Restoran Donji Grad predstavlja sinonim za 
              autentičnu srpsku kuhinju i nezaboravnu atmosferu u srcu Beograda.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>011 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Visokog Stevana 54<br />Beograd, Srbija</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>08:00 - 23:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@donjigrad.rs</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Brzi linkovi</h4>
            <nav className="space-y-2 text-sm">
              <a href="#home" className="block hover:text-restaurant-gold transition-colors">Početna</a>
              <a href="#menu" className="block hover:text-restaurant-gold transition-colors">Meni</a>
              <a href="#gallery" className="block hover:text-restaurant-gold transition-colors">Galerija</a>
              <a href="#about" className="block hover:text-restaurant-gold transition-colors">O nama</a>
              <a href="#contact" className="block hover:text-restaurant-gold transition-colors">Kontakt</a>
            </nav>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a 
              href="https://www.instagram.com/restoran_donjigrad/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-sm hover:text-restaurant-gold transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>@restoran_donjigrad</span>
            </a>
            <a 
              href="#" 
              className="flex items-center space-x-2 text-sm hover:text-restaurant-gold transition-colors"
            >
              <Facebook className="h-5 w-5" />
              <span>Facebook</span>
            </a>
          </div>
          
          <div className="text-sm opacity-80">
            <p>&copy; 2025 Restoran Donji Grad. Sva prava zadržana.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;