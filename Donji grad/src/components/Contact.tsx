import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock, Mail, Instagram, Facebook } from "lucide-react";
import qrMenuImage from "@/assets/qr-menu.jpg";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Telefon",
      content: "011 123 456",
    },
    {
      icon: MapPin,
      title: "Adresa",
      content: "Visokog Stevana 54",
      subContent: "11000 Beograd, Srbija"
    },
    {
      icon: Clock,
      title: "Radno vreme",
      content: "Ponedeljak - Nedelja",
      subContent: "08:00 - 23:00"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@donjigrad.rs",
      subContent: "rezervacije@donjigrad.rs"
    }
  ];

  const socialLinks = [
    { icon: Instagram, name: "Instagram", url: "https://www.instagram.com/restoran_donjigrad/" },
    { icon: Facebook, name: "Facebook", url: "#" }
  ];

  return (
    <section id="contact" className="py-20 gradient-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">
            Kontakt & Lokacija
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Posetite nas ili nas kontaktirajte za rezervacije i dodatne informacije
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={info.title} className="bg-card/80 backdrop-blur-sm border-border animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 flex-shrink-0">
                      <info.icon className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                      <p className="text-foreground font-medium">{info.content}</p>
                      <p className="text-sm text-muted-foreground">{info.subContent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* QR Menu */}
          <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border">
              <CardContent className="p-6 text-center">
                <h3 className="font-serif text-xl font-semibold text-primary mb-4">
                  Digitalni Meni
                </h3>
                <div className="mb-4">
                  <img 
                    src={qrMenuImage} 
                    alt="QR kod za digitalni meni" 
                    className="w-32 h-32 mx-auto rounded-lg border border-border"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Skeniraj QR kod za pristup kompletnom digitalnom meniju
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Otvori Web Meni
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card className="bg-card/80 backdrop-blur-sm border-border mb-8 animate-fade-in">
          <CardContent className="p-0">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-primary mb-2">Mapa Lokacije</h3>
                <p className="text-muted-foreground">Visokog Stevana 54, Beograd</p>
                <Button variant="outline" className="mt-4">
                  Otvori u Google Maps
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links & CTA */}
        <div className="text-center animate-fade-in">
          <h3 className="font-serif text-xl font-semibold text-primary mb-4">
            Pratite nas na društvenim mrežama
          </h3>
          <div className="flex justify-center space-x-4 mb-8">
            {socialLinks.map((social) => (
              <Button
                key={social.name}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
                asChild
              >
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-4 w-4" />
                  <span>{social.name}</span>
                </a>
              </Button>
            ))}
          </div>
          
          <Card className="bg-accent/10 border-accent/20 max-w-2xl mx-auto">
            <CardContent className="p-6">
              <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                Rezervišite Vaš Sto
              </h4>
              <p className="text-muted-foreground mb-4">
                Pozovite nas ili dođite direktno - uvek ćemo naći mesto za Vas!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" className="bg-accent hover:bg-accent/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Pozovi Sad
                </Button>
                <Button variant="outline" size="lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  Kako Doći
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;