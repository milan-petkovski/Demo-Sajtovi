import { MapPin, Phone, Clock, Instagram, QrCode } from "lucide-react";
import qrCodeImage from "@/assets/qr-code-visual.jpg";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-coffee mb-4">
            Kontakt & Lokacija
          </h2>
          <p className="text-lg text-coffee-light max-w-2xl mx-auto">
            Posetite nas i uživajte u našoj toploj atmosferi
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-golden mr-3" />
                  <h3 className="text-xl font-semibold text-coffee">Lokacija</h3>
                </div>
                <p className="text-coffee-light mb-4">
                  Dobračina 11<br />
                  11000 Beograd, Srbija
                </p>
                <button className="text-golden hover:text-golden-dark font-medium transition-colors">
                  Otvori u Google Maps →
                </button>
              </div>

              {/* Phone */}
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-golden mr-3" />
                  <h3 className="text-xl font-semibold text-coffee">Telefon</h3>
                </div>
                <p className="text-coffee-light mb-4">
                  +381 11 123 4567<br />
                  +381 60 123 4567
                </p>
                <button className="text-golden hover:text-golden-dark font-medium transition-colors">
                  Pozovite nas →
                </button>
              </div>

              {/* Hours */}
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-golden mr-3" />
                  <h3 className="text-xl font-semibold text-coffee">Radno vreme</h3>
                </div>
                <div className="text-coffee-light space-y-1">
                  <p>Ponedeljak - Petak: 13:00 - 22:00</p>
                  <p>Subota - Nedelja: 13:00 - 22:00</p>
                </div>
              </div>

              {/* Social */}
              <div className="bg-card p-6 rounded-xl shadow-elegant">
                <div className="flex items-center mb-4">
                  <Instagram className="w-6 h-6 text-golden mr-3" />
                  <h3 className="text-xl font-semibold text-coffee">Društvene mreže</h3>
                </div>
                <p className="text-coffee-light mb-4">
                  Pratite nas na Instagramu za najnovije vesti i specijalne ponude
                </p>
                <a 
                  href="https://www.instagram.com/chicotamazz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-golden hover:text-golden-dark font-medium transition-colors"
                >
                  @chicotamazz →
                </a>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-card p-6 rounded-xl shadow-elegant">
              <h3 className="text-xl font-semibold text-coffee mb-4">Kako do nas</h3>
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Google Maps integracija</p>
                  <p className="text-sm">Dobračina 11, Beograd</p>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl shadow-elegant text-center">
              <div className="flex items-center justify-center mb-4">
                <QrCode className="w-6 h-6 text-golden mr-2" />
                <h3 className="text-xl font-semibold text-coffee">Digitalni Meni</h3>
              </div>
              
              <div className="mb-4">
                <img 
                  src={qrCodeImage}
                  alt="QR kod za digitalni meni"
                  className="w-40 h-40 mx-auto rounded-lg shadow-elegant"
                />
              </div>
              
              <p className="text-coffee-light mb-4">
                Skenirajte QR kod da biste pristupili našem digitalnom meniju
              </p>
              
              <div className="bg-gradient-hero p-4 rounded-lg text-coffee">
                <p className="font-semibold mb-2">Brz pristup meniju</p>
                <p className="text-sm">
                  Bez čekanja, bez dodiranja - pristupite meniju direktno sa vašeg telefona
                </p>
              </div>
            </div>

            {/* Reservation */}
            <div className="bg-gradient-sunset p-6 rounded-xl shadow-warm text-coffee text-center">
              <h3 className="text-xl font-semibold mb-4">Rezervacija stola</h3>
              <p className="mb-6">
                Rezervišite vaš sto i osigurajte mesto u našem restoranu
              </p>
              <button className="bg-coffee text-golden px-6 py-3 rounded-lg font-semibold hover:bg-coffee-light transition-all duration-300 hover:scale-105 shadow-elegant">
                Rezervišite Odmah
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;