import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Brand */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src={logo} alt="Pravi spoj" className="h-10 w-10 rounded-full" />
          <span className="font-serif text-xl font-bold">Pravi spoj</span>
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          Pronađite pravu osobu, ne samo profil. Premium usluga upoznavanja u Beogradu.
        </p>
      </div>

      {/* Links */}
      <div>
        <h4 className="font-serif text-lg mb-4">Navigacija</h4>
        <div className="space-y-2 text-sm opacity-80">
          <Link to="/" className="block hover:opacity-100">Početna</Link>
          <Link to="/o-nama" className="block hover:opacity-100">O nama</Link>
          <Link to="/galerija" className="block hover:opacity-100">Galerija</Link>
          <Link to="/faq" className="block hover:opacity-100">FAQs</Link>
        </div>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-serif text-lg mb-4">Kontakt</h4>
        <div className="space-y-3 text-sm opacity-80">
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>Topličin venac 3, Stari grad, Beograd</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span>+381 11 123 4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} />
            <span>info@pravispoj.rs</span>
          </div>
        </div>
        <div className="flex gap-4 mt-4">
          <a href="#" aria-label="Facebook" className="opacity-80 hover:opacity-100 text-sm">FB</a>
          <a href="#" aria-label="Instagram" className="opacity-80 hover:opacity-100 text-sm">IG</a>
          <a href="#" aria-label="TikTok" className="opacity-80 hover:opacity-100 text-sm">TikTok</a>
        </div>
      </div>
    </div>
    <div className="border-t border-primary-foreground/20 py-4 text-center text-xs opacity-60">
      © 2025 Pravi spoj. Sva prava zadržana.
    </div>
  </footer>
);

export default Footer;
