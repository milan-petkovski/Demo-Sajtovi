import React from 'react';
import logo from '@/assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img src={logo} alt="Kafanica kod Dede" className="w-10 h-10 object-cover rounded-lg" />
            <div>
              <div className="font-serif font-semibold text-lg">Kafanica kod Dede</div>
              <div className="text-sm opacity-80">Tradicija od 1985.</div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm opacity-80 mb-1">
              © 2025 Kafanica kod Dede. Sva prava zadržana.
            </p>
            <p className="text-sm opacity-80">
              Kneza Danila 42, Belgrade | +38111/6241-193
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;