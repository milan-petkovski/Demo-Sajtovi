import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Kontakt
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Posetite nas i osećajte se kao kod kuće. Nalazimo se u srcu Beograda, 
            lako dostupni svim vidovima prevoza.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="shadow-soft border-border/50">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-3 text-primary text-2xl">📍</span>
                  Adresa
                </h3>
                <p className="text-muted-foreground">
                  Kneza Danila 42<br />
                  11000 Belgrade, Serbia<br />
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft border-border/50">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-3 text-primary text-2xl">🕒</span>
                  Radno vreme
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Ponedeljak - Četvrtak:</span>
                    <span>11:00 - 24:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Petak - Subota:</span>
                    <span>11:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nedelja:</span>
                    <span>12:00 - 24:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-soft border-border/50">
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-3 text-primary text-2xl">📞</span>
                  Kontakt informacije
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <strong>Rezervacije:</strong> +38111/6241-193
                  </div>
                  <div>
                    <strong>Ili u DM:</strong> Instagram/Facebook
                  </div>
                  <div>
                    <strong>Email:</strong> info@kafanicakoddede.rs
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="h-96 md:h-full">
            <div className="w-full h-full bg-secondary/30 rounded-lg flex items-center justify-center border border-border/50">
              <div className="text-center text-muted-foreground">
                <div className="text-4xl mb-4">🗺️</div>
                <p className="text-lg font-medium">Mapa lokacije</p>
                <p className="text-sm">Kneza Danila 42, Belgrade</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Card className="inline-block bg-gradient-warm shadow-warm border-none">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                Pratite nas na društvenim mrežama
              </h3>
              <div className="flex justify-center space-x-6">
                <a href="#" className="text-primary hover:text-primary/80 transition-colors text-2xl">
                  📘
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors text-2xl">
                  📷
                </a>
                <a href="#" className="text-primary hover:text-primary/80 transition-colors text-2xl">
                  🐦
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;