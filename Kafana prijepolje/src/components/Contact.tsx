import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContactProps {
  onReserveClick: () => void;
}

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Posetite nas
          </h2>
          <div className="w-24 h-1 bg-gradient-colorful mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pronađite nas u srcu grada i doživite autentičnu atmosferu
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="shadow-card hover:shadow-cyan transition-all border-2 border-transparent hover:border-cyan">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-cyan p-3 rounded-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      Adresa
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      Prijepolje, Srbija
                    </p>
                    <a
                      href="https://maps.app.goo.gl/n89mtHP36jjj9xEV7"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        Otvori na mapi
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-orange transition-all border-2 border-transparent hover:border-orange">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-orange p-3 rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      Kontakt
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      Telefon: [broj telefona]
                    </p>
                    <p className="text-muted-foreground">
                      WhatsApp: [broj telefona]
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-cyan transition-all border-2 border-transparent hover:border-cyan">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-colorful p-3 rounded-lg">
                    <Clock size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      Radno vreme
                    </h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p>Ponedeljak - Petak: 10:00 - 00:00</p>
                      <p>Subota - Nedelja: 10:00 - 01:00</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="rounded-lg overflow-hidden shadow-card h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.8287394957827!2d19.639904615509936!3d43.37396397913211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDIyJzI2LjMiTiAxOcKwMzgnMzEuMiJF!5e0!3m2!1sen!2srs!4v1234567890123!5m2!1sen!2srs"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kafana Prijepolje Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
