import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';

const Contact = () => {
  return (
    <section id="kontakt" className="section-padding bg-background">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Kontakt & <span className="gold-gradient">Lokacija</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Posetite nas i doživite nezaboravno kulinarno putovanje u srcu grada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-2xl font-bold flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-primary" />
                  Adresa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-2">86H4+Q5</p>
                <p className="text-muted-foreground">14225 Bogovađa, Srbija</p>
                <p className="text-sm text-muted-foreground mt-2">
                  (na samoj magistrali)
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="elegant-card">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    Telefon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">+381 11 123 4567</p>
                  <p className="text-sm text-muted-foreground">Za rezervacije</p>
                </CardContent>
              </Card>

              <Card className="elegant-card">
                <CardHeader>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">info@vizija.rs</p>
                  <p className="text-sm text-muted-foreground">Opšte informacije</p>
                </CardContent>
              </Card>
            </div>

            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Radno vreme
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Ponedeljak - Četvrtak</span>
                    <span className="font-semibold">12:00 - 00:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Petak - Subota</span>
                    <span className="font-semibold">12:00 - 01:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nedelja</span>
                    <span className="font-semibold">12:00 - 23:00</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  * Kuhinja radi do sat pre zatvaranja
                </p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="elegant-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  Pratite nas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/restoran_vizija" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    @restoran_vizija
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                    Restoran Vizija
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="relative">
            <Card className="elegant-card h-full">
              <CardContent className="p-0 h-full min-h-[500px]">
                <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Mapa lokacije</h3>
                    <p className="text-muted-foreground mb-4">
                      86H4+Q5, Bogovađa
                    </p>
                    <a 
                      href="https://maps.google.com/maps?q=Knez+Mihailova+25,+Beograd" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-outline-gold"
                    >
                      Google maps integracija
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 border border-primary/30 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/20 rounded-full"></div>
          </div>

        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="elegant-card inline-block">
            <div className="p-8">
              <h3 className="text-xl font-bold mb-4">Kako do nas?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🚗 Automobilom</h4>
                  <p>Parking u okviru objekta</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🚌 Javni prevoz</h4>
                  <p>Stanica "naziv" - linije "", "", ""</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">🚶 Pešice</h4>
                  <p>15 minuta hoda od centra</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;