import React from 'react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, MapPin, Phone, Mail, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
const Index = () => {
  const features = [{
    icon: Star,
    title: 'Autentični ukusi',
    description: 'Tradicionalni italijanski recepti sa najkvalitetnijim sastojcima direktno iz Italije'
  }, {
    icon: Clock,
    title: 'Svežina garantovana',
    description: 'Svi naši sastojci su svakodnevno sveži, a jela se pripremaju po narudžbi'
  }, {
    icon: MapPin,
    title: 'Savršena lokacija',
    description: 'Elegantna atmosfera u srcu Beograda sa pogledom na najlepše delove grada'
  }];
  return <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Zašto baš <span className="text-gradient">Duomo?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Već godinama unazad, Duomo je sinonim za autentičnu italijansku kuhinju u Beogradu
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="text-center border-none shadow-elegant hover:shadow-gold transition-all duration-300">
                <CardContent className="pt-8 pb-8">
                  <feature.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
            Spremni za nezaboravan obrok?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Rezervišite svoj sto danas i otkrijte zašto je Duomo omiljeno mesto za sve ljubitelje istinske italijanske kuhinje
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="reserve" size="xl" asChild>
              <Link to="/rezervacije">Rezerviši sto</Link>
            </Button>
            <Button variant="elegant" size="xl" asChild>
              <Link to="/meni">Istraži meni</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Info Footer */}
      <footer className="bg-warm-black text-cream py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-gold" />
                  <span>011/234-5678</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-gold" />
                  <span>info@duomo.rs</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-gold" />
                  <span>Knez Mihailova 12, Beograd</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">Radno vreme</h3>
              <div className="space-y-2 text-sm text-cream/80">
                <div className="flex justify-between">
                  <span>Pon - Čet:</span>
                  <span>12:00 - 24:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Pet - Sub:</span>
                  <span>12:00 - 01:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Nedelja:</span>
                  <span>12:00 - 23:00</span>
                </div>
              </div>
            </div>

            {/* Social & Brand */}
            <div>
              <h3 className="font-serif text-2xl font-bold text-gradient mb-4">DUOMO</h3>
              <p className="text-cream/80 text-sm mb-4 leading-relaxed">
                Autentična italijanska pizzeria osteria u srcu Beograda. Tradicija, kvalitet, strast.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/duomo_pizzeria_osteria/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-cream/20 mt-8 pt-8 text-center text-sm text-cream/60">
            <p>© 2025 Duomo Pizzeria Osteria. Sva prava zadržana.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;