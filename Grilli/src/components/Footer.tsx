import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>+381 12 345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>info@vasrestoran.rs</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Adresa</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Radno vreme</h3>
            <div className="space-y-2">
              <p>Ponedeljak - Petak: 11:00 - 23:00</p>
              <p>Subota - Nedelja: 12:00 - 00:00</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">O nama</h3>
            <p className="text-sm">
              Dobrodošli u naš restoran gde tradicija susreće savremenu kuhinju. 
              Sa ljubavlju pripremamo svaki obrok koristeći najbolje lokalne sastojke.
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 Grilli. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
